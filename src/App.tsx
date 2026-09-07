import React, { useState, useEffect } from 'react';

// Seismic Cryptographic State Types
interface ZkTelemetry {
  proofTimeMs: number;
  constraintsCount: number;
  circuitType: 'Groth16/SeismicShieldedV1';
  verifiedOnChain: boolean;
}

interface ShieldedAgentTransaction {
  id: string;
  timestamp: string;
  txHash: string;
  senderShielded: string;
  recipientShielded: string;
  rawAmountHex: string;
  decryptedAmount: string;
  taskType: 'LLM Inference Payment' | 'Data Pipeline Escrow' | 'Compute Settlement';
  telemetry: ZkTelemetry;
}

export default function SeismicAgentMesh() {
  const [viewingKeyActive, setViewingKeyActive] = useState<boolean>(false);
  const [isGeneratingProof, setIsGeneratingProof] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<ShieldedAgentTransaction[]>([]);
  const [activeTab, setActiveTab] = useState<'console' | 'architecture'>('console');

  // Trigger Shielded Agent-to-Agent Payment
  const executeAgentTransaction = () => {
    setIsGeneratingProof(true);

    setTimeout(() => {
      const mockHash = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
      const randomSeis = (Math.random() * 0.2 + 0.05).toFixed(4);
      const tasks = ['LLM Inference Payment', 'Data Pipeline Escrow', 'Compute Settlement'] as const;

      const newTx: ShieldedAgentTransaction = {
        id: Math.random().toString(36).substring(2, 9),
        timestamp: new Date().toLocaleTimeString(),
        txHash: mockHash,
        senderShielded: 'vk_seismic_0x9a4f...[Encrypted]',
        recipientShielded: '0x3c21...8b11',
        rawAmountHex: `0x${Buffer.from(randomSeis).toString('hex').padEnd(32, 'f')}...`,
        decryptedAmount: `${randomSeis} SEIS`,
        taskType: tasks[Math.floor(Math.random() * tasks.length)],
        telemetry: {
          proofTimeMs: Math.floor(Math.random() * 180) + 310,
          constraintsCount: 14250,
          circuitType: 'Groth16/SeismicShieldedV1',
          verifiedOnChain: true,
        },
      };

      setTransactions((prev) => [newTx, ...prev]);
      setIsGeneratingProof(false);
    }, 850);
  };

  return (
    <div style={{ backgroundColor: '#090d16', color: '#adbac7', minHeight: '100vh', fontFamily: 'monospace', padding: '2rem' }}>
      {/* Top Protocol Status Bar */}
      <div style={{ borderBottom: '1px solid #22272e', paddingBottom: '1rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ color: '#539bf5', margin: 0, fontSize: '1.5rem' }}>SEISMIC // Autonomous Agent Mesh</h1>
          <p style={{ color: '#768390', margin: '0.3rem 0 0 0', fontSize: '0.85rem' }}>
            Strong Shielded State & On-Chain ZK Telemetry Protocol Integration
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {/* Viewing Key Auth State */}
          <button
            onClick={() => setViewingKeyActive(!viewingKeyActive)}
            style={{
              padding: '0.6rem 1rem',
              borderRadius: '6px',
              border: '1px solid #373e47',
              backgroundColor: viewingKeyActive ? '#2e6930' : '#9e1515',
              color: '#ffffff',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            {viewingKeyActive ? '🔓 Viewing Key: DECRYPTED' : '🔒 Viewing Key: SHIELDED (Default)'}
          </button>
        </div>
      </div>

      {/* Control Panel */}
      <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
        <button
          onClick={executeAgentTransaction}
          disabled={isGeneratingProof}
          style={{
            padding: '0.8rem 1.5rem',
            backgroundColor: '#316dca',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 'bold',
            cursor: isGeneratingProof ? 'not-allowed' : 'pointer',
          }}
        >
          {isGeneratingProof ? '⏳ Constructing ZK Proof...' : '⚡ Simulate Autonomous Agent Task Payment'}
        </button>
      </div>

      {/* Main Dual Console Matrix */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        
        {/* Left Column: Public Shielded State */}
        <div style={{ backgroundColor: '#1c2128', border: '1px solid #373e47', borderRadius: '8px', padding: '1.2rem' }}>
          <h3 style={{ color: '#f0f6fc', marginTop: 0, fontSize: '1rem', borderBottom: '1px solid #22272e', paddingBottom: '0.5rem' }}>
            🌐 Public Chain View (Standard Observer)
          </h3>
          <p style={{ color: '#768390', fontSize: '0.8rem' }}>What external smart contracts and RPC nodes see on Seismic.</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '1rem' }}>
            {transactions.length === 0 && <span style={{ color: '#545d68' }}>Awaiting agent interaction...</span>}
            {transactions.map((tx) => (
              <div key={tx.id} style={{ backgroundColor: '#0d1117', border: '1px solid #22272e', padding: '0.8rem', borderRadius: '4px' }}>
                <div style={{ fontSize: '0.75rem', color: '#768390' }}>Tx: {tx.txHash.slice(0, 18)}...</div>
                <div style={{ color: '#c69026', margin: '0.3rem 0', fontSize: '0.85rem' }}>Amount: {tx.rawAmountHex}</div>
                <div style={{ fontSize: '0.75rem', color: '#539bf5' }}>Status: Shielded (State Mutated)</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Agent Decrypted State (Viewing Key Required) */}
        <div style={{ backgroundColor: '#1c2128', border: '1px solid #373e47', borderRadius: '8px', padding: '1.2rem' }}>
          <h3 style={{ color: '#f0f6fc', marginTop: 0, fontSize: '1rem', borderBottom: '1px solid #22272e', paddingBottom: '0.5rem' }}>
            🔑 Authorized Agent View (Viewing Key)
          </h3>
          <p style={{ color: '#768390', fontSize: '0.8rem' }}>Resolved off-chain telemetry using cryptographic viewing key.</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '1rem' }}>
            {transactions.length === 0 && <span style={{ color: '#545d68' }}>Awaiting agent interaction...</span>}
            {transactions.map((tx) => (
              <div key={tx.id} style={{ backgroundColor: '#0d1117', border: '1px solid #2e6930', padding: '0.8rem', borderRadius: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                  <span style={{ color: '#539bf5' }}>Task: {tx.taskType}</span>
                  <span style={{ color: '#57ab5a' }}>ZK: {tx.telemetry.proofTimeMs}ms</span>
                </div>
                <div style={{ color: viewingKeyActive ? '#57ab5a' : '#e5534b', margin: '0.3rem 0', fontSize: '0.9rem', fontWeight: 'bold' }}>
                  Amount: {viewingKeyActive ? tx.decryptedAmount : '🔒 REJECTED (Missing Viewing Key)'}
                </div>
                <a
                  href={`https://explorer.seismic.systems/tx/${tx.txHash}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: '#539bf5', fontSize: '0.75rem', textDecoration: 'none' }}
                >
                  Verify on Seismic Explorer ↗
                </a>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
