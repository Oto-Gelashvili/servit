import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getDictionary } from '../../../get-dictionaries';
export async function POST(req: NextRequest) {
  const { email, message, lang } = await req.json();
  const dictionary = (await getDictionary(lang)).footer;
  if (!email) {
    return NextResponse.json({ message: dictionary.logInMsg }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL,
      subject: `New Contact Form Submission from ${email}`,
      html: `
        <h3>New Message from ${email}</h3>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ message: dictionary.successMsg });
  } catch (error) {
    return NextResponse.json({ message: dictionary.failMsg }, { status: 500 });
  }
}
