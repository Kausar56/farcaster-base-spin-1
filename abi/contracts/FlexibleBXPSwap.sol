// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

/**
 * @title BXPSwap
 * @notice Allows users to swap BXP tokens for USDT at a fixed rate of 1 BXP = 0.01 USDT
 * @dev Users transfer BXP tokens and receive USDT based on fixed rate
 */
contract BXPSwap is Ownable, ReentrancyGuard, Pausable {
    using SafeERC20 for IERC20;

    // ============ Custom Errors ============
    error BelowMinimumSwap();
    error InsufficientBXPBalance();
    error InsufficientUSDTInContract();
    error InsufficientAllowance();
    error ZeroAddress();
    error ZeroAmount();

    // ============ Events ============
    event TokensSwapped(
        address indexed user,
        uint256 bxpAmount,
        uint256 usdtAmount,
        uint256 timestamp
    );
    event RateUpdated(uint256 oldRate, uint256 newRate);
    event MinSwapUpdated(uint256 oldMin, uint256 newMin);
    event USDTDeposited(address indexed from, uint256 amount);
    event USDTWithdrawn(address indexed to, uint256 amount);
    event BXPWithdrawn(address indexed to, uint256 amount);

    // ============ State Variables ============
    IERC20 public immutable bxpToken;
    IERC20 public immutable usdtToken;
    
    // Rate: 1 BXP = 0.01 USDT (represented as 1 BXP = 10000 USDT units, since USDT has 6 decimals)
    // 1 BXP (18 decimals) = 0.01 USDT (6 decimals) = 10000 USDT units
    uint256 public bxpToUsdtRate; // USDT units per 1 BXP (with 18 decimals)
    
    uint256 public minSwapAmount; // Minimum BXP amount (in wei, 18 decimals)
    
    // Statistics
    mapping(address => uint256) public userTotalBXPSwapped;
    mapping(address => uint256) public userTotalUSDTReceived;
    uint256 public totalBXPCollected;
    uint256 public totalUSDTDistributed;

    // ============ Constructor ============
    /**
     * @notice Initializes the swap contract with BXP and USDT token addresses
     * @param initialOwner Address of the contract owner
     * @param _bxpToken Address of the BXP token contract (18 decimals)
     * @param _usdtToken Address of the USDT token contract (6 decimals)
     */
    constructor(
        address initialOwner,
        address _bxpToken,
        address _usdtToken
    ) Ownable(initialOwner) {
        if (initialOwner == address(0) || _bxpToken == address(0) || _usdtToken == address(0)) {
            revert ZeroAddress();
        }

        bxpToken = IERC20(_bxpToken);
        usdtToken = IERC20(_usdtToken);
        
        // Set rate: 1 BXP = 0.01 USDT
        // 1 BXP (1e18) = 0.01 USDT (1e4 USDT units, since USDT has 6 decimals)
        bxpToUsdtRate = 1e4; // 10000 USDT units (0.01 USDT with 6 decimals)
        
        // Set minimum swap: 100 BXP
        minSwapAmount = 100 * 1e18;
    }

    // ============ External Functions ============

    /**
     * @notice Swap BXP tokens for USDT at fixed rate (1 BXP = 0.01 USDT)
     * @param bxpAmount Amount of BXP tokens to swap (in wei, 18 decimals)
     */
    function swapBXPForUSDT(uint256 bxpAmount) external nonReentrant whenNotPaused {
        if (bxpAmount == 0) revert ZeroAmount();
        if (bxpAmount < minSwapAmount) revert BelowMinimumSwap();

        // Calculate USDT amount to receive
        // Formula: usdtAmount = (bxpAmount * bxpToUsdtRate) / 1e18
        uint256 usdtAmount = (bxpAmount * bxpToUsdtRate) / 1e18;

        // Check user's BXP balance
        uint256 userBXPBalance = bxpToken.balanceOf(msg.sender);
        if (userBXPBalance < bxpAmount) revert InsufficientBXPBalance();

        // Check user's BXP allowance
        uint256 allowance = bxpToken.allowance(msg.sender, address(this));
        if (allowance < bxpAmount) revert InsufficientAllowance();

        // Check contract's USDT balance
        uint256 contractUSDTBalance = usdtToken.balanceOf(address(this));
        if (contractUSDTBalance < usdtAmount) revert InsufficientUSDTInContract();

        // Transfer BXP from user to contract
        bxpToken.safeTransferFrom(msg.sender, address(this), bxpAmount);

        // Transfer USDT from contract to user
        usdtToken.safeTransfer(msg.sender, usdtAmount);

        // Update statistics
        unchecked {
            userTotalBXPSwapped[msg.sender] += bxpAmount;
            userTotalUSDTReceived[msg.sender] += usdtAmount;
            totalBXPCollected += bxpAmount;
            totalUSDTDistributed += usdtAmount;
        }

        emit TokensSwapped(msg.sender, bxpAmount, usdtAmount, block.timestamp);
    }

    /**
     * @notice Calculate USDT amount for given BXP amount
     * @param bxpAmount Amount of BXP tokens
     * @return usdtAmount Amount of USDT to receive
     */
    function calculateUSDTAmount(uint256 bxpAmount) external view returns (uint256 usdtAmount) {
        return (bxpAmount * bxpToUsdtRate) / 1e18;
    }

    /**
     * @notice Calculate BXP amount needed for given USDT amount
     * @param usdtAmount Amount of USDT desired
     * @return bxpAmount Amount of BXP needed
     */
    function calculateBXPAmount(uint256 usdtAmount) external view returns (uint256 bxpAmount) {
        return (usdtAmount * 1e18) / bxpToUsdtRate;
    }

    // ============ Admin Functions ============

    /**
     * @notice Update the BXP to USDT conversion rate
     * @param newRate New rate in USDT units per 1 BXP (18 decimals)
     * @dev Example: For 1 BXP = 0.01 USDT, set newRate = 1e4 (10000)
     *      For 1 BXP = 0.02 USDT, set newRate = 2e4 (20000)
     */
    function setRate(uint256 newRate) external onlyOwner {
        uint256 oldRate = bxpToUsdtRate;
        bxpToUsdtRate = newRate;
        emit RateUpdated(oldRate, newRate);
    }

    /**
     * @notice Update minimum swap amount
     * @param newMinAmount New minimum swap amount in BXP (in wei)
     */
    function setMinSwapAmount(uint256 newMinAmount) external onlyOwner {
        uint256 oldMin = minSwapAmount;
        minSwapAmount = newMinAmount;
        emit MinSwapUpdated(oldMin, newMinAmount);
    }

    /**
     * @notice Deposit USDT into the contract for swaps
     * @param amount Amount of USDT to deposit
     */
    function depositUSDT(uint256 amount) external onlyOwner {
        usdtToken.safeTransferFrom(msg.sender, address(this), amount);
        emit USDTDeposited(msg.sender, amount);
    }

    /**
     * @notice Withdraw USDT from the contract
     * @param amount Amount of USDT to withdraw
     */
    function withdrawUSDT(uint256 amount) external onlyOwner {
        usdtToken.safeTransfer(msg.sender, amount);
        emit USDTWithdrawn(msg.sender, amount);
    }

    /**
     * @notice Withdraw all USDT from the contract
     */
    function withdrawAllUSDT() external onlyOwner {
        uint256 balance = usdtToken.balanceOf(address(this));
        usdtToken.safeTransfer(msg.sender, balance);
        emit USDTWithdrawn(msg.sender, balance);
    }

    /**
     * @notice Withdraw collected BXP tokens
     * @param amount Amount of BXP to withdraw
     */
    function withdrawBXP(uint256 amount) external onlyOwner {
        bxpToken.safeTransfer(msg.sender, amount);
        emit BXPWithdrawn(msg.sender, amount);
    }

    /**
     * @notice Withdraw all collected BXP tokens
     */
    function withdrawAllBXP() external onlyOwner {
        uint256 balance = bxpToken.balanceOf(address(this));
        bxpToken.safeTransfer(msg.sender, balance);
        emit BXPWithdrawn(msg.sender, balance);
    }

    /**
     * @notice Burn collected BXP tokens by sending to dead address
     * @param amount Amount of BXP to burn
     */
    function burnBXP(uint256 amount) external onlyOwner {
        bxpToken.safeTransfer(address(0x000000000000000000000000000000000000dEaD), amount);
    }

    /**
     * @notice Pause all swap operations
     */
    function pause() external onlyOwner {
        _pause();
    }

    /**
     * @notice Unpause all swap operations
     */
    function unpause() external onlyOwner {
        _unpause();
    }

    /**
     * @notice Emergency withdraw any ERC20 token
     * @param token Token address to withdraw
     * @param amount Amount to withdraw
     */
    function emergencyWithdrawToken(address token, uint256 amount) external onlyOwner {
        if (token == address(0)) revert ZeroAddress();
        IERC20(token).safeTransfer(msg.sender, amount);
    }

    // ============ View Functions ============

    /**
     * @notice Get current exchange rate information
     * @return rate Current rate (USDT units per 1 BXP)
     * @return minSwap Minimum swap amount in BXP
     * @return rateReadable Human readable rate (e.g., "0.01" for 1 BXP = 0.01 USDT)
     */
    function getRateInfo() 
        external 
        view 
        returns (
            uint256 rate,
            uint256 minSwap,
            uint256 rateReadable
        ) 
    {
        return (
            bxpToUsdtRate,
            minSwapAmount,
            bxpToUsdtRate // This represents 0.01 USDT when value is 10000
        );
    }

    /**
     * @notice Get user's swap statistics
     * @param user Address to query
     * @return bxpSwapped Total BXP swapped by user
     * @return usdtReceived Total USDT received by user
     */
    function getUserStats(address user) 
        external 
        view 
        returns (uint256 bxpSwapped, uint256 usdtReceived) 
    {
        return (userTotalBXPSwapped[user], userTotalUSDTReceived[user]);
    }

    /**
     * @notice Get contract token balances
     * @return bxpBalance Current BXP balance in contract
     * @return usdtBalance Current USDT balance in contract
     */
    function getContractBalances() 
        external 
        view 
        returns (uint256 bxpBalance, uint256 usdtBalance) 
    {
        return (
            bxpToken.balanceOf(address(this)),
            usdtToken.balanceOf(address(this))
        );
    }

    /**
     * @notice Get global swap statistics
     * @return bxpCollected Total BXP collected
     * @return usdtDistributed Total USDT distributed
     */
    function getGlobalStats() 
        external 
        view 
        returns (uint256 bxpCollected, uint256 usdtDistributed) 
    {
        return (totalBXPCollected, totalUSDTDistributed);
    }

    /**
     * @notice Check if user can swap given amount
     * @param user User address
     * @param bxpAmount Amount of BXP to swap
     * @return canSwap Whether swap is possible
     * @return reason Reason if swap is not possible (empty if possible)
     */
    function canSwap(address user, uint256 bxpAmount) 
        external 
        view 
        returns (bool , string memory reason) 
    {
        if (bxpAmount < minSwapAmount) {
            return (false, "Below minimum swap amount");
        }
        
        if (bxpToken.balanceOf(user) < bxpAmount) {
            return (false, "Insufficient BXP balance");
        }
        
        if (bxpToken.allowance(user, address(this)) < bxpAmount) {
            return (false, "Insufficient allowance");
        }
        
        uint256 usdtAmount = (bxpAmount * bxpToUsdtRate) / 1e18;
        if (usdtToken.balanceOf(address(this)) < usdtAmount) {
            return (false, "Insufficient USDT in contract");
        }
        
        if (paused()) {
            return (false, "Contract is paused");
        }
        
        return (true, "");
    }
}