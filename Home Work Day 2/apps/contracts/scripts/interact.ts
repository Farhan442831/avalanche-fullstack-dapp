import { createWalletClient, createPublicClient, http, parseAbi } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { avalancheFuji } from "viem/chains";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
  const CONTRACT_ADDRESS = "0x4dfefb1848c8000eba67c33552c2a5fdb2e6ccca";
  const privateKey = process.env.PRIVATE_KEY as `0x${string}`;
  const account = privateKeyToAccount(privateKey);

  // 1. Setup Client buat baca (Public) dan tulis (Wallet)
  const publicClient = createPublicClient({
    chain: avalancheFuji,
    transport: http("https://api.avax-test.network/ext/bc/C/rpc"),
  });

  const walletClient = createWalletClient({
    account,
    chain: avalancheFuji,
    transport: http("https://api.avax-test.network/ext/bc/C/rpc"),
  });

  // 2. Definisi ABI minimal (cuma fungsi yang mau kita panggil)
  const abi = parseAbi([
    "function setValue(uint256 _value) public",
    "function getValue() public view returns (uint256)",
  ]);

  console.log("🔍 Mengecek nilai awal...");
  const initialValue = await publicClient.readContract({
    address: CONTRACT_ADDRESS,
    abi,
    functionName: "getValue",
  });
  console.log(`📊 Nilai saat ini di Blockchain: ${initialValue}`);

  console.log("✍️ Mencoba mengubah nilai ke: 88...");
  const hash = await walletClient.writeContract({
    address: CONTRACT_ADDRESS,
    abi,
    functionName: "setValue",
    args: [88n], // Pakai 'n' karena Solidity uint256 itu BigInt
  });

  console.log(`⏳ Transaksi dikirim! Hash: ${hash}`);
  console.log("Waiting for confirmation...");
  await publicClient.waitForTransactionReceipt({ hash });

  const newValue = await publicClient.readContract({
    address: CONTRACT_ADDRESS,
    abi,
    functionName: "getValue",
  });
  console.log(`✅ Sukses! Nilai baru di Blockchain: ${newValue}`);
}

main().catch(console.error);