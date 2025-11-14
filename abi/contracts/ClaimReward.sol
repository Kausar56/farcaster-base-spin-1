// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

/**
 * @title ClaimReward
 * @notice Manages daily claims and spin-to-win prize distributions with signature verification
 * @dev Implements daily limits, nonce management, and signature-based authorization
 */
contract ClaimReward is Ownable, ReentrancyGuard, Pausable {
    using ECDSA for bytes32;
    using MessageHashUtils for bytes32;
    using SafeERC20 for IERC20;

    // ============ Custom Errors ============
    error InvalidAmount();
    error AmountExceedsMaxClaim();
    error InsufficientContractBalance();
    error NonceAlreadyUsed();
    error InvalidSignature();
    error DailyLimitReached();
    error DailyRewardAlreadyClaimed();
    error ZeroAddress();
    error NoBalanceToWithdraw();

    // ============ Events ============
    event SpinPrizeClaimed(
        address indexed user,
        uint256 amount,
        uint256 nonce,
        uint256 timestamp
    );
    event DailyClaimed(
        address indexed user,
        uint256 count,
        uint256 timestamp
    );
    event SignerUpdated(address indexed oldSigner, address indexed newSigner);
    event MaxActionsUpdated(uint256 oldMax, uint256 newMax);
    event MaxClaimUpdated(uint256 oldMax, uint256 newMax);
    event TokensWithdrawn(address indexed token, uint256 amount);
    event EthWithdrawn(uint256 amount);

    // ============ Structs ============
    struct DailyClaimData {
        uint64 lastClaimDay;
        uint64 claimToday;
    }

    // ============ State Variables ============
    IERC20 public immutable bxpToken;
    address public signerAddress;
    
    uint256 public maxActionsPerDay;
    uint256 public maxClaim;
    uint256 public totalEarned;
    uint256 public dailyClaimAmount;
    
    uint256 public constant DAILY_COOLDOWN = 24 hours;
    uint256 private constant SECONDS_PER_DAY = 1 days;

    mapping(address => DailyClaimData) public users;
    mapping(address => mapping(uint256 => bool)) public usedNonces;
    mapping(address => uint256) public lastActionTime;
    mapping(address => uint256) public userGMCount;

    // ============ Constructor ============
    /**
     * @notice Initializes the contract with required parameters
     * @param initialOwner Address of the contract owner
     * @param _signerAddress Address authorized to sign claim requests
     * @param _bxpTokenAddress Address of the BXP token contract
     */
    constructor(
        address initialOwner,
        address _signerAddress,
        address _bxpTokenAddress
    ) Ownable(initialOwner) {
        if (initialOwner == address(0) || _signerAddress == address(0) || _bxpTokenAddress == address(0)) {
            revert ZeroAddress();
        }
        
        signerAddress = _signerAddress;
        bxpToken = IERC20(_bxpTokenAddress);
        maxActionsPerDay = 5;
        maxClaim = 500 * 1e18;
        dailyClaimAmount = 100 * 1e18; // 10 BXP tokens
    }

    // ============ External Functions ============

    /**
     * @notice Claims spin-to-win prize with signature verification
     * @param _amount Amount of tokens to claim
     * @param _nonce Unique nonce to prevent replay attacks
     * @param _signature Signature from authorized signer
     */
    function claimSpinWinPrize(
        uint256 _amount,
        uint256 _nonce,
        bytes calldata _signature
    ) external nonReentrant whenNotPaused {
        if (_amount == 0) revert InvalidAmount();
        if (_amount > maxClaim) revert AmountExceedsMaxClaim();
        if (bxpToken.balanceOf(address(this)) < _amount) {
            revert InsufficientContractBalance();
        }
        if (usedNonces[msg.sender][_nonce]) revert NonceAlreadyUsed();

        // Verify signature
        bytes32 messageHash = keccak256(
            abi.encodePacked(msg.sender, _amount, _nonce, address(this))
        );
        address recoveredSigner = messageHash.toEthSignedMessageHash().recover(_signature);
        
        if (recoveredSigner != signerAddress) revert InvalidSignature();

        // Check daily limits
        DailyClaimData storage user = users[msg.sender];
        uint256 today = _currentDay();

        if (user.lastClaimDay < today) {
            user.lastClaimDay = uint64(today);
            user.claimToday = 0;
        }

        if (user.claimToday >= maxActionsPerDay) revert DailyLimitReached();

        // Update state
        usedNonces[msg.sender][_nonce] = true;
        unchecked {
            user.claimToday++;
            totalEarned += _amount;
        }

        // Transfer tokens
        bxpToken.safeTransfer(msg.sender, _amount);

        emit SpinPrizeClaimed(msg.sender, _amount, _nonce, block.timestamp);
    }

    /**
     * @notice Claims daily reward with signature verification
     * @param _nonce Unique nonce to prevent replay attacks
     * @param _signature Signature from authorized signer
     */
    function dailyClaim(
        uint256 _nonce,
        bytes calldata _signature
    ) external nonReentrant whenNotPaused {
        if (block.timestamp < lastActionTime[msg.sender] + DAILY_COOLDOWN) {
            revert DailyRewardAlreadyClaimed();
        }
        if (usedNonces[msg.sender][_nonce]) revert NonceAlreadyUsed();
        if (bxpToken.balanceOf(address(this)) < dailyClaimAmount) {
            revert InsufficientContractBalance();
        }

        // Verify signature
        bytes32 messageHash = keccak256(
            abi.encodePacked(msg.sender, dailyClaimAmount, _nonce, address(this))
        );
        address recoveredSigner = messageHash.toEthSignedMessageHash().recover(_signature);
        
        if (recoveredSigner != signerAddress) revert InvalidSignature();

        // Update state
        usedNonces[msg.sender][_nonce] = true;
        lastActionTime[msg.sender] = block.timestamp;
        
        unchecked {
            userGMCount[msg.sender]++;
            totalEarned += dailyClaimAmount;
        }

        // Transfer daily reward tokens
        bxpToken.safeTransfer(msg.sender, dailyClaimAmount);

        emit DailyClaimed(msg.sender, userGMCount[msg.sender], block.timestamp);
    }

    // ============ Admin Functions ============

    /**
     * @notice Updates the authorized signer address
     * @param _newSigner New signer address
     */
    function setSignerAddress(address _newSigner) external onlyOwner {
        if (_newSigner == address(0)) revert ZeroAddress();
        address oldSigner = signerAddress;
        signerAddress = _newSigner;
        emit SignerUpdated(oldSigner, _newSigner);
    }

    /**
     * @notice Updates maximum actions allowed per day
     * @param _maxActionsPerDay New maximum actions per day
     */
    function setMaxActionsPerDay(uint256 _maxActionsPerDay) external onlyOwner {
        uint256 oldMax = maxActionsPerDay;
        maxActionsPerDay = _maxActionsPerDay;
        emit MaxActionsUpdated(oldMax, _maxActionsPerDay);
    }

    /**
     * @notice Updates maximum claimable amount per transaction
     * @param _maxClaim New maximum claim amount
     */
    function setMaxClaim(uint256 _maxClaim) external onlyOwner {
        uint256 oldMax = maxClaim;
        maxClaim = _maxClaim;
        emit MaxClaimUpdated(oldMax, _maxClaim);
    }

    /**
     * @notice Updates daily claim amount
     * @param _dailyClaimAmount New daily claim amount
     */
    function setDailyClaimAmount(uint256 _dailyClaimAmount) external onlyOwner {
        dailyClaimAmount = _dailyClaimAmount;
    }

    /**
     * @notice Pauses all claim operations
     */
    function pause() external onlyOwner {
        _pause();
    }

    /**
     * @notice Unpauses all claim operations
     */
    function unpause() external onlyOwner {
        _unpause();
    }

    /**
     * @notice Withdraws ERC20 tokens from contract
     * @param token Token address to withdraw
     * @param amount Amount to withdraw
     */
    function withdrawToken(address token, uint256 amount) external onlyOwner {
        if (token == address(0)) revert ZeroAddress();
        if (amount == 0) revert InvalidAmount();
        
        IERC20(token).safeTransfer(msg.sender, amount);
        emit TokensWithdrawn(token, amount);
    }

    /**
     * @notice Withdraws ETH from contract
     */
    function withdrawEth() external onlyOwner {
        uint256 balance = address(this).balance;
        if (balance == 0) revert NoBalanceToWithdraw();
        
        (bool success, ) = payable(msg.sender).call{value: balance}("");
        require(success, "ETH transfer failed");
        
        emit EthWithdrawn(balance);
    }

    // ============ View Functions ============

    /**
     * @notice Gets user's daily claim data
     * @param user Address to query
     * @return lastClaimDay Last day user claimed
     * @return claimToday Number of claims made today
     * @return remainingClaims Remaining claims for today
     */
    function getUserClaimData(address user) 
        external 
        view 
        returns (
            uint256 lastClaimDay,
            uint256 claimToday,
            uint256 remainingClaims
        ) 
    {
        DailyClaimData memory userData = users[user];
        uint256 today = _currentDay();
        
        if (userData.lastClaimDay < today) {
            return (userData.lastClaimDay, 0, maxActionsPerDay);
        }
        
        uint256 remaining = userData.claimToday >= maxActionsPerDay 
            ? 0 
            : maxActionsPerDay - userData.claimToday;
            
        return (userData.lastClaimDay, userData.claimToday, remaining);
    }

    /**
     * @notice Checks if daily claim is available for user
     * @param user Address to check
     * @return available True if daily claim is available
     * @return timeUntilNext Time until next claim is available
     */
    function isDailyClaimAvailable(address user) 
        external 
        view 
        returns (bool available, uint256 timeUntilNext) 
    {
        uint256 nextAvailable = lastActionTime[user] + DAILY_COOLDOWN;
        
        if (block.timestamp >= nextAvailable) {
            return (true, 0);
        }
        
        return (false, nextAvailable - block.timestamp);
    }

    /**
     * @notice Gets contract token balance
     * @return balance Current BXP token balance
     */
    function getContractTokenBalance() external view returns (uint256 balance) {
        return bxpToken.balanceOf(address(this));
    }

    // ============ Internal Functions ============

    /**
     * @notice Calculates current day number
     * @return Current day since epoch
     */
    function _currentDay() internal view returns (uint256) {
        return block.timestamp / SECONDS_PER_DAY;
    }

    // ============ Receive Function ============
    
    /**
     * @notice Allows contract to receive ETH
     */
    receive() external payable {}
}