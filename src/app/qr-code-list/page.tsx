'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function QrCodeListContent() {
  const searchParams = useSearchParams();
  const [customer, setCustomer] = useState<any>(null);

  useEffect(() => {
    const customerParam = searchParams.get('customer');
    if (customerParam) {
      try {
        setCustomer(JSON.parse(decodeURIComponent(customerParam)));
      } catch (err) {
        console.error('Invalid customer data', err);
      }
    }
  }, [searchParams]);

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

export default function QrCodeListPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <QrCodeListContent />
    </Suspense>
  );
}
