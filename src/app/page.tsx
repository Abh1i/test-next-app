'use client';
import { useEffect, useState } from "react";

export default function MyApp({ Component, pageProps }: any) {
  const [customer, setCustomer] = useState<{id:number,name:string,email:string} | null>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // For now, accept messages from anywhere
      if (event.data.type === "CUSTOMER_INFO") {
        setCustomer(event.data.payload);
      }
    };

    window.addEventListener("message", handleMessage);

    // Cleanup
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <>
      <div style={{ padding: '10px', border: '1px solid gray', marginBottom: '20px' }}>
        <h3>Static Customer Info:</h3>
        {customer ? (
          <pre>{JSON.stringify(customer, null, 2)}</pre>
        ) : (
          <p>No customer info yet</p>
        )}
      </div>
      <Component {...pageProps} customer={customer} />
    </>
  );
}
