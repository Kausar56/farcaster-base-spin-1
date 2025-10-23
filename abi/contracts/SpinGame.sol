// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.9.3/contracts/utils/cryptography/ECDSA.sol";

contract ClaimSpinPrize is Ownable, ReentrancyGuard, Pausable  {
    using ECDSA for bytes32;
    struct DaliyClaimData{ // daliy max claim struct
        uint256 lastClaimDay;
        uint256 claimToday;
    }

    mapping(address => DaliyClaimData) public users;
    mapping(address => mapping(uint256 => bool)) public usedNonces;
    uint256 public MAX_ACTIONS_PER_DAY = 5;
    uint256 public totalEarned;
    uint256 public MAX_CLAIM =  0.00005 * 1e18;
    string private  SAFE_CODE;
    address public signerAddress;

    constructor(address initialOwner, address _signerAddress)  Ownable(initialOwner) {
     signerAddress = _signerAddress;
    }

    function setSignerAddress(address _newSigner) external onlyOwner {
        signerAddress = _newSigner;
    }

    function currentDay() internal  view returns (uint256) {
        return block.timestamp / 1 days;
    }

    function diposit() external payable onlyOwner {
        require(msg.value > 0, "Low amount!");
    }
    function withdraw() external onlyOwner{
        payable(msg.sender).transfer(address(this).balance);
    }
    function setMaxLimit(uint256 _max_limit) public onlyOwner{
        MAX_ACTIONS_PER_DAY = _max_limit;
    }
    function setMaxClaim(uint256 _max_claim) public onlyOwner{
        MAX_CLAIM = _max_claim;
    }
    function pause() external onlyOwner {
        _pause();
    }
    function unpause() external onlyOwner {
        _unpause();
    }
    function changeSafeCode(string memory _code) external onlyOwner{
        SAFE_CODE = _code;
    }

    function claimSpinWinPrize(uint256 _amount, uint256 _nonce, bytes memory _signature) external nonReentrant whenNotPaused  {
        require(_amount > 0, "Amount is low!");
        require(_amount <= MAX_CLAIM, "Limit cross!");
        require(address(this).balance >= _amount, "Insufficient contract balance for prize!");
        require(!usedNonces[msg.sender][_nonce], "Nonce already used");
        
        bytes32 structuredMessage = keccak256(abi.encodePacked(
            msg.sender,  // The user claiming the prize
            _amount,     // The exact amount being claimed
            _nonce,      // Unique ID to ensure the claim is fresh
            address(this) // The contract address (context)
        ));

       address recoveredSigner = structuredMessage.toEthSignedMessageHash().recover(_signature);
       require(recoveredSigner == signerAddress, "Invalid Signer!");
   
       
        DaliyClaimData storage user = users[msg.sender];
        uint256 today = currentDay();

        // If new day, then counter reset 
        if (user.lastClaimDay < today) {
            user.lastClaimDay = today;
            user.claimToday = 0;
        }

        require(user.claimToday < MAX_ACTIONS_PER_DAY, "Daily limit reached");
        usedNonces[msg.sender][_nonce] = true;
        user.claimToday++;

        // send prize
        totalEarned = totalEarned + _amount;
        payable(msg.sender).transfer(_amount);
    }

     receive() external payable {}
}