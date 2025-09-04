// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract NFTCollection is ERC721 {
    uint256 public immutable totalSupply;
    string private _baseTokenURI;

    constructor(
        string memory name,
        string memory symbol,
        string memory baseURI,
        uint256 supply,
        address creator
    ) ERC721(name, symbol) {
        _baseTokenURI = baseURI;
        totalSupply = supply;

        // Mint automatique de tous les NFT au créateur
        for (uint256 i = 0; i < supply; i++) {
            _safeMint(creator, i);
        }
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }
}
