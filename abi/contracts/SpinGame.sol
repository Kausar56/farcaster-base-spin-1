// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract ClaimSpinPrize is Ownable {
    struct DaliyClaimData{ // daliy max claim struct
        uint256 lastClaimDay;
        uint256 claimToday;
    }

    mapping(address => DaliyClaimData) public users;
    uint256 public MAX_ACTIONS_PER_DAY = 5;
    uint256 public totalEarned;
    uint256 public MAX_CLAIM =  0.00005 * 1e18;

    constructor(address initialOwner)  Ownable(initialOwner) {
    
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

    function claimPrize(uint256 _amount) external  {
        require(_amount > 0, "Amount is low!");
        require(_amount < MAX_CLAIM, "Limit cross!");
        DaliyClaimData storage user = users[msg.sender];
        uint256 today = currentDay();

        // If new day, then counter reset 
        if (user.lastClaimDay < today) {
            user.lastClaimDay = today;
            user.claimToday = 0;
        }

        require(user.claimToday < MAX_ACTIONS_PER_DAY, "Daily limit reached");
        user.claimToday++;

        // send prize
        totalEarned = totalEarned + _amount;
        (bool isSent, ) = payable(msg.sender).call{value: _amount}("");
        require(isSent, "Something wrong!");
    }

     receive() external payable {}
}