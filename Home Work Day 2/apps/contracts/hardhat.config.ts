import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import * as dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.27",
  networks: {
    fuji: {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY as any] : [],
      // Kita paksa kasih type http karena Hardhat 3 minta ini
      type: "http", 
    } as any, // 'as any' ini kunci biar gak error di baris fuji: {
  },
};

export default config;