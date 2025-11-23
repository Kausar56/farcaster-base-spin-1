// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/// @title DailyLottery - Free Entry Lottery with ERC20 Token Prizes (Chainlink VRF V2.5)
/// @author Your Name
/// @notice Lottery with free entry and fixed ERC20 token prize pool distribution

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
// VRF V2.5 Imports (includes ConfirmedOwner)
import {VRFConsumerBaseV2Plus} from "@chainlink/contracts/src/v0.8/vrf/dev/VRFConsumerBaseV2Plus.sol";
import {VRFV2PlusClient} from "@chainlink/contracts/src/v0.8/vrf/dev/libraries/VRFV2PlusClient.sol";
import "@chainlink/contracts/src/v0.8/automation/AutomationCompatible.sol";

// Contract inherits from VRFConsumerBaseV2Plus (which includes ConfirmedOwner)
contract DailyLottery is
    ReentrancyGuard,
    Pausable,
    VRFConsumerBaseV2Plus,
    AutomationCompatibleInterface
{
    using SafeERC20 for IERC20;

    /*//////////////////////////////////////////////////////////////
                            CHAINLINK VRF V2.5
    //////////////////////////////////////////////////////////////*/

    // The Gas Lane (Key Hash)
    bytes32 private immutable i_keyHash;

    // Subscription ID to fund the randomness requests
    uint256 public immutable i_subscriptionId;

    // The number of random words to request
    uint16 private constant REQUEST_CONFIRMATIONS = 3;
    uint32 public callbackGasLimit;
    uint32 public constant MIN_CALLBACK_GAS_LIMIT = 500000;   // 500k minimum
    uint32 public constant MAX_CALLBACK_GAS_LIMIT = 5000000;  // 5M maximum

    // Whether to pay in native tokens (true) or LINK (false)
    bool private immutable i_nativePayment;

    // VRF Request ID for the current draw
    uint256 public s_requestId;

    // Temporary storage for round data while waiting for VRF fulfillment
    uint256 private s_currentParticipantsCount;
    uint256 private s_currentTotalPot;

    // Mapping to store participants for a specific VRF request
    mapping(uint256 => address[]) private s_requestParticipants;

    uint256 private s_pendingRandomWord;
    bool private s_hasPendingDraw;

    /*//////////////////////////////////////////////////////////////
                            ERC20 PRIZE TOKEN
    //////////////////////////////////////////////////////////////*/

    /// @notice The ERC20 token used for prizes (e.g., XP Token)
    IERC20 public immutable prizeToken;

    /// @notice Fixed prize pool amount per round (in token wei)
    uint256 public prizePoolAmount;

    /*//////////////////////////////////////////////////////////////
                            CONSTANTS
    //////////////////////////////////////////////////////////////*/

    /// @notice Minimum participants required for a draw to occur
    uint256 public constant MIN_PARTICIPANTS = 3;

    uint256 public constant MIN_DRAW_INTERVAL = 10 minutes;
    uint256 public constant MAX_DRAW_INTERVAL = 7 days;
    uint256 public constant MIN_COOLDOWN_PERIOD = 5 minutes;
    uint256 public constant MAX_COOLDOWN_PERIOD = 24 hours;

    /*//////////////////////////////////////////////////////////////
                            CONFIGURABLE VARIABLES
    //////////////////////////////////////////////////////////////*/

    uint256 public drawInterval;
    uint256 public cooldownPeriod;

    /*//////////////////////////////////////////////////////////////
                            STATE VARIABLES
    //////////////////////////////////////////////////////////////*/

    uint256 public roundId;
    uint256 public roundStartTime;
    uint256 public nextDrawTime;
    address[] private participants;
    mapping(address => bool) public hasEntered;
    bool public isInCooldown;

    /*//////////////////////////////////////////////////////////////
                        PULL PAYMENT PATTERN STORAGE
    //////////////////////////////////////////////////////////////*/

    mapping(address => uint256) public pendingWithdrawals;
    uint256 public totalPendingWithdrawals;
    mapping(address => uint256) public failedPaymentCount;

    /*//////////////////////////////////////////////////////////////
                            WINNER TRACKING STORAGE
    //////////////////////////////////////////////////////////////*/

    mapping(uint256 => address[]) public roundWinners;
    mapping(uint256 => uint256) public roundPrizePerWinner;
    mapping(uint256 => uint256) public roundTotalPot;
    mapping(uint256 => mapping(address => bool)) public isWinner;
    mapping(uint256 => mapping(address => bool)) public hasParticipated;
    mapping(uint256 => uint256) public roundWinnerCount;
    mapping(uint256 => bool) public isRoundCancelled;

    /*//////////////////////////////////////////////////////////////
                                EVENTS
    //////////////////////////////////////////////////////////////*/

    // VRF Events
    event VRFRequested(
        uint256 indexed requestId,
        uint256 indexed roundId,
        bytes32 keyHash
    );
    event VRFFulfilled(
        uint256 indexed requestId,
        uint256 indexed roundId,
        uint256[] randomWords
    );

    event Entered(address indexed user, uint256 indexed roundId);

    event WinnersDrawn(
        uint256 indexed roundId,
        address[] winners,
        uint256 totalPrizePool,
        uint256 winnersCount,
        uint256 perWinnerAmount
    );

    event RoundCancelled(
        uint256 indexed roundId,
        uint256 participants
    );

    event RoundStarted(
        uint256 indexed roundId,
        uint256 startTime,
        uint256 drawTime,
        uint256 prizePool
    );

    event DrawIntervalUpdated(uint256 oldInterval, uint256 newInterval);
    event CooldownPeriodUpdated(uint256 oldPeriod, uint256 newPeriod);
    event PrizePoolAmountUpdated(uint256 oldAmount, uint256 newAmount);
    event OwnerForcedDraw(uint256 indexed roundId, address indexed caller);
    event DrawPendingDueToPause(
        uint256 indexed roundId,
        uint256 indexed requestId
    );
    event PendingDrawCompleted(uint256 indexed roundId);

    // Pull Payment Events
    event PrizeAllocated(
        address indexed winner,
        uint256 indexed roundId,
        uint256 amount
    );
    event PrizeWithdrawn(address indexed winner, uint256 amount);
    event WithdrawalFailed(
        address indexed winner,
        uint256 amount,
        string reason
    );
    event TokensDeposited(address indexed from, uint256 amount);

    /*//////////////////////////////////////////////////////////////
                                CONSTRUCTOR
    //////////////////////////////////////////////////////////////*/

    /// @notice Initialize lottery with default settings and Chainlink VRF V2.5 config
    /// @param initialOwner Address that will own the contract
    /// @param vrfCoordinator Chainlink VRF Coordinator address
    /// @param keyHash Key hash (gas lane) for the VRF
    /// @param subscriptionId VRF subscription ID
    /// @param nativePayment Whether to pay in native tokens (true) or LINK (false)
    /// @param _prizeToken Address of the ERC20 token for prizes
    /// @param _prizePoolAmount Initial prize pool amount per round
    constructor(
        address initialOwner,
        address vrfCoordinator,
        bytes32 keyHash,
        uint256 subscriptionId,
        bool nativePayment,
        address _prizeToken,
        uint256 _prizePoolAmount
    )
        VRFConsumerBaseV2Plus(vrfCoordinator)
    {
        require(_prizeToken != address(0), "DailyLottery: Invalid token address");
        require(_prizePoolAmount > 0, "DailyLottery: Prize pool must be greater than 0");

        // Transfer ownership to initial owner
        if (initialOwner != msg.sender) {
            transferOwnership(initialOwner);
        }

        // Set VRF configuration
        i_keyHash = keyHash;
        i_subscriptionId = subscriptionId;
        i_nativePayment = nativePayment;

        // Set prize token
        prizeToken = IERC20(_prizeToken);
        prizePoolAmount = _prizePoolAmount;

        // Default Lottery settings
        drawInterval = 6 hours;
        cooldownPeriod = 15 minutes;

        roundId = 1;
        roundStartTime = block.timestamp;
        nextDrawTime = block.timestamp + drawInterval;
        isInCooldown = false;
        callbackGasLimit = 2500000;

        emit RoundStarted(roundId, roundStartTime, nextDrawTime, prizePoolAmount);
    }

    /*//////////////////////////////////////////////////////////////
                    CHAINLINK AUTOMATION
    //////////////////////////////////////////////////////////////*/

    function checkUpkeep(
        bytes calldata
    )
        external
        view
        override
        returns (bool upkeepNeeded, bytes memory performData)
    {
        // Automation is completely disabled when paused
        if (paused()) {
            return (false, "");
        }

        bool canDraw = (!isInCooldown &&
            block.timestamp >= nextDrawTime &&
            s_requestId == 0);

        bool canExitCooldown = (isInCooldown &&
            block.timestamp >= roundStartTime);

        upkeepNeeded = canDraw || canExitCooldown;

        if (canDraw) {
            performData = abi.encode("DRAW");
        } else if (canExitCooldown) {
            performData = abi.encode("EXIT");
        } else {
            performData = "";
        }
    }

    function performUpkeep(bytes calldata performData) external override {
        require(performData.length > 0, "DailyLottery: Empty perform data");

        (string memory action) = abi.decode(performData, (string));

        if (keccak256(bytes(action)) == keccak256(bytes("DRAW"))) {
            require(!isInCooldown, "DailyLottery: Round in cool-down period");
            require(
                block.timestamp >= nextDrawTime,
                "DailyLottery: Draw time not reached"
            );
            require(s_requestId == 0, "DailyLottery: VRF request pending");
            require(!paused(), "DailyLottery: Contract is paused");

            // Check minimum participants and either draw or cancel
            if (participants.length < MIN_PARTICIPANTS || participants.length == 0) {
                _cancelRound();
            } else {
                _requestRandomness();
            }
        } else if (keccak256(bytes(action)) == keccak256(bytes("EXIT"))) {
            require(isInCooldown, "DailyLottery: Not in cool-down");
            require(
                block.timestamp >= roundStartTime,
                "DailyLottery: Cool-down period not over"
            );

            _exitCooldown();
        } else {
            revert("DailyLottery: Invalid action");
        }
    }

    function _exitCooldown() internal {
        isInCooldown = false;
    }

    /*//////////////////////////////////////////////////////////////
                            EXTERNAL FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    /// @notice Enter the lottery (FREE - no entry fee required)
    function enter() external nonReentrant whenNotPaused {
        // Auto-exit cooldown if period elapsed
        if (isInCooldown && block.timestamp >= roundStartTime) {
            isInCooldown = false;
        }

        require(!isInCooldown, "DailyLottery: Round in cool-down period");
        require(
            !hasEntered[msg.sender],
            "DailyLottery: Already entered this round"
        );

        participants.push(msg.sender);
        hasEntered[msg.sender] = true;
        hasParticipated[roundId][msg.sender] = true;

        emit Entered(msg.sender, roundId);
    }

    /// @notice Owner can force a draw (for testing/emergency)
    function forceDraw() external onlyOwner nonReentrant {
        require(
            participants.length > 0,
            "DailyLottery: No participants in round"
        );
        require(!isInCooldown, "DailyLottery: Round in cool-down period");

        emit OwnerForcedDraw(roundId, msg.sender);
        _requestRandomness();
    }

    /// @notice Pause the lottery (stops entries and draws)
    function pause() external onlyOwner {
        _pause();
    }

    /// @notice Unpause the lottery
    function unpause() external onlyOwner nonReentrant {
        _unpause();

        if (s_hasPendingDraw) {
            uint256 randomWord = s_pendingRandomWord;

            // Reset flags
            s_hasPendingDraw = false;
            s_pendingRandomWord = 0;

            // Execute the pending draw
            _executeDrawAndDistribute(randomWord);

            emit PendingDrawCompleted(roundId - 1);
        }
    }

    /*//////////////////////////////////////////////////////////////
                        PULL PAYMENT FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    /// @notice Withdraw prize tokens
    function withdrawPrize() external nonReentrant {
        uint256 amount = pendingWithdrawals[msg.sender];
        require(amount > 0, "DailyLottery: No prize to withdraw");

        // Update state before transfer (Checks-Effects-Interactions)
        pendingWithdrawals[msg.sender] = 0;

        unchecked {
            totalPendingWithdrawals -= amount;
        }

        // Transfer ERC20 tokens
        prizeToken.safeTransfer(msg.sender, amount);

        emit PrizeWithdrawn(msg.sender, amount);
    }

    function batchWithdrawPrizes(
        address[] calldata winners
    ) external onlyOwner nonReentrant {
        uint256 successCount = 0;

        for (uint256 i = 0; i < winners.length; ) {
            address winner = winners[i];
            uint256 amount = pendingWithdrawals[winner];

            if (amount > 0) {
                // Update state before transfer
                pendingWithdrawals[winner] = 0;

                unchecked {
                    totalPendingWithdrawals -= amount;
                }

                // Try to transfer
                try prizeToken.transfer(winner, amount) returns (bool success) {
                    if (success) {
                        emit PrizeWithdrawn(winner, amount);
                        unchecked {
                            successCount++;
                        }
                    } else {
                        // Revert state if failed
                        pendingWithdrawals[winner] = amount;
                        unchecked {
                            totalPendingWithdrawals += amount;
                            failedPaymentCount[winner]++;
                        }
                        emit WithdrawalFailed(winner, amount, "Token transfer returned false");
                    }
                } catch {
                    // Revert state if failed
                    pendingWithdrawals[winner] = amount;
                    unchecked {
                        totalPendingWithdrawals += amount;
                        failedPaymentCount[winner]++;
                    }
                    emit WithdrawalFailed(winner, amount, "Token transfer reverted");
                }
            }

            unchecked {
                ++i;
            }
        }

        require(successCount > 0, "DailyLottery: All batch withdrawals failed");
    }

    function checkPendingPrize(
        address user
    ) external view returns (uint256 amount, uint256 failedAttempts) {
        return (pendingWithdrawals[user], failedPaymentCount[user]);
    }

    /*//////////////////////////////////////////////////////////////
                        CONFIGURATION FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    function setDrawInterval(uint256 newInterval) external onlyOwner {
        require(
            newInterval >= MIN_DRAW_INTERVAL &&
                newInterval <= MAX_DRAW_INTERVAL,
            "DailyLottery: Draw interval out of bounds"
        );

        uint256 oldInterval = drawInterval;
        drawInterval = newInterval;

        emit DrawIntervalUpdated(oldInterval, newInterval);
    }

    function setCooldownPeriod(uint256 newPeriod) external onlyOwner {
        require(
            newPeriod >= MIN_COOLDOWN_PERIOD &&
                newPeriod <= MAX_COOLDOWN_PERIOD,
            "DailyLottery: Cooldown period out of bounds"
        );

        uint256 oldPeriod = cooldownPeriod;
        cooldownPeriod = newPeriod;

        emit CooldownPeriodUpdated(oldPeriod, newPeriod);
    }

    /// @notice Update the prize pool amount for future rounds
    /// @param newAmount New prize pool amount in token wei
    function setPrizePoolAmount(uint256 newAmount) external onlyOwner {
        require(newAmount > 0, "DailyLottery: Prize pool must be greater than 0");
        
        uint256 oldAmount = prizePoolAmount;
        prizePoolAmount = newAmount;

        emit PrizePoolAmountUpdated(oldAmount, newAmount);
    }

    /// @notice Owner deposits prize tokens into contract
    /// @param amount Amount of tokens to deposit
    function depositPrizeTokens(uint256 amount) external onlyOwner {
        require(amount > 0, "DailyLottery: Amount must be greater than 0");
        
        prizeToken.safeTransferFrom(msg.sender, address(this), amount);
        
        emit TokensDeposited(msg.sender, amount);
    }

    /// @notice Emergency withdraw tokens (only for excess/stuck tokens)
    /// @param token Token address to withdraw
    /// @param to Address to send tokens to
    /// @param amount Amount to withdraw
    function emergencyWithdrawTokens(
        address token,
        address to,
        uint256 amount
    ) external onlyOwner nonReentrant {
        require(to != address(0), "DailyLottery: Invalid address");
        require(amount > 0, "DailyLottery: Amount must be greater than 0");

        IERC20 tokenContract = IERC20(token);
        
        // If it's the prize token, ensure we don't withdraw locked funds
        if (token == address(prizeToken)) {
            uint256 balance = tokenContract.balanceOf(address(this));
            uint256 availableBalance = balance - totalPendingWithdrawals;
            
            require(
                amount <= availableBalance,
                "DailyLottery: Insufficient available balance (funds locked for prizes)"
            );
        }

        tokenContract.safeTransfer(to, amount);
    }

    /// @notice Update the VRF callback gas limit
/// @param newLimit New gas limit (must be between MIN and MAX)
function setCallbackGasLimit(uint32 newLimit) external onlyOwner {
    require(
        newLimit >= MIN_CALLBACK_GAS_LIMIT && newLimit <= MAX_CALLBACK_GAS_LIMIT,
        "DailyLottery: Gas limit out of bounds"
    );
    require(s_requestId == 0, "DailyLottery: Cannot change during pending draw");
    callbackGasLimit = newLimit;
}

    /*//////////////////////////////////////////////////////////////
                    WINNER CHECKING VIEW FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    function checkWinStatus(
        address user,
        uint256 _roundId
    ) external view returns (bool won, uint256 prizeAmount, bool participated) {
        participated = hasParticipated[_roundId][user];
        won = isWinner[_roundId][user];
        prizeAmount = won ? roundPrizePerWinner[_roundId] : 0;

        return (won, prizeAmount, participated);
    }

    function getRoundWinners(
        uint256 _roundId
    )
        external
        view
        returns (
            address[] memory winners,
            uint256 prizePerWinner,
            uint256 totalPot
        )
    {
        return (
            roundWinners[_roundId],
            roundPrizePerWinner[_roundId],
            roundTotalPot[_roundId]
        );
    }

    function checkLastRoundResult(
        address user
    )
        external
        view
        returns (
            bool won,
            uint256 prizeAmount,
            uint256 previousRoundId,
            bool wasCancelled
        )
    {
        if (!isInCooldown || roundId == 1) {
            return (false, 0, 0, false);
        }

        previousRoundId = roundId - 1;
        wasCancelled = isRoundCancelled[previousRoundId];

        if (wasCancelled) {
            return (false, 0, previousRoundId, true);
        }

        won = isWinner[previousRoundId][user];
        prizeAmount = won ? roundPrizePerWinner[previousRoundId] : 0;

        return (won, prizeAmount, previousRoundId, wasCancelled);
    }

    function getUserHistory(
        address user,
        uint256 startRound,
        uint256 endRound
    )
        external
        view
        returns (
            uint256[] memory rounds,
            bool[] memory wins,
            uint256[] memory prizes
        )
    {
        require(startRound <= endRound, "Invalid range");
        require(endRound < roundId, "Cannot query current/future rounds");

        uint256 length = endRound - startRound + 1;
        rounds = new uint256[](length);
        wins = new bool[](length);
        prizes = new uint256[](length);

        uint256 index = 0;
        for (uint256 i = startRound; i <= endRound; i++) {
            if (hasParticipated[i][user]) {
                rounds[index] = i;
                wins[index] = isWinner[i][user];
                prizes[index] = isWinner[i][user] ? roundPrizePerWinner[i] : 0;
                index++;
            }
        }

        return (rounds, wins, prizes);
    }

    /*//////////////////////////////////////////////////////////////
                        STANDARD VIEW FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    function getParticipants() external view returns (address[] memory) {
        return participants;
    }

    function getParticipantCount() external view returns (uint256) {
        return participants.length;
    }

    function getLotteryStatus()
        external
        view
        returns (
            uint256 currentRound,
            uint256 currentPrizePool,
            uint256 currentDrawInterval,
            uint256 currentCooldownPeriod,
            bool inCooldown,
            uint256 cooldownEndsAt,
            bool isPaused
        )
    {
        currentRound = roundId;
        currentPrizePool = prizePoolAmount;
        currentDrawInterval = drawInterval;
        currentCooldownPeriod = cooldownPeriod;
        inCooldown = isInCooldown;
        isPaused = paused();

        if (isInCooldown) {
            cooldownEndsAt = roundStartTime;
        } else {
            cooldownEndsAt = 0;
        }
    }

    function getDrawStatus()
        external
        view
        returns (
            uint256 timeUntilDraw,
            uint256 drawTime,
            bool canDrawNow,
            uint256 participantCount,
            uint256 currentPrizePool,
            bool meetsMinimum,
            uint256 expectedWinners,
            uint256 estimatedPrizePerWinner,
            bool inCooldown,
            uint256 pendingRequestId
        )
    {
        drawTime = nextDrawTime;
        participantCount = participants.length;
        currentPrizePool = prizePoolAmount;
        meetsMinimum = participantCount >= MIN_PARTICIPANTS;
        inCooldown = isInCooldown;
        pendingRequestId = s_requestId;

        bool isRequestPending = s_requestId != 0;

        if (
            block.timestamp >= nextDrawTime &&
            !isInCooldown &&
            !isRequestPending &&
            !paused()
        ) {
            timeUntilDraw = 0;
            canDrawNow = participantCount > 0;
        } else {
            if (block.timestamp < nextDrawTime) {
                timeUntilDraw = nextDrawTime - block.timestamp;
            } else {
                timeUntilDraw = 0;
            }
            canDrawNow = false;
        }

        if (meetsMinimum && !isInCooldown) {
            (
                expectedWinners,
                estimatedPrizePerWinner
            ) = _calculateSmartDistribution(participantCount, prizePoolAmount);
        }
    }

    function getFinancialStatus()
        external
        view
        returns (
            uint256 totalTokenBalance,
            uint256 pendingPrizes,
            uint256 availableTokens
        )
    {
        totalTokenBalance = prizeToken.balanceOf(address(this));
        pendingPrizes = totalPendingWithdrawals;

        availableTokens = totalTokenBalance > pendingPrizes
            ? totalTokenBalance - pendingPrizes
            : 0;
    }

    /*//////////////////////////////////////////////////////////////
                            VRF INTERFACE
    //////////////////////////////////////////////////////////////*/

    function fulfillRandomWords(
        uint256 requestId,
        uint256[] calldata randomWords
    ) internal override {
        require(
            requestId == s_requestId,
            "DailyLottery: Unexpected request ID"
        );
        require(
            randomWords.length > 0,
            "DailyLottery: No random words returned"
        );

        s_requestId = 0;

        emit VRFFulfilled(requestId, roundId, randomWords);

        if (paused()) {
            s_pendingRandomWord = randomWords[0];
            s_hasPendingDraw = true;
            emit DrawPendingDueToPause(roundId - 1, requestId);
            return;
        }

        _executeDrawAndDistribute(randomWords[0]);
    }

    /*//////////////////////////////////////////////////////////////
                            INTERNAL FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    function _requestRandomness() internal {
        require(
            s_requestId == 0,
            "DailyLottery: A VRF request is already pending"
        );

        s_currentParticipantsCount = participants.length;
        s_currentTotalPot = prizePoolAmount;
        s_requestParticipants[roundId] = participants;

        s_requestId = s_vrfCoordinator.requestRandomWords(
            VRFV2PlusClient.RandomWordsRequest({
                keyHash: i_keyHash,
                subId: i_subscriptionId,
                requestConfirmations: REQUEST_CONFIRMATIONS,
                callbackGasLimit: callbackGasLimit,
                numWords: 1,
                extraArgs: VRFV2PlusClient._argsToBytes(
                    VRFV2PlusClient.ExtraArgsV1({
                        nativePayment: i_nativePayment
                    })
                )
            })
        );

        _startCooldownAndNewRound();

        emit VRFRequested(s_requestId, roundId - 1, i_keyHash);
    }

    function _cancelRound() internal {
        uint256 currentRoundId = roundId;

        isRoundCancelled[currentRoundId] = true;

        emit RoundCancelled(currentRoundId, participants.length);

        _startCooldownAndNewRound();
    }

    function _executeDrawAndDistribute(uint256 randomWord) internal {
        uint256 drawRoundId = roundId - 1;
        address[] memory currentParticipants = s_requestParticipants[
            drawRoundId
        ];

        delete s_requestParticipants[drawRoundId];

        uint256 totalPot = s_currentTotalPot;
        uint256 participantCount = s_currentParticipantsCount;

        (
            uint256 winnerCount,
            uint256 prizePerWinner
        ) = _calculateSmartDistribution(participantCount, totalPot);

        address[] memory winners = _selectWinners(
            winnerCount,
            currentParticipants,
            randomWord
        );

        roundWinners[drawRoundId] = winners;
        roundPrizePerWinner[drawRoundId] = prizePerWinner;
        roundTotalPot[drawRoundId] = totalPot;
        roundWinnerCount[drawRoundId] = winners.length;

        for (uint256 i = 0; i < winners.length; ) {
            address winner = winners[i];
            isWinner[drawRoundId][winner] = true;

            unchecked {
                pendingWithdrawals[winner] += prizePerWinner;
                totalPendingWithdrawals += prizePerWinner;
            }

            emit PrizeAllocated(winner, drawRoundId, prizePerWinner);

            unchecked {
                ++i;
            }
        }

        emit WinnersDrawn(
            drawRoundId,
            winners,
            totalPot,
            winners.length,
            prizePerWinner
        );
    }

    function _startCooldownAndNewRound() internal {
        uint256 len = participants.length;
        for (uint256 i = 0; i < len; ) {
            hasEntered[participants[i]] = false;
            unchecked {
                ++i;
            }
        }

        delete participants;
        unchecked {
            ++roundId;
        }

        isInCooldown = true;
        roundStartTime = block.timestamp + cooldownPeriod;
        nextDrawTime = roundStartTime + drawInterval;

        emit RoundStarted(roundId, roundStartTime, nextDrawTime, prizePoolAmount);
    }

    function exitCooldown() external onlyOwner {
        require(isInCooldown, "DailyLottery: Not in cool-down");
        require(
            block.timestamp >= roundStartTime,
            "DailyLottery: Cool-down period not over"
        );

        isInCooldown = false;
    }

    function _calculateSmartDistribution(
        uint256 participantCount,
        uint256 totalPot
    )
        internal
        pure
        returns (
            uint256 winnerCount,
            uint256 prizePerWinner
        )
    {
        if (participantCount < 5) {
            winnerCount = 2;
            
        } else if (participantCount >= 5 && participantCount < 10) {
            winnerCount = 3;
            
        } else if (participantCount >= 10 && participantCount < 20) {
            winnerCount = 4;
            
        } else if (participantCount >= 20 && participantCount < 40) {
            winnerCount = 5;
           
        } else if (participantCount >= 40 && participantCount < 80) {
            winnerCount = 10;
        } else {
            winnerCount = 20;
        }

        prizePerWinner = totalPot / winnerCount;

        return (winnerCount, prizePerWinner);
    }

    function _selectWinners(
        uint256 count,
        address[] memory currentParticipants,
        uint256 randomSeed
    ) internal pure returns (address[] memory) {
        uint256 participantCount = currentParticipants.length;
        uint256 actualWinnerCount = count > participantCount
            ? participantCount
            : count;

        address[] memory winners = new address[](actualWinnerCount);
        bool[] memory isChosen = new bool[](participantCount);
        uint256 entropy = randomSeed;

        uint256 selectedCount = 0;
        uint256 attempts = 0;
        uint256 maxAttempts = actualWinnerCount * 10;

        if (maxAttempts > 500) {
            maxAttempts = 500;
        }

        while (selectedCount < actualWinnerCount && attempts < maxAttempts) {
            uint256 randomIndex = uint256(
                keccak256(abi.encodePacked(entropy, attempts))
            ) % participantCount;

            if (!isChosen[randomIndex]) {
                isChosen[randomIndex] = true;
                winners[selectedCount] = currentParticipants[randomIndex];
                unchecked {
                    ++selectedCount;
                }
            }

            unchecked {
                ++attempts;
            }
        }

        require(
            selectedCount == actualWinnerCount,
            "DailyLottery: Failed to select all winners"
        );

        return winners;
    }

    /*//////////////////////////////////////////////////////////////
                    EMERGENCY FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    /// @notice Emergency withdraw - only if contract is paused and stuck
    function emergencyWithdrawAll(address payable to) external onlyOwner {
        require(paused(), "DailyLottery: Must be paused for emergency withdraw");
        require(to != address(0), "DailyLottery: Invalid address");
        
        uint256 balance = address(this).balance;
        require(balance > 0, "DailyLottery: No funds to withdraw");
        
        (bool success, ) = to.call{value: balance}("");
        require(success, "DailyLottery: Emergency withdraw failed");
    }

    /*//////////////////////////////////////////////////////////////
                            RECEIVE FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    receive() external payable {}

    fallback() external payable {
        revert("DailyLottery: Use enter() function to participate");
    }
}