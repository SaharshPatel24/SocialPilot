import fs from 'fs';
import "@nomiclabs/hardhat-ethers";
import { artifacts, ethers } from 'hardhat';

const main = async () => {
    const [deployer, user] = await ethers.getSigners();

    const SocialPilot = await ethers.getContractFactory("Socialpilot");

    const socialpilot = await SocialPilot.deploy();

    const contractsDir = __dirname + "/../contractedData";
    if (!fs.existsSync(contractsDir)) {
        fs.mkdirSync(contractsDir);
    }

    fs.writeFileSync(
        contractsDir + `/socialpilot-address.json`,
        JSON.stringify({ address: socialpilot.address }, undefined, 2)
    )

    const contractArtifact = artifacts.readArtifactSync("Socialpilot")

    fs.writeFileSync(
        contractsDir + `/socialpilot.json`,
        JSON.stringify(contractArtifact, null, 2)
    );

    console.log("Socialpilot deployed to: ", socialpilot.address)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
