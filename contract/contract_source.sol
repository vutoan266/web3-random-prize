// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract RandomPrize {
    User[] public userArray;
    
    struct User {
        string _ID;
        address _wallet;
    }
    
    event emitNewUser(address _wallet, string _id);
    
    event emitWinner(address _wallet, string _id);
    
    function random() private view returns (uint) {
        uint randomHash = uint(keccak256(abi.encodePacked(msg.sender, block.difficulty, block.timestamp)));
        return randomHash % 3;
    } 

    function registry(string memory _id) public {
        userArray.push(User(_id, msg.sender));
        emit emitNewUser(msg.sender, _id);
        if (userArray.length == 3) {
            // random winner
            User memory winner = userArray[random()];
            emit emitWinner(winner._wallet, winner._ID);
            delete userArray;
        }
    }
    
}