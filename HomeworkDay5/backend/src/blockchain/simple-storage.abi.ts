import { Abi } from 'viem';
export const SIMPLE_STORAGE_ABI: Abi = [
  {
    type: 'function',
    name: 'getValue',
    stateMutability: 'view',
    inputs: [],
    outputs: [
      {
        type: 'uint256',
      },
    ],
  },
];
