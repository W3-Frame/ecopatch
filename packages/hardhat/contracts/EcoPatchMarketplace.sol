// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract EcoPatchMarketplace is Ownable, ReentrancyGuard {
    struct Project {
        string name;
        string location;
        string description;
        string imageUrl;
        uint256 totalPatches;
        uint256 pricePerPatch;
        uint256 carbonCreditsPerPatch;
        address nftCollection;
        bool isActive;
        bool isPool; // true for pool, false for direct sale
    }

    struct Listing {
        address seller;
        address nftContract;
        uint256 tokenId;
        uint256 price;
        bool isActive;
    }

    struct CarbonCredits {
        uint256 total;
        uint256 claimed;
        uint256 lastDistribution;
    }

    mapping(uint256 => Project) public projects;
    mapping(uint256 => Listing) public listings;
    mapping(address => mapping(address => uint256[])) public userNFTs;
    mapping(address => mapping(uint256 => CarbonCredits)) public userCarbonCredits;
    mapping(address => uint256) public userTotalCarbonCredits;
    
    uint256 public projectCounter;
    uint256 public listingCounter;
    uint256 public platformFeePercentage = 25; // 2.5%
    
    event ProjectCreated(uint256 indexed projectId, string name, address nftCollection);
    event PatchPurchased(uint256 indexed projectId, address buyer, uint256 tokenId, uint256 price);
    event PatchListed(uint256 indexed listingId, address seller, uint256 tokenId, uint256 price);
    event PatchSold(uint256 indexed listingId, address seller, address buyer, uint256 price);
    event CarbonCreditsDistributed(uint256 indexed projectId, uint256 amount);
    event CarbonCreditsClaimed(address user, uint256 amount);

    constructor() Ownable(msg.sender) {}

    function createProject(
        string memory _name,
        string memory _location,
        string memory _description,
        string memory _imageUrl,
        uint256 _totalPatches,
        uint256 _pricePerPatch,
        uint256 _carbonCreditsPerPatch,
        address _nftCollection,
        bool _isPool
    ) external onlyOwner {
        uint256 projectId = projectCounter++;
        
        projects[projectId] = Project({
            name: _name,
            location: _location,
            description: _description,
            imageUrl: _imageUrl,
            totalPatches: _totalPatches,
            pricePerPatch: _pricePerPatch,
            carbonCreditsPerPatch: _carbonCreditsPerPatch,
            nftCollection: _nftCollection,
            isActive: true,
            isPool: _isPool
        });
        
        emit ProjectCreated(projectId, _name, _nftCollection);
    }

    function purchasePatch(uint256 _projectId, uint256 _tokenId) external payable nonReentrant {
        Project storage project = projects[_projectId];
        require(project.isActive, "Project not active");
        require(msg.value >= project.pricePerPatch, "Insufficient payment");
        
        IERC721 nft = IERC721(project.nftCollection);
        require(nft.ownerOf(_tokenId) != address(0), "Token does not exist");
        
        // Transfer NFT to buyer
        nft.safeTransferFrom(nft.ownerOf(_tokenId), msg.sender, _tokenId);
        
        // Track user NFT
        userNFTs[msg.sender][project.nftCollection].push(_tokenId);
        
        // Initialize carbon credits for this NFT
        userCarbonCredits[msg.sender][_tokenId] = CarbonCredits({
            total: 0,
            claimed: 0,
            lastDistribution: block.timestamp
        });
        
        // Calculate fees
        uint256 platformFee = (msg.value * platformFeePercentage) / 1000;
        uint256 sellerAmount = msg.value - platformFee;
        
        // Transfer funds
        payable(owner()).transfer(platformFee);
        payable(nft.ownerOf(_tokenId)).transfer(sellerAmount);
        
        emit PatchPurchased(_projectId, msg.sender, _tokenId, msg.value);
    }

    function listPatchForSale(address _nftContract, uint256 _tokenId, uint256 _price) external {
        IERC721 nft = IERC721(_nftContract);
        require(nft.ownerOf(_tokenId) == msg.sender, "Not the owner");
        require(_price > 0, "Price must be greater than 0");
        
        uint256 listingId = listingCounter++;
        listings[listingId] = Listing({
            seller: msg.sender,
            nftContract: _nftContract,
            tokenId: _tokenId,
            price: _price,
            isActive: true
        });
        
        emit PatchListed(listingId, msg.sender, _tokenId, _price);
    }

    function purchaseListing(uint256 _listingId) external payable nonReentrant {
        Listing storage listing = listings[_listingId];
        require(listing.isActive, "Listing not active");
        require(msg.value >= listing.price, "Insufficient payment");
        
        IERC721 nft = IERC721(listing.nftContract);
        require(nft.ownerOf(listing.tokenId) == listing.seller, "Seller no longer owns NFT");
        
        // Transfer NFT
        nft.safeTransferFrom(listing.seller, msg.sender, listing.tokenId);
        
        // Update tracking
        _removeFromUserNFTs(listing.seller, listing.nftContract, listing.tokenId);
        userNFTs[msg.sender][listing.nftContract].push(listing.tokenId);
        
        // Transfer carbon credits history
        userCarbonCredits[msg.sender][listing.tokenId] = userCarbonCredits[listing.seller][listing.tokenId];
        delete userCarbonCredits[listing.seller][listing.tokenId];
        
        // Calculate fees
        uint256 platformFee = (msg.value * platformFeePercentage) / 1000;
        uint256 sellerAmount = msg.value - platformFee;
        
        // Transfer funds
        payable(owner()).transfer(platformFee);
        payable(listing.seller).transfer(sellerAmount);
        
        // Mark listing as inactive
        listing.isActive = false;
        
        emit PatchSold(_listingId, listing.seller, msg.sender, msg.value);
    }

    function distributeCarbonCredits(uint256 _projectId, uint256 _amount) external onlyOwner {
        Project storage project = projects[_projectId];
        require(project.isActive, "Project not active");
        
        IERC721 nft = IERC721(project.nftCollection);
        
        for (uint256 i = 0; i < project.totalPatches; i++) {
            address owner = nft.ownerOf(i);
            if (owner != address(0)) {
                userCarbonCredits[owner][i].total += _amount;
                userTotalCarbonCredits[owner] += _amount;
            }
        }
        
        emit CarbonCreditsDistributed(_projectId, _amount);
    }

    function claimCarbonCredits(uint256 _tokenId) external {
        CarbonCredits storage credits = userCarbonCredits[msg.sender][_tokenId];
        uint256 claimable = credits.total - credits.claimed;
        require(claimable > 0, "No credits to claim");
        
        credits.claimed = credits.total;
        
        // Here you would typically transfer carbon credit tokens
        // For now, we just track the claim
        
        emit CarbonCreditsClaimed(msg.sender, claimable);
    }

    function getProjectDetails(uint256 _projectId) external view returns (Project memory) {
        return projects[_projectId];
    }

    function getUserNFTs(address _user, address _nftContract) external view returns (uint256[] memory) {
        return userNFTs[_user][_nftContract];
    }

    function getUserCarbonCredits(address _user, uint256 _tokenId) external view returns (CarbonCredits memory) {
        return userCarbonCredits[_user][_tokenId];
    }

    function getAllProjects() external view returns (Project[] memory) {
        Project[] memory allProjects = new Project[](projectCounter);
        for (uint256 i = 0; i < projectCounter; i++) {
            allProjects[i] = projects[i];
        }
        return allProjects;
    }

    function getActiveListings() external view returns (Listing[] memory) {
        uint256 activeCount = 0;
        for (uint256 i = 0; i < listingCounter; i++) {
            if (listings[i].isActive) {
                activeCount++;
            }
        }
        
        Listing[] memory activeListings = new Listing[](activeCount);
        uint256 index = 0;
        for (uint256 i = 0; i < listingCounter; i++) {
            if (listings[i].isActive) {
                activeListings[index++] = listings[i];
            }
        }
        
        return activeListings;
    }

    function _removeFromUserNFTs(address _user, address _nftContract, uint256 _tokenId) private {
        uint256[] storage nfts = userNFTs[_user][_nftContract];
        for (uint256 i = 0; i < nfts.length; i++) {
            if (nfts[i] == _tokenId) {
                nfts[i] = nfts[nfts.length - 1];
                nfts.pop();
                break;
            }
        }
    }

    function setPlatformFee(uint256 _feePercentage) external onlyOwner {
        require(_feePercentage <= 100, "Fee too high"); // Max 10%
        platformFeePercentage = _feePercentage;
    }

    function toggleProjectStatus(uint256 _projectId) external onlyOwner {
        projects[_projectId].isActive = !projects[_projectId].isActive;
    }
}