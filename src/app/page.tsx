'use client';
import { useState, useEffect, FormEvent } from 'react';

export default function HomePage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginResponse, setLoginResponse] = useState<any>(null);
  const [scaData, setScaData] = useState<any>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'CUSTOMER_INFO') {
        setScaData(event.data.payload);
      }
    };

    window.addEventListener('message', handleMessage);

    // Ask parent SCA page for customer info
    window.parent.postMessage({ type: 'GET_CUSTOMER_INFO' }, '*');

    return () => window.removeEventListener('message', handleMessage);
  }, []);

  useEffect(() => {
    if (scaData) {
      const url = new URL('/qr-code-list', window.location.origin);
      url.searchParams.set('customer', encodeURIComponent(JSON.stringify(scaData)));
      window.open(url.toString(), '_blank');
    }
  }, [scaData]);

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
      let data;
      try {
        data = JSON.parse(text);
        setLoginResponse(data);

        if (!data.error) {
          const payload = { id: data.id, name: data.name, email: data.email, staticValue: 'THIS_IS_STATIC_VALUE' };
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
      {!scaData && (
        <>
          <h1>Login Form</h1>
          <form onSubmit={handleLogin}>
            <div>
              <label>Email: </label>
              <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <label>Password: </label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit">Login</button>
          </form>

          {loginResponse && (
            <div style={{ marginTop: '20px' }}>
              <h3>Service Response:</h3>
              <pre>{JSON.stringify(loginResponse, null, 2)}</pre>
            </div>
          )}
        </>
      )}
    </div>
  );
}
