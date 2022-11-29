pragma solidity ^0.8.17;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Socialpilot is ERC721URIStorage {
    uint256 public tokenCount;
    uint256 public postCount;
    mapping(uint256 => Post) public posts;

    struct Post {
        uint256 id;
        string hash;
        uint256 tipAmount;
        address payable author;
    }

    event PostCreated(
        uint256 id,
        string hash,
        uint256 tipAmount,
        address payable author
    );

    event PostTipped(
        uint256 id,
        string hash,
        uint256 tipAmount,
        address payable author
    );

    constructor() ERC721("Socialpilot", "DAPP") {}

    function uploadPost(string memory _postHash) external {
        require(bytes(_postHash).length > 0, "Cannot pass an empty hash");
        postCount++;
        posts[postCount] = Post(postCount, _postHash, 0, payable(msg.sender));
    }

    function getAllPosts() external view returns (Post[] memory _posts) {
        _posts = new Post[](postCount);
        for (uint256 i = 0; i < _posts.length; i++) {
            _posts[i] = posts[i + 1];
        }
    }
}
