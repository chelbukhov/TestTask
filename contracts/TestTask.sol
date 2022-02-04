// SPDX-License-Identifier: Unlicense
// autor: Chelbukhov Aleksey

pragma solidity ^0.8.0;

contract Ownable {
  address public owner;

  constructor() {
    owner = msg.sender;
  }

  modifier onlyOwner() {
    require(msg.sender == owner,"This options is available only for owner");    
    _;
  }

// change owner is not use in this task, functions deleted

}


contract TestTask is Ownable {

    address myAddress = address(this);


    // Mapping and array of investors
    mapping (address => uint) private investors;
    address[] arrInvestors;
    
    function addContribution(address investor, uint amount) internal returns (bool result) {
        if(investors[investor] == 0) {
            arrInvestors.push(investor);
        }
        investors[investor] += amount;
        result = true; //Don't means in now, but may be useful in future...
    }

    function contributionList() public view returns(address[] memory result){
        result = arrInvestors;
    }

    function contributionView(address addr) public view returns(uint){
        return investors[addr];
    }

    function invest() public payable returns (bool result){
        // main function for investing
        require(msg.value > 0,"Contribute some funds to this project, don't be shy");
        result = addContribution(msg.sender, msg.value);
    }
    
    function withdraw(address payable receiver, uint amount) public onlyOwner {
        require (receiver != address(0),"Incorrect address receiver");
        require (myAddress.balance >= amount,"Value is more than balance");
        receiver.transfer(amount);
        //dont write any emits - this options is absent in task
    }

    fallback() external payable {
        revert("Use invest function for contibuting funds.");
    }  
    receive() external payable {
        revert("Use invest function for contibuting funds.");
    }  

}