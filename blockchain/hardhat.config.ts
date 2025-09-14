import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const AMOY_RPC_URL = process.env.AMOY_RPC_URL || "";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const ETHERSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY || process.env.ETHERSCAN_API_KEY || "";

const config: HardhatUserConfig = {
	solidity: {
		version: "0.8.24",
		settings: { optimizer: { enabled: true, runs: 200 } }
	},
	networks: {
		// Polygon Amoy testnet (chainId 80002)
		amoy: {
			url: AMOY_RPC_URL,
			accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
			chainId: 80002
		}
	},
	etherscan: {
		apiKey: ETHERSCAN_API_KEY
	}
};

export default config;


