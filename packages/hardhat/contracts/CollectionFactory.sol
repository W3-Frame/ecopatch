// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./NFTCollection.sol";

contract CollectionFactory {
    address[] public allCollections;

    event CollectionCreated(address indexed creator, address collection);

    function createCollection(
        string memory name,
        string memory symbol,
        string memory baseURI,
        uint256 supply
    ) public {
        NFTCollection collection = new NFTCollection(
            name,
            symbol,
            baseURI,
            supply,
            msg.sender
        );
        allCollections.push(address(collection));
        emit CollectionCreated(msg.sender, address(collection));
    }

    function getCollections() public view returns (address[] memory) {
        return allCollections;
    }
}
