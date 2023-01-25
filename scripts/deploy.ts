const main = async () => {
    const [deployer] = await ethers.getSigners();
    const accountBalance = await deployer.getBalance();

    const contract = await ethers.getContractFactory('SocialPilot');
    const ourContract = await contract.deploy();
    await ourContract.deployed();

    console.table({
        'Contract Owner': deployer.address,
        'Account Balance': accountBalance.toString(),
        "Contract Address": ourContract.address
    });
};

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

export default {}