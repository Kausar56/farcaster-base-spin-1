// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/// @title DailyLottery - Fully Configurable Lottery System with Pull Payment Pattern (Chainlink VRF V2.5)
/// @author Your Name
/// @notice Lottery with adjustable entry fee, draw intervals, and cool-down periods using Chainlink VRF V2.5 for secure randomness.

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
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
    /*//////////////////////////////////////////////////////////////
                            CHAINLINK VRF V2.5
    //////////////////////////////////////////////////////////////*/

    // The Gas Lane (Key Hash)
    bytes32 private immutable i_keyHash;

    // Subscription ID to fund the randomness requests
    uint256 public immutable i_subscriptionId;

    // The number of random words to request
    uint16 private constant REQUEST_CONFIRMATIONS = 3;
    uint32 private constant CALLBACK_GAS_LIMIT = 250000;

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
                            CONSTANTS
    //////////////////////////////////////////////////////////////*/

    /// @notice Minimum participants required for a draw to occur
    uint256 public constant MIN_PARTICIPANTS = 5;

    uint256 public constant MIN_ENTRY_FEE = 0.0001 ether;
    uint256 public constant MAX_ENTRY_FEE = 10 ether;
    uint256 public constant MIN_DRAW_INTERVAL = 1 hours;
    uint256 public constant MAX_DRAW_INTERVAL = 7 days;
    uint256 public constant MIN_COOLDOWN_PERIOD = 30 minutes;
    uint256 public constant MAX_COOLDOWN_PERIOD = 24 hours;

    /*//////////////////////////////////////////////////////////////
                            CONFIGURABLE VARIABLES
    //////////////////////////////////////////////////////////////*/

    uint256 public entryFee;
    uint256 public drawInterval;
    uint256 public cooldownPeriod;

    /*//////////////////////////////////////////////////////////////
                            STATE VARIABLES
    //////////////////////////////////////////////////////////////*/

    uint256 public roundId;
    uint256 public roundStartTime;
    uint256 public nextDrawTime;
    uint256 public roundPot;
    uint256 public carryOverPot;
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

    event Entered(
        address indexed user,
        uint256 indexed roundId,
        uint256 entryFee
    );

    event WinnersDrawn(
        uint256 indexed roundId,
        address[] winners,
        uint256 totalPot,
        uint256 distributed,
        uint256 winnersCount,
        uint256 perWinnerAmount
    );

    event RoundCancelled(
        uint256 indexed roundId,
        uint256 participants,
        uint256 potCarriedOver
    );

    event RoundStarted(
        uint256 indexed roundId,
        uint256 startTime,
        uint256 drawTime,
        uint256 entryFee
    );

    event EntryFeeUpdated(uint256 oldFee, uint256 newFee);
    event DrawIntervalUpdated(uint256 oldInterval, uint256 newInterval);
    event CooldownPeriodUpdated(uint256 oldPeriod, uint256 newPeriod);
    event ReserveWithdrawn(address indexed to, uint256 amount);
    event OwnerForcedDraw(uint256 indexed roundId, address indexed caller);
    //
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

    /*//////////////////////////////////////////////////////////////
                                CONSTRUCTOR
    //////////////////////////////////////////////////////////////*/

    /// @notice Initialize lottery with default settings and Chainlink VRF V2.5 config
    /// @param initialOwner Address that will own the contract
    /// @param vrfCoordinator Chainlink VRF Coordinator address
    /// @param keyHash Key hash (gas lane) for the VRF
    /// @param subscriptionId VRF subscription ID
    /// @param nativePayment Whether to pay in native tokens (true) or LINK (false)
    constructor(
        address initialOwner,
        address vrfCoordinator,
        bytes32 keyHash,
        uint256 subscriptionId,
        bool nativePayment
    )
        VRFConsumerBaseV2Plus(vrfCoordinator) // Initialize VRFConsumerBaseV2Plus (includes ConfirmedOwner)
    {
        // Transfer ownership to initial owner (VRFConsumerBaseV2Plus sets msg.sender as owner)
        if (initialOwner != msg.sender) {
            transferOwnership(initialOwner);
        }

        // Set VRF configuration
        i_keyHash = keyHash;
        i_subscriptionId = subscriptionId;
        i_nativePayment = nativePayment;

        // Default Lottery settings
        entryFee = 0.001 ether;
        drawInterval = 12 hours;
        cooldownPeriod = 3 hours;

        roundId = 1;
        roundStartTime = block.timestamp;
        nextDrawTime = block.timestamp + drawInterval;
        isInCooldown = false;

        emit RoundStarted(roundId, roundStartTime, nextDrawTime, entryFee);
    }

    /*//////////////////////////////////////////////////////////////
                    CHAINLINK AUTOMATION
//////////////////////////////////////////////////////////////*/

    /**
     * @notice Called off-chain by Chainlink nodes to see if upkeep is needed.
     * @dev Returns true if either draw time has ended or cooldown has ended.
     *      Automation is disabled when contract is paused.
     */
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
            participants.length > 0 &&
            s_requestId == 0); // No pending VRF request

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

    /**
     * @notice Called on-chain by Chainlink Keepers when checkUpkeep returns true.
     * @dev Automatically draws winners or exits cooldown. Non-reentrant protection
     *      is provided by the functions it calls (drawWinners, _exitCooldown).
     */
    function performUpkeep(bytes calldata performData) external override {
        require(performData.length > 0, "DailyLottery: Empty perform data");

        (string memory action) = abi.decode(performData, (string));

        if (keccak256(bytes(action)) == keccak256(bytes("DRAW"))) {
            // Verify conditions again (protection against front-running/stale data)
            require(!isInCooldown, "DailyLottery: Round in cool-down period");
            require(
                block.timestamp >= nextDrawTime,
                "DailyLottery: Draw time not reached"
            );
            require(participants.length > 0, "DailyLottery: No participants");
            require(s_requestId == 0, "DailyLottery: VRF request pending");
            require(!paused(), "DailyLottery: Contract is paused");

            // Check minimum participants and either draw or cancel
            if (participants.length < MIN_PARTICIPANTS) {
                _cancelRoundAndCarryOver();
            } else {
                _requestRandomness();
            }
        } else if (keccak256(bytes(action)) == keccak256(bytes("EXIT"))) {
            // Verify conditions again
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

    /**
     * @notice Internal function to exit cooldown and start accepting entries
     */
    function _exitCooldown() internal {
        isInCooldown = false;
    }

    /*//////////////////////////////////////////////////////////////
                            EXTERNAL FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    function enter() external payable nonReentrant whenNotPaused {
        // Auto-exit cooldown if period elapsed
        if (isInCooldown && block.timestamp >= roundStartTime) {
            isInCooldown = false;
        }

        require(!isInCooldown, "DailyLottery: Round in cool-down period");
        require(msg.value == entryFee, "DailyLottery: Incorrect entry fee");
        require(
            !hasEntered[msg.sender],
            "DailyLottery: Already entered this round"
        );

        participants.push(msg.sender);
        hasEntered[msg.sender] = true;
        hasParticipated[roundId][msg.sender] = true;

        unchecked {
            roundPot += msg.value;
        }

        emit Entered(msg.sender, roundId, entryFee);
    }

    // Previous drawWinners Func here.....

    /// @notice Owner can force a draw (for testing/emergency)
    function forceDraw() external onlyOwner nonReentrant {
        require(
            participants.length > 0,
            "DailyLottery: No participants in round"
        );
        require(!isInCooldown, "DailyLottery: Round in cool-down period");

        emit OwnerForcedDraw(roundId, msg.sender);
        // Initiate VRF request
        _requestRandomness();
    }

    /// @notice Pause the lottery (stops entries and draws)
    function pause() external onlyOwner {
        _pause();
    }

    /// @notice Unpause the lottery
    function unpause() external onlyOwner {
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

    function withdrawPrize() external nonReentrant {
        uint256 amount = pendingWithdrawals[msg.sender];
        require(amount > 0, "DailyLottery: No prize to withdraw");

        // Update state before transfer (Checks-Effects-Interactions)
        pendingWithdrawals[msg.sender] = 0;

        unchecked {
            totalPendingWithdrawals -= amount;
        }

        // Transfer funds
        (bool success, ) = msg.sender.call{value: amount}("");

        if (!success) {
            // Revert state if transfer fails
            pendingWithdrawals[msg.sender] = amount;
            unchecked {
                totalPendingWithdrawals += amount;
                failedPaymentCount[msg.sender]++;
            }

            emit WithdrawalFailed(msg.sender, amount, "Transfer failed");
            revert("DailyLottery: Prize transfer failed");
        }

        emit PrizeWithdrawn(msg.sender, amount);
    }

    function batchWithdrawPrizes(
        address[] calldata winners
    ) external onlyOwner nonReentrant {
        uint256 successCount = 0;
        uint256 failCount = 0;

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
                (bool success, ) = winner.call{value: amount, gas: 50000}("");

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
                        failCount++;
                    }
                    emit WithdrawalFailed(
                        winner,
                        amount,
                        "Batch transfer failed"
                    );
                }
            }

            unchecked {
                ++i;
            }
        }

        // Emit summary event or revert if all failed
        require(
            successCount > 0 || failCount == 0,
            "DailyLottery: All batch withdrawals failed"
        );
    }

    function checkPendingPrize(
        address user
    ) external view returns (uint256 amount, uint256 failedAttempts) {
        return (pendingWithdrawals[user], failedPaymentCount[user]);
    }

    /*//////////////////////////////////////////////////////////////
                        CONFIGURATION FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    function setEntryFee(uint256 newEntryFee) external onlyOwner {
        require(
            newEntryFee >= MIN_ENTRY_FEE && newEntryFee <= MAX_ENTRY_FEE,
            "DailyLottery: Entry fee out of bounds"
        );

        uint256 oldFee = entryFee;
        entryFee = newEntryFee;

        emit EntryFeeUpdated(oldFee, newEntryFee);
    }

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

    function withdrawReserve(
        address payable to,
        uint256 amount
    ) external onlyOwner nonReentrant {
        require(
            to != address(0),
            "DailyLottery: Cannot withdraw to zero address"
        );
        require(amount > 0, "DailyLottery: Amount must be greater than zero");

        // Calculate available reserve (excluding active pot and pending prizes)
        uint256 lockedFunds = roundPot + carryOverPot + totalPendingWithdrawals;
        // Safe calculation
        uint256 availableReserve;
        if (address(this).balance > lockedFunds) {
            availableReserve = address(this).balance - lockedFunds;
        } else {
            availableReserve = 0;
        }

        require(
            amount <= availableReserve,
            "DailyLottery: Insufficient reserve (funds locked in active pot or pending prizes)"
        );

        (bool success, ) = to.call{value: amount}("");
        require(success, "DailyLottery: Withdraw transfer failed");

        emit ReserveWithdrawn(to, amount);
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
        returns (bool won, uint256 prizeAmount, uint256 previousRoundId)
    {
        // Only return result if we're in cooldown (just after a draw)
        if (!isInCooldown || roundId == 1) {
            return (false, 0, 0);
        }

        previousRoundId = roundId - 1;
        won = isWinner[previousRoundId][user];
        prizeAmount = won ? roundPrizePerWinner[previousRoundId] : 0;

        return (won, prizeAmount, previousRoundId);
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
            uint256 currentEntryFee,
            uint256 currentDrawInterval,
            uint256 currentCooldownPeriod,
            bool inCooldown,
            uint256 cooldownEndsAt,
            bool isPaused
        )
    {
        currentRound = roundId;
        currentEntryFee = entryFee;
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

    /// @notice Get comprehensive draw status - updated to reflect pending VRF request
    function getDrawStatus()
        external
        view
        returns (
            uint256 timeUntilDraw,
            uint256 drawTime,
            bool canDrawNow,
            uint256 participantCount,
            uint256 currentPot,
            uint256 totalPot,
            bool meetsMinimum,
            uint256 expectedWinners,
            uint256 estimatedPrizePerWinner,
            bool inCooldown,
            uint256 pendingRequestId
        )
    {
        drawTime = nextDrawTime;
        participantCount = participants.length;
        currentPot = roundPot;
        totalPot = roundPot + carryOverPot;
        meetsMinimum = participantCount >= MIN_PARTICIPANTS;
        inCooldown = isInCooldown;
        pendingRequestId = s_requestId;

        // Cannot draw if a request is already pending
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

        // Calculate expected winners and prize
        if (meetsMinimum && !isInCooldown) {
            (
                expectedWinners,
                ,
                estimatedPrizePerWinner
            ) = _calculateSmartDistribution(participantCount, totalPot);
        }
    }

    function getFinancialStatus()
        external
        view
        returns (
            uint256 totalBalance,
            uint256 activeRoundPot,
            uint256 carryOver,
            uint256 pendingPrizes,
            uint256 availableReserve
        )
    {
        totalBalance = address(this).balance;
        activeRoundPot = roundPot;
        carryOver = carryOverPot;
        pendingPrizes = totalPendingWithdrawals;

        uint256 lockedFunds = roundPot + carryOverPot + totalPendingWithdrawals;
        availableReserve = totalBalance > lockedFunds
            ? totalBalance - lockedFunds
            : 0;
    }

    /*//////////////////////////////////////////////////////////////
                            VRF INTERFACE
    //////////////////////////////////////////////////////////////*/

    /// @notice Chainlink VRF V2.5 Callback function
    /// @dev Called by the VRF Coordinator when randomness is available
    /// @param requestId The request ID originally returned by requestRandomWords()
    /// @param randomWords The array of random words
    function fulfillRandomWords(
        uint256 requestId,
        uint256[] calldata randomWords
    ) internal override {
        // Revert if the request ID does not match the current one
        require(
            requestId == s_requestId,
            "DailyLottery: Unexpected request ID"
        );
        require(
            randomWords.length > 0,
            "DailyLottery: No random words returned"
        );

        // Reset request ID immediately to allow a new request in the next round
        s_requestId = 0;

        emit VRFFulfilled(requestId, roundId, randomWords);

        if (paused()) {
            s_pendingRandomWord = randomWords[0];
            s_hasPendingDraw = true;
            emit DrawPendingDueToPause(roundId - 1, requestId);
            return;
        }

        // Continue the draw process now that we have the random number
        _executeDrawAndDistribute(randomWords[0]);
    }

    /*//////////////////////////////////////////////////////////////
                            INTERNAL FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    /// @notice Request randomness from Chainlink VRF V2.5
    function _requestRandomness() internal {
        // Prevent a new request if one is already pending
        require(
            s_requestId == 0,
            "DailyLottery: A VRF request is already pending"
        );

        // Save participants and pot before clearing them in the _startCooldownAndNewRound step
        s_currentParticipantsCount = participants.length;
        s_currentTotalPot = roundPot + carryOverPot;
        s_requestParticipants[roundId] = participants;

        // Request a single random number using VRF V2.5
        s_requestId = s_vrfCoordinator.requestRandomWords(
            VRFV2PlusClient.RandomWordsRequest({
                keyHash: i_keyHash,
                subId: i_subscriptionId,
                requestConfirmations: REQUEST_CONFIRMATIONS,
                callbackGasLimit: CALLBACK_GAS_LIMIT,
                numWords: 1,
                extraArgs: VRFV2PlusClient._argsToBytes(
                    VRFV2PlusClient.ExtraArgsV1({
                        nativePayment: i_nativePayment
                    })
                )
            })
        );

        // Prepare for the next round immediately, the actual prize allocation happens in the callback
        _startCooldownAndNewRound();

        emit VRFRequested(s_requestId, roundId - 1, i_keyHash);
    }

    /// @notice Cancel round and carry over pot to next round
    function _cancelRoundAndCarryOver() internal {
        uint256 currentRoundId = roundId;
        uint256 potToCarry = roundPot;

        unchecked {
            carryOverPot += potToCarry;
        }

        emit RoundCancelled(currentRoundId, participants.length, potToCarry);

        // Start cool-down and then new round
        _startCooldownAndNewRound();
    }

    /// @notice Execute winner selection and fund distribution (Pull Payment Pattern)
    /// @param randomWord The random number from the VRF callback
    function _executeDrawAndDistribute(uint256 randomWord) internal {
        // Use the saved data from the request transaction (roundId - 1 is the round that just ended)
        uint256 drawRoundId = roundId - 1;
        address[] memory currentParticipants = s_requestParticipants[
            drawRoundId
        ];

        // Ensure we clean up the temporary storage for the previous round
        delete s_requestParticipants[drawRoundId];

        uint256 totalPot = s_currentTotalPot;
        uint256 participantCount = s_currentParticipantsCount;

        // Calculate smart distribution
        (
            uint256 winnerCount,
            uint256 distributionPercentage,
            uint256 prizePerWinner
        ) = _calculateSmartDistribution(participantCount, totalPot);

        // Select winners using the random word
        address[] memory winners = _selectWinners(
            winnerCount,
            currentParticipants,
            randomWord
        );

        uint256 distributeAmount = (totalPot * distributionPercentage) / 100;

        // Store round results for winner tracking
        roundWinners[drawRoundId] = winners;
        roundPrizePerWinner[drawRoundId] = prizePerWinner;
        roundTotalPot[drawRoundId] = totalPot;
        roundWinnerCount[drawRoundId] = winners.length;

        // Allocate prizes to winners (Pull Payment Pattern)
        for (uint256 i = 0; i < winners.length; ) {
            address winner = winners[i];
            isWinner[drawRoundId][winner] = true;

            // Add to pending withdrawals instead of direct transfer
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
            distributeAmount,
            winners.length,
            prizePerWinner
        );

        // Reset carry over pot
        carryOverPot = 0;
    }

    /// @notice Start cool-down period and prepare for new round
    function _startCooldownAndNewRound() internal {
        // Clear participants for the *new* round
        uint256 len = participants.length;
        for (uint256 i = 0; i < len; ) {
            hasEntered[participants[i]] = false;
            unchecked {
                ++i;
            }
        }

        delete participants;
        roundPot = 0;
        unchecked {
            ++roundId;
        }

        // Enter cool-down mode
        isInCooldown = true;
        roundStartTime = block.timestamp + cooldownPeriod;
        nextDrawTime = roundStartTime + drawInterval;

        emit RoundStarted(roundId, roundStartTime, nextDrawTime, entryFee);
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
            uint256 distributionPercentage,
            uint256 prizePerWinner
        )
    {
        if (participantCount < 5) {
            winnerCount = 1;
            distributionPercentage = 80;
        } else if (participantCount >= 5 && participantCount < 10) {
            winnerCount = 1;
            distributionPercentage = 70;
        } else if (participantCount >= 10 && participantCount < 20) {
            winnerCount = 2;
            distributionPercentage = 60;
        } else if (participantCount >= 20 && participantCount < 40) {
            winnerCount = 3;
            distributionPercentage = 55;
        } else if (participantCount >= 40 && participantCount < 80) {
            winnerCount = 4;
            distributionPercentage = 50;
        } else {
            winnerCount = 5;
            distributionPercentage = 50;
        }

        uint256 distributeAmount = (totalPot * distributionPercentage) / 100;
        prizePerWinner = distributeAmount / winnerCount;

        return (winnerCount, distributionPercentage, prizePerWinner);
    }

    /// @notice Select unique winners using the VRF random word
    /// @param count Number of winners to select
    /// @param currentParticipants Array of participants for the drawing round
    /// @param randomSeed The secure random number from Chainlink VRF
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
        uint256 entropy = randomSeed; // Use the VRF random word as the initial entropy

        uint256 selectedCount = 0;
        uint256 attempts = 0;
        uint256 maxAttempts = actualWinnerCount * 10; // Safety break

        if (maxAttempts > 500) {
            maxAttempts = 500; // Absolute maximum
        }

        while (selectedCount < actualWinnerCount && attempts < maxAttempts) {
            // Use keccak256 with the entropy and attempt count for multiple 'random' selections
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

        // Ensure we got all winners
        require(
            selectedCount == actualWinnerCount,
            "DailyLottery: Failed to select all winners"
        );

        return winners;
    }

    /*//////////////////////////////////////////////////////////////
                            RECEIVE FUNCTIONS
    //////////////////////////////////////////////////////////////*/

    receive() external payable {}

    fallback() external payable {
        revert("DailyLottery: Use enter() function to participate");
    }
}
