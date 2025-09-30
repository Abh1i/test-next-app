// src/app/api/suitelet/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://3331694-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=2601&deploy=1&compid=3331694_SB1&ns-at=AAEJ7tMQrXhftgNOHU4mLMvHEPEWJTUukBFkhIfO80-dVT0C6MY', {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        Accept: '*/*',
        Connection: 'keep-alive',
        'Accept-Encoding': 'gzip, deflate, br',
      },
    });

    const text = await res.text();
    try {
      return NextResponse.json(JSON.parse(text));
    } catch {
      return NextResponse.json({ error: 'Response is not JSON', text });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
