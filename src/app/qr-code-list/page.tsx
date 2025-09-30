'use client';
import { useEffect, useState } from 'react';

export default function QrCodeListPage() {
  const [customer, setCustomer] = useState<any>(null);

  useEffect(() => {
    // Ask parent for data immediately
    window.parent.postMessage({ type: 'REQUEST_CUSTOMER_INFO' }, '*');

    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'CUSTOMER_INFO') {
        setCustomer(event.data.payload); 
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div>
      <h1>QR Code List</h1>
      {customer && (
        <div>
          <h3>Customer Info:</h3>
          <pre>{JSON.stringify(customer, null, 2)}</pre>
        </div>
      )}
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </ul>
    </div>
  );
}
