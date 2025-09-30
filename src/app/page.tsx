'use client';

import { useEffect, useState } from 'react';

export default function HomePage() {
  const [customer, setCustomer] = useState<any>(null);

  useEffect(() => {
    // Ask parent for customer data
    window.parent.postMessage({ type: 'GET_CUSTOMER_INFO' }, '*');

    const handleMessage = (event: MessageEvent) => {

      if (event.data?.type === 'CUSTOMER_INFO') {
        setCustomer(event.data.payload);
        console.log('Received customer:', event.data.payload);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Hello World App</h1>

      {customer ? (
        <div>
          <h3>Customer Info:</h3>
          <pre>{JSON.stringify(customer, null, 2)}</pre>
        </div>
      ) : (
        <p>Waiting for customer info from SCA...</p>
      )}
    </div>
  );
}
