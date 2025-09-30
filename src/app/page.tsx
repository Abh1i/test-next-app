'use client';

import { useState, useEffect, FormEvent } from 'react';
import SuiteLetCaller from './components/SuiteLetCaller';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState<any>(null);
  
  // State to hold SCA data
  const [scaData, setScaData] = useState<any>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Optionally, validate event.origin
      if (event.data?.type === 'CUSTOMER_INFO') {
        setScaData(event.data.payload);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setResponse(null);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const text = await res.text();
      try {
        const data = JSON.parse(text);
        setResponse(data);
      } catch {
        setResponse({ error: 'Response is not JSON', text });
      }
    } catch (err: any) {
      setResponse({ error: err.message });
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Login Form</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email: </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>

      {response && (
        <div style={{ marginTop: '20px' }}>
          <h3>Service Response:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}

      {/* Display SCA data */}
      <div style={{ marginTop: '20px' }}>
        <h2>Customer Info from SCA:</h2>
        {scaData ? (
          <pre>{JSON.stringify(scaData, null, 2)}</pre>
        ) : (
          <p>No customer data received yet</p>
        )}
      </div>

      <div style={{ marginTop: '40px' }}>
        <h1>Test Suitelet Call</h1>
        <SuiteLetCaller />
      </div>
    </div>
  );
}
