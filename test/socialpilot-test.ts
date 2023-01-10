const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SocialPilot", function () {
  it("the hash of post created in contract is equal to the one we sent to contract", async function () {
    const ourContract = await ethers.getContractFactory("SocialPilot");
    const contract = await ourContract.deploy();
    await contract.deployed();

    const note = 'This is a note', imageHash = 'QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco'
    const newPost = await contract.newPost(note, imageHash)
    await newPost.wait();
    let posts = await contract.getAllPosts()
    console.log(posts[0].imageHash)

    expect(posts[0].imageHash).to.equal(imageHash);
  });
});