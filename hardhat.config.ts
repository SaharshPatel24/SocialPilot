import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from 'dotenv';

dotenv.config()

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    sepolia: {
      url: process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL,
      accounts: [process.env.NEXT_PUBLIC_PRIVATE_SEPOLIA_ACCOUNT_KEY!],
    },
  },
};

export default config;
