'use client';

import { useEffect, useState } from 'react';

export default function HomePage() {
  const [internalId, setInternalId] = useState<string | null>(null);

  useEffect(() => {
    // Ask parent SCA for customer info
    window.parent.postMessage({ type: 'GET_CUSTOMER_INFO' }, '*');

    const handleMessage = (event: MessageEvent) => {
      // Optional: restrict to your SCA domain
      // if (event.origin !== 'https://your-sca-domain.com') return;

      if (event.data?.type === 'CUSTOMER_INFO') {
        setInternalId(event.data.payload.internalid || null);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Hello World Next.js App</h1>
      {internalId ? (
        <p>Logged in SCA User Internal ID: <strong>{internalId}</strong></p>
      ) : (
        <p>No SCA user data received yet.</p>
      )}
    </div>
  );
}
