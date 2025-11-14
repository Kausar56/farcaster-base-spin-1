// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

/**
 * @title BXPSwap
 * @notice Allows users to swap BXP tokens for USDT at predefined rates
 * @dev Users burn BXP tokens and receive USDT based on package selection
 */
contract BXPSwap is Ownable, ReentrancyGuard, Pausable {
    using SafeERC20 for IERC20;

    // ============ Custom Errors ============
    error InvalidPackageId();
    error InsufficientBXPBalance();
    error InsufficientUSDTInContract();
    error InsufficientAllowance();
    error ZeroAddress();
    error PackageNotActive();

    // ============ Events ============
    event TokensSwapped(
        address indexed user,
        uint256 indexed packageId,
        uint256 bxpAmount,
        uint256 usdtAmount,
        uint256 timestamp
    );
    event PackageUpdated(
        uint256 indexed packageId,
        uint256 bxpPrice,
        uint256 usdtAmount,
        bool active
    );
    event USDTWithdrawn(address indexed owner, uint256 amount);
    event BXPWithdrawn(address indexed owner, uint256 amount);

    // ============ Structs ============
    struct SwapPackage {
        uint256 bxpPrice;      // Amount of BXP required (in wei)
        uint256 usdtAmount;    // Amount of USDT to receive (in wei)
        bool active;           // Whether package is active
    }

    // ============ State Variables ============
    IERC20 public immutable bxpToken;
    IERC20 public immutable usdtToken;
    
    mapping(uint256 => SwapPackage) public packages;
    mapping(address => uint256) public totalBXPSwapped;
    mapping(address => uint256) public totalUSDTReceived;
    
    uint256 public totalBXPCollected;
    uint256 public totalUSDTDistributed;

    // ============ Constructor ============
    /**
     * @notice Initializes the swap contract with BXP and USDT token addresses
     * @param initialOwner Address of the contract owner
     * @param _bxpToken Address of the BXP token contract
     * @param _usdtToken Address of the USDT token contract
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

        // Initialize default packages (BXP amounts in wei, USDT amounts in wei)
        // Package 1: 10,000 BXP for 5 USDT
        packages[1] = SwapPackage({
            bxpPrice: 10000 * 1e18,
            usdtAmount: 5 * 1e6,  // USDT typically has 6 decimals
            active: true
        });

        // Package 2: 5,000 BXP for 2 USDT
        packages[2] = SwapPackage({
            bxpPrice: 5000 * 1e18,
            usdtAmount: 2 * 1e6,
            active: true
        });

        // Package 3: 2,500 BXP for 1 USDT
        packages[3] = SwapPackage({
            bxpPrice: 2500 * 1e18,
            usdtAmount: 1 * 1e6,
            active: true
        });

        // Package 4: 2,000 BXP for 0.5 USDT
        packages[4] = SwapPackage({
            bxpPrice: 2000 * 1e18,
            usdtAmount: 5 * 1e5,  // 0.5 USDT
            active: true
        });

        // Package 5: 1,000 BXP for 0.3 USDT
        packages[5] = SwapPackage({
            bxpPrice: 1000 * 1e18,
            usdtAmount: 3 * 1e5,  // 0.3 USDT
            active: true
        });

        // Package 6: 500 BXP for 0.1 USDT
        packages[6] = SwapPackage({
            bxpPrice: 500 * 1e18,
            usdtAmount: 1 * 1e5,  // 0.1 USDT
            active: true
        });
    }

    // ============ External Functions ============

    /**
     * @notice Swap BXP tokens for USDT based on selected package
     * @param packageId The ID of the swap package (1-6)
     */
    function swapBXPForUSDT(uint256 packageId) external nonReentrant whenNotPaused {
        SwapPackage memory package = packages[packageId];
        
        // Validate package
        if (packageId == 0 || packageId > 6) revert InvalidPackageId();
        if (!package.active) revert PackageNotActive();

        // Check user's BXP balance
        uint256 userBXPBalance = bxpToken.balanceOf(msg.sender);
        if (userBXPBalance < package.bxpPrice) revert InsufficientBXPBalance();

        // Check user's BXP allowance
        uint256 allowance = bxpToken.allowance(msg.sender, address(this));
        if (allowance < package.bxpPrice) revert InsufficientAllowance();

        // Check contract's USDT balance
        uint256 contractUSDTBalance = usdtToken.balanceOf(address(this));
        if (contractUSDTBalance < package.usdtAmount) revert InsufficientUSDTInContract();

        // Transfer BXP from user to contract (will be burned or held)
        bxpToken.safeTransferFrom(msg.sender, address(this), package.bxpPrice);

        // Transfer USDT from contract to user
        usdtToken.safeTransfer(msg.sender, package.usdtAmount);

        // Update statistics
        unchecked {
            totalBXPSwapped[msg.sender] += package.bxpPrice;
            totalUSDTReceived[msg.sender] += package.usdtAmount;
            totalBXPCollected += package.bxpPrice;
            totalUSDTDistributed += package.usdtAmount;
        }

        emit TokensSwapped(
            msg.sender,
            packageId,
            package.bxpPrice,
            package.usdtAmount,
            block.timestamp
        );
    }

    // ============ Admin Functions ============

    /**
     * @notice Update a swap package configuration
     * @param packageId Package ID to update (1-6)
     * @param bxpPrice New BXP price (in wei)
     * @param usdtAmount New USDT amount (in wei)
     * @param active Whether package is active
     */
    function updatePackage(
        uint256 packageId,
        uint256 bxpPrice,
        uint256 usdtAmount,
        bool active
    ) external onlyOwner {
        if (packageId == 0 || packageId > 6) revert InvalidPackageId();

        packages[packageId] = SwapPackage({
            bxpPrice: bxpPrice,
            usdtAmount: usdtAmount,
            active: active
        });

        emit PackageUpdated(packageId, bxpPrice, usdtAmount, active);
    }

    /**
     * @notice Activate or deactivate a package
     * @param packageId Package ID to update
     * @param active New active status
     */
    function setPackageActive(uint256 packageId, bool active) external onlyOwner {
        if (packageId == 0 || packageId > 6) revert InvalidPackageId();
        
        packages[packageId].active = active;
        
        emit PackageUpdated(
            packageId,
            packages[packageId].bxpPrice,
            packages[packageId].usdtAmount,
            active
        );
    }

    /**
     * @notice Deposit USDT into the contract for swaps
     * @param amount Amount of USDT to deposit
     */
    function depositUSDT(uint256 amount) external onlyOwner {
        usdtToken.safeTransferFrom(msg.sender, address(this), amount);
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
     * @notice Withdraw collected BXP tokens
     * @param amount Amount of BXP to withdraw
     */
    function withdrawBXP(uint256 amount) external onlyOwner {
        bxpToken.safeTransfer(msg.sender, amount);
        emit BXPWithdrawn(msg.sender, amount);
    }

    /**
     * @notice Burn collected BXP tokens (if BXP contract supports burning)
     * @param amount Amount of BXP to burn
     */
    function burnBXP(uint256 amount) external onlyOwner {
        // Transfer to dead address (effectively burning)
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

    // ============ View Functions ============

    /**
     * @notice Get package details
     * @param packageId Package ID to query
     * @return bxpPrice Amount of BXP required
     * @return usdtAmount Amount of USDT to receive
     * @return active Whether package is active
     */
    function getPackage(uint256 packageId) 
        external 
        view 
        returns (
            uint256 bxpPrice,
            uint256 usdtAmount,
            bool active
        ) 
    {
        SwapPackage memory package = packages[packageId];
        return (package.bxpPrice, package.usdtAmount, package.active);
    }

    /**
     * @notice Get all active packages
     * @return packageIds Array of active package IDs
     * @return bxpPrices Array of BXP prices
     * @return usdtAmounts Array of USDT amounts
     */
    function getActivePackages() 
        external 
        view 
        returns (
            uint256[] memory packageIds,
            uint256[] memory bxpPrices,
            uint256[] memory usdtAmounts
        ) 
    {
        // Count active packages
        uint256 activeCount = 0;
        for (uint256 i = 1; i <= 6; i++) {
            if (packages[i].active) activeCount++;
        }

        // Initialize arrays
        packageIds = new uint256[](activeCount);
        bxpPrices = new uint256[](activeCount);
        usdtAmounts = new uint256[](activeCount);

        // Populate arrays
        uint256 index = 0;
        for (uint256 i = 1; i <= 6; i++) {
            if (packages[i].active) {
                packageIds[index] = i;
                bxpPrices[index] = packages[i].bxpPrice;
                usdtAmounts[index] = packages[i].usdtAmount;
                index++;
            }
        }

        return (packageIds, bxpPrices, usdtAmounts);
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
        return (totalBXPSwapped[user], totalUSDTReceived[user]);
    }

    /**
     * @notice Get contract balances
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
}