'use client';
import { useEffect, useState } from 'react';

export default function Page() {
  const [customer, setCustomer] = useState<{ id: number; name: string; email: string } | null>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Accept messages from any origin for now
      if (event.data?.type === 'CUSTOMER_INFO') {
        setCustomer(event.data.payload);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Next.js iframe app</h1>
      <h3>Customer Info Received:</h3>
      {customer ? (
        <pre>{JSON.stringify(customer, null, 2)}</pre>
      ) : (
        <p>No customer info received yet</p>
      )}
    </div>
  );
}
