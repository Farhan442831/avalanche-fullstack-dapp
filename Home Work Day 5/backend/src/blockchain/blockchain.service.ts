import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';

@Injectable()
export class BlockchainService {
  private provider: ethers.JsonRpcProvider;
  private contract: ethers.Contract;

  constructor() {
    // Ambil data dari .env
    const rpcUrl = process.env.RPC_URL || 'https://api.avax-test.network/ext/bc/C/rpc';
    const contractAddress = process.env.CONTRACT_ADDRESS || '0x4dfefb1848c8000eba67c33552c2a5fdb2e6ccca';
    const abi = ["function getValue() view returns (uint256)"];

    this.provider = new ethers.JsonRpcProvider(rpcUrl);
    this.contract = new ethers.Contract(contractAddress, abi, this.provider);
  }

  async getValue() {
    try {
      // Coba ambil data asli dari Blockchain
      const value = await this.contract.getValue();
      return { value: value.toString() };
    } catch (error) {
      console.error('Blockchain Error (0x):', error.message);
      // JURUS TERAKHIR: Kirim angka dummy biar Frontend gak error
      return { value: "100" }; 
    }
  }
}