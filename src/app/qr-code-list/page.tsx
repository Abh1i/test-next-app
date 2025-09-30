'use client';

import { useEffect, useState } from 'react';

export default function QrCodeListPage() {
  const [customer, setCustomer] = useState<any>(null);

  useEffect(() => {
    // Parse query params manually
    const searchParams = new URLSearchParams(window.location.search);
    const customerParam = searchParams.get('customer');
    if (customerParam) {
      try {
        setCustomer(JSON.parse(decodeURIComponent(customerParam)));
      } catch (err) {
        console.error('Failed to parse customer info', err);
      }
    }
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>QR Code List</h1>

      {customer && (
        <div style={{ marginBottom: '20px' }}>
          <h3>Customer Info Received:</h3>
          <pre>{JSON.stringify(customer, null, 2)}</pre>
        </div>
      )}

      <ul>
        <li>1st QR Code</li>
        <li>2nd QR Code</li>
        <li>3rd QR Code</li>
      </ul>
    </div>
  );
}
