'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function QrCodeListPage() {
  const searchParams = useSearchParams();
  const [customer, setCustomer] = useState<any>(null);

  // Read customer info from query parameter first
  useEffect(() => {
    const customerParam = searchParams.get('customer');
    if (customerParam) {
      try {
        setCustomer(JSON.parse(decodeURIComponent(customerParam)));
      } catch (e) {
        console.error('Failed to parse customer info', e);
      }
    }
  }, [searchParams]);

  // Listen for postMessage from SCA if loaded in iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'CUSTOMER_INFO') {
        setCustomer(event.data.payload);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>QR Code List</h1>

      {customer ? (
        <div>
          <h3>Customer Info Received:</h3>
          <pre>{JSON.stringify(customer, null, 2)}</pre>
        </div>
      ) : (
        <div style={{ color: 'red' }}>No customer data received yet.</div>
      )}

      <ul>
        <li>1st QR Code</li>
        <li>2nd QR Code</li>
        <li>3rd QR Code</li>
      </ul>
    </div>
  );
}
