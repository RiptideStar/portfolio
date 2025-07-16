import { Resend } from 'resend';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const result = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'kyle100@wharton.upenn.edu', // <-- replace with your Resend account email if different
      subject: `${name} sent a message from Kyle's portfolio website`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });
    console.log('Resend API result:', result);
    return res.status(200).json({ success: true, result });
  } catch (err) {
    console.error('Resend API error:', err);
    return res.status(500).json({ error: 'Failed to send email', details: err.message });
  }
} 