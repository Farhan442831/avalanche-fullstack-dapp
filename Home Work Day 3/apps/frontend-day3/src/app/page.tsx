'use client';

import { useState } from 'react';
import { useAccount, useConnect, useDisconnect, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { injected } from 'wagmi/connectors';


const CONTRACT_ADDRESS = '0x4dfefb1848c8000eba67c33552c2a5fdb2e6ccca'; 

const SIMPLE_STORAGE_ABI = [
  { inputs: [], name: 'getValue', outputs: [{ type: 'uint256' }], stateMutability: 'view', type: 'function' },
  { inputs: [{ name: '_value', type: 'uint256' }], name: 'setValue', outputs: [], stateMutability: 'nonpayable', type: 'function' },
] as const;

export default function Home() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const [inputValue, setInputValue] = useState(''); 

  // READ FUNCTION
  const { data: value, refetch, isLoading: isReading } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: SIMPLE_STORAGE_ABI,
    functionName: 'getValue',
  });

  // WRITE FUNCTION
  const { data: hash, writeContract, isPending: isWriting } = useWriteContract();

  // WAIT FOR TRANSACTION
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash });

  const handleSet = () => {
    if (!inputValue) return;
    writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: SIMPLE_STORAGE_ABI,
      functionName: 'setValue',
      args: [BigInt(inputValue)],
    });
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-6 font-sans">
      <div className="bg-[#141414] border border-white/10 p-8 rounded-[2rem] w-full max-w-md shadow-2xl transition-all hover:border-white/20">
        
        {/* HEADER CUSTOM */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-black tracking-tighter italic">DAY 3 AVALANCHE</h1>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className={`h-1.5 w-1.5 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-zinc-600'}`}></span>
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                {isConnected ? 'Fuji Network Active' : 'Offline'}
              </p>
            </div>
          </div>
          <div className="h-10 w-10 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center">
            <img src="https://cryptologos.cc/logos/avalanche-avax-logo.png" className="w-6 h-6" alt="AVAX" />
          </div>
        </div>

        {/* CONNECT WALLET SECTION */}
        {!isConnected ? (
          <button 
            onClick={() => connect({ connector: injected() })} 
            className="w-full bg-white text-black font-bold py-4 rounded-2xl hover:bg-zinc-200 transition-transform active:scale-95 shadow-lg shadow-white/5"
          >
            Connect Wallet
          </button>
        ) : (
          <div className="bg-black/40 border border-white/5 p-4 rounded-2xl mb-6">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <p className="text-[10px] text-zinc-500 font-bold uppercase">Active Wallet</p>
                <span className="text-[10px] bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full border border-green-500/20">Connected</span>
              </div>
              {/* Alamat disingkat biar gak nabrak frame */}
              <p className="font-mono text-sm text-zinc-300">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </p>
              <button 
                onClick={() => disconnect()} 
                className="mt-2 w-full py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 text-[10px] font-bold uppercase tracking-wider rounded-lg border border-red-500/20 transition-all"
              >
                Disconnect Wallet
              </button>
            </div>
          </div>
        )}

        {/* READ SECTION */}
        <div className="py-8 border-y border-white/5 flex flex-col items-center">
          <p className="text-zinc-500 text-xs font-medium mb-1">Current Stored Value</p>
          <div className="relative">
            <p className="text-7xl font-black tracking-tighter">
              {isReading ? '...' : value?.toString()}
            </p>
          </div>
          <button 
            onClick={() => refetch()} 
            className="mt-4 text-[10px] font-bold text-zinc-600 hover:text-zinc-300 transition-colors flex items-center gap-1 uppercase"
          >
            <span></span> Sync Data
          </button>
        </div>

        {/* WRITE SECTION */}
        <div className="pt-6 space-y-4">
          <div className="relative">
            <input 
              type="number" 
              value={inputValue} 
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="00"
              className="w-full bg-black/50 border border-white/10 p-5 rounded-2xl text-center text-2xl font-bold focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-zinc-800"
            />
          </div>
          <button 
            disabled={isWriting || isConfirming || !isConnected || !inputValue}
            onClick={handleSet}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-800 text-white py-4 rounded-2xl font-black uppercase tracking-tighter shadow-xl shadow-blue-900/20 transition-all disabled:text-zinc-600 active:scale-95"
          >
            {isWriting || isConfirming ? 'Transaction Pending...' : 'Update Blockchain'}
          </button>
        </div>

        {/* EXPLORER LINK */}
        {hash && (
          <div className="mt-4 text-center">
            <a 
              href={`https://testnet.snowtrace.io/tx/${hash}`} 
              target="_blank" 
              className="text-[10px] text-zinc-600 hover:text-blue-400 font-bold transition-colors"
            >
              VIEW TRANSACTION ON SNOWTRACE ↗
            </a>
          </div>
        )}
      </div>
      
      <p className="mt-8 text-[10px] font-bold text-zinc-700 uppercase tracking-[0.4em]">Avalanche Fuji Testnet</p>
    </main>
  );
}