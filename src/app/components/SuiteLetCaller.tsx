'use client';
import { useState } from 'react';

export default function SuiteletCaller() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const callSuitelet = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/suitelet');
const json = await res.json();
setData(json);
    } catch (err: any) {
      setData({ error: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={callSuitelet} disabled={loading}>
        {loading ? 'Loading...' : 'Get User Info'}
      </button>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
