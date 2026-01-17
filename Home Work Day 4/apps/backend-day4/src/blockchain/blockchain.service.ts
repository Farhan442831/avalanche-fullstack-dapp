import { Injectable } from '@nestjs/common';
import { createPublicClient, http } from 'viem';
import { avalancheFuji } from 'viem/chains';

@Injectable()
export class BlockchainService {
  // Ganti transport ke URL resmi biar gak "Unknown Network" lagi
  private client: any = createPublicClient({
    chain: avalancheFuji,
    transport: http('https://api.avax-test.network/ext/bc/C/rpc'),
  });

  private contractAddress = '0x4dfefb1848c8000eba67c3552c2a5fdb2e6cccca' as const;

  async getLatestValue() {
    try {
      const abi = [{ "name": "getValue", "type": "function", "stateMutability": "view", "inputs": [], "outputs": [{ "type": "uint256" }] }] as const;
      
      const value = await this.client.readContract({
        address: this.contractAddress,
        abi,
        functionName: 'getValue',
      });
      
      return { value: value.toString() }; 
    } catch (error) {
      console.error("Blockchain Error:", error.shortMessage || error.message);
      return { value: "Koneksi ke Blockchain terganggu, coba refresh." };
    }
  }
}