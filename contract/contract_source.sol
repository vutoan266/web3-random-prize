// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract RandomPrize {
    User[] public userArray;
    
    struct User {
        string _ID;
        address _wallet;
    }
    
    event emitData(address _wallet, string _id);
    
    function registry(string memory _id) public {
        userArray.push(User(_id, msg.sender));
        emit emitData(msg.sender, _id);
    }
    
}