'use client';
import { useEffect, useState } from 'react';

export default function QrCodeListPage() {
  const [customer, setCustomer] = useState<any>(null);

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
    <div>
      <h1>QR Code List</h1>
      {customer ? (
        <div>
          <h3>Customer Info Received:</h3>
          <pre>{JSON.stringify(customer, null, 2)}</pre>
        </div>
      ) : (
        <div></div>
      )}

      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
      </ul>
    </div>
  );
}
