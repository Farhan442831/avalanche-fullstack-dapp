const connectBtn = document.getElementById("connectBtn");
const disconnectBtn = document.getElementById("disconnectBtn");
const statusEl = document.getElementById("status");
const addressEl = document.getElementById("address");
const networkEl = document.getElementById("network");
const balanceEl = document.getElementById("balance");
const dot = document.getElementById("dot");

const AVALANCHE_FUJI_CHAIN_ID = "0xa869";

function formatAvaxBalance(balanceWei) {
  const balance = parseInt(balanceWei, 16);
  return (balance / 1e18).toFixed(4);
}

function disconnectWallet() {
  statusEl.textContent = "DISCONNECTED";
  dot.style.background = "#64748b";
  dot.style.boxShadow = "none";

  addressEl.textContent = "0x000...000";
  networkEl.textContent = "-";
  balanceEl.textContent = "0.00";

  connectBtn.classList.remove("hidden");
  disconnectBtn.classList.add("hidden");
}

async function connectWallet() {
  if (typeof window.ethereum === "undefined") {
    alert("Core Wallet not found!");
    return;
  }

  try {
    statusEl.textContent = "AUTHORIZING...";
    
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    const address = accounts[0];
    addressEl.textContent = address;

    const chainId = await window.ethereum.request({ method: "eth_chainId" });

    if (chainId === AVALANCHE_FUJI_CHAIN_ID) {
      networkEl.textContent = "FUJI TESTNET";
      statusEl.textContent = "CONNECTED";
      dot.style.background = "#10b981";
      dot.style.boxShadow = "0 0 15px #10b981";

      const balanceWei = await window.ethereum.request({
        method: "eth_getBalance",
        params: [address, "latest"],
      });

      balanceEl.textContent = formatAvaxBalance(balanceWei);
      connectBtn.classList.add("hidden");
      disconnectBtn.classList.remove("hidden");
    } else {
      networkEl.textContent = "WRONG NETWORK";
      statusEl.textContent = "SWITCH NETWORK";
      dot.style.background = "#f59e0b";
      dot.style.boxShadow = "0 0 15px #f59e0b";
    }
  } catch (error) {
    statusEl.textContent = "FAILED";
    dot.style.background = "#ef4444";
    dot.style.boxShadow = "0 0 15px #ef4444";
  }
}

connectBtn.addEventListener("click", connectWallet);
disconnectBtn.addEventListener("click", disconnectWallet);

disconnectWallet();