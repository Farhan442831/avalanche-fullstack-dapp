'use client';

import { useState, useEffect } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { getBlockchainValue } from '../services/blockchain.service';

export default function Home() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  
  const [value, setValue] = useState<string | null>(null);
  const [isReading, setIsReading] = useState(false);

  // Fungsi untuk ambil data dari Backend
  const fetchData = async () => {
    setIsReading(true);
    try {
      const data = await getBlockchainValue();
      // Handle jika data berbentuk object atau string langsung
      const displayValue = data?.value !== undefined ? data.value : data;
      setValue(displayValue?.toString() || "0"); 
    } catch (error) {
      console.error("Gagal ambil data backend:", error);
      setValue("Error");
    } finally {
      setIsReading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: 'sans-serif' }}>
      
      {/* Container Utama (Box Hitam) */}
      <div style={{ backgroundColor: '#141414', border: '1px solid rgba(255,255,255,0.1)', padding: '32px', borderRadius: '24px', width: '100%', maxWidth: '380px', textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.6)' }}>
        
        {/* HEADER: Judul & Logo Avalanche */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <div style={{ textAlign: 'left' }}>
            <h1 style={{ margin: 0, fontSize: '18px', fontWeight: '900', fontStyle: 'italic', color: '#ef4444', letterSpacing: '-0.5px' }}>DAY 5 FINAL</h1>
            <p style={{ margin: 0, fontSize: '9px', color: '#71717a', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase' }}>Full Stack Integration</p>
          </div>
          <img 
            src="https://cryptologos.cc/logos/avalanche-avax-logo.png" 
            style={{ width: '32px', height: '32px', objectFit: 'contain' }} 
            alt="AVAX logo" 
          />
        </div>

        {/* VALUE SECTION: Font angka dikecilkan biar gak nabrak */}
        <div style={{ padding: '30px 0', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <p style={{ color: '#71717a', fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '1px' }}>Current Storage Value</p>
          
          <h2 style={{ fontSize: '56px', fontWeight: '900', margin: 0, letterSpacing: '-2px', color: '#ffffff', lineHeight: '1' }}>
            {isReading ? '...' : value}
          </h2>

          {/* Alert jika backend mati/CORS error */}
          {value === "Error" && (
            <p style={{ fontSize: '11px', color: '#ef4444', marginTop: '10px', fontWeight: '600' }}>
              Backend offline / CORS error
            </p>
          )}

          <button 
            onClick={fetchData} 
            style={{ marginTop: '24px', backgroundColor: 'rgba(59,130,246,0.1)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.2)', padding: '10px 24px', borderRadius: '12px', fontSize: '10px', fontWeight: 'bold', cursor: 'pointer', transition: '0.2s' }}
          >
            REFRESH API DATA
          </button>
        </div>

        {/* WALLET SECTION */}
        <div style={{ marginTop: '32px' }}>
          {!isConnected ? (
            <button 
              onClick={() => connect({ connector: injected() })} 
              style={{ width: '100%', backgroundColor: 'white', color: 'black', fontWeight: 'bold', padding: '14px', borderRadius: '14px', border: 'none', cursor: 'pointer', fontSize: '13px' }}
            >
              Connect Wallet
            </button>
          ) : (
            <div style={{ backgroundColor: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '9px', color: '#71717a', fontWeight: 'bold', textTransform: 'uppercase' }}>Account</span>
                <span style={{ fontSize: '9px', color: '#22c55e', fontWeight: 'bold', textTransform: 'uppercase' }}>Active</span>
              </div>
              <p style={{ fontFamily: 'monospace', fontSize: '12px', color: '#d4d4d8', margin: '0 0 12px 0' }}>
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </p>
              <button 
                onClick={() => disconnect()} 
                style={{ width: '100%', backgroundColor: 'transparent', color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)', padding: '8px', borderRadius: '8px', fontSize: '10px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                DISCONNECT
              </button>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER: Identitas lo */}
      <div style={{ marginTop: '32px', textAlign: 'center', opacity: 0.4 }}>
        <p style={{ fontSize: '9px', fontWeight: '900', letterSpacing: '3px', textTransform: 'uppercase', margin: 0 }}>Muchammad Farhan Ramadhan</p>
        <p style={{ fontSize: '8px', marginTop: '4px' }}>NIM: 231011402182 | Avalanche Fuji</p>
      </div>
    </main>
  );
}