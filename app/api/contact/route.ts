import { NextResponse } from 'next/server';
import { addContact } from '../../../lib/db';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, subject, message } = data;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Submit to Web3Forms
    const WEB3FORMS_KEY = process.env.WEB3FORMS_ACCESS_KEY || 'ea1e186e-b3d9-4d6d-9721-6b45d2e09ff7';
    
    const web3Response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        name,
        email,
        subject: subject || 'New Contact from Synapse Lab',
        message,
      }),
    });

    const web3Result = await web3Response.json();

    if (!web3Response.ok || !web3Result.success) {
      console.error('Web3Forms Error:', web3Result);
      // We continue to save in SQLite even if email fails
    }

    // 2. Log in local SQLite database
    try {
      await addContact(name, email, `${subject ? '[' + subject + '] ' : ''}${message}`);
    } catch (dbError) {
      console.error('SQLite Error:', dbError);
      return NextResponse.json({ error: 'Failed to save to database' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Message sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
