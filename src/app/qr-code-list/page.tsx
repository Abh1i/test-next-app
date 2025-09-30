'use client';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'CUSTOMER_INFO') {
        setData(event.data.payload);
        console.log('Received data from SCA:', event.data.payload);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div>
      <h1>Next.js App</h1>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      <ul>
        <li>1st QR Code</li>
        <li>2nd QR Code</li>
        <li>3rd QR Code</li>
      </ul>
    </div>
    
  );
}
