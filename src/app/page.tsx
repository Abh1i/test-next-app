'use client';

import { useState, useEffect, FormEvent } from 'react';

export default function HomePage() {
  // Login form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginResponse, setLoginResponse] = useState<any>(null);

  // SCA iframe states
  const [scaData, setScaData] = useState<any>(null);

  // Handle SCA postMessage
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'CUSTOMER_INFO') {
        setScaData(event.data.payload);
      }
    };

    window.addEventListener('message', handleMessage);

    // Ask parent page for SCA data
    window.parent.postMessage({ type: 'GET_CUSTOMER_INFO' }, '*');

    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Open QR Code List page automatically if SCA data arrives
  useEffect(() => {
    if (scaData) {
      const url = new URL('/qr-code-list', window.location.origin);
      url.searchParams.set('customer', encodeURIComponent(JSON.stringify(scaData)));
      window.open(url.toString(), '_blank');
    }
  }, [scaData]);

  // Handle login form submit
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoginResponse(null);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const text = await res.text();
      try {
        const data = JSON.parse(text);
        setLoginResponse(data);

        // If login is successful, open QR Code List page in new tab
        if (!data.error) {
          const payload = {
            id: data.id || 'unknown',
            name: data.name || '',
            email: data.email || '',
          };
          const url = new URL('/qr-code-list', window.location.origin);
          url.searchParams.set('customer', encodeURIComponent(JSON.stringify(payload)));
          window.open(url.toString(), '_blank');
        }
      } catch {
        setLoginResponse({ error: 'Response is not JSON', text });
      }
    } catch (err: any) {
      setLoginResponse({ error: err.message });
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* Only show login form if no SCA data */}
      {!scaData && (
        <>
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

          {loginResponse && (
            <div style={{ marginTop: '20px' }}>
              <h3>Service Response:</h3>
              <p>{JSON.stringify(loginResponse, null, 2)}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
