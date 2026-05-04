import { NextResponse } from 'next/server';
import Joi from 'joi';
import nodemailer from 'nodemailer';
import dbModule from '../../../lib/server/db.cjs';
import authModule from '../../../lib/server/auth.cjs';
import requestModule from '../../../lib/server/request.cjs';
import rateLimitModule from '../../../lib/server/contact-rate-limit.cjs';

const { query } = dbModule;
const { isAdminSecretAuthorized } = authModule;
const { getClientIp } = requestModule;
const { checkContactRateLimit } = rateLimitModule;

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const schema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().max(20).allow('').optional(),
  company: Joi.string().max(100).allow('').optional(),
  subject: Joi.string().max(200).required(),
  message: Joi.string().min(10).max(2000).required(),
  interest: Joi.string().valid('technology', 'ventures', 'research', 'collaboration', 'other').optional(),
  website: Joi.string().allow('').optional(),
});

function mailer() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
}

async function notify(data) {
  if (!process.env.SMTP_USER) return;

  const transport = mailer();

  await transport.sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    replyTo: data.email,
    subject: `[ABN Portfolio] ${data.subject} - ${data.name}`,
    html: `<div style="font-family:system-ui;max-width:560px;padding:32px;background:#0d0d0f;color:#fff;border-radius:16px">
      <h2 style="color:#2997ff;margin:0 0 20px">New Contact - Technologist Portfolio</h2>
      <p><b style="color:#2997ff">Name:</b> ${data.name}</p>
      <p><b style="color:#2997ff">Email:</b> <a href="mailto:${data.email}" style="color:#fff">${data.email}</a></p>
      ${data.phone ? `<p><b style="color:#2997ff">Phone:</b> ${data.phone}</p>` : ''}
      ${data.company ? `<p><b style="color:#2997ff">Company:</b> ${data.company}</p>` : ''}
      ${data.interest ? `<p><b style="color:#2997ff">Interest:</b> ${data.interest}</p>` : ''}
      <p><b style="color:#2997ff">Subject:</b> ${data.subject}</p>
      <p><b style="color:#2997ff">Message:</b></p>
      <p style="color:rgba(255,255,255,.7);white-space:pre-wrap">${data.message}</p>
    </div>`,
  });

  const firstName = data.name.split(' ')[0];

  await transport.sendMail({
    from: process.env.EMAIL_FROM,
    to: data.email,
    subject: 'Message received - Ali Bin Nadeem',
    html: `<div style="font-family:system-ui;max-width:560px;padding:32px;background:#fff;border-radius:16px">
      <h2 style="margin:0 0 16px">Ali Bin Nadeem</h2>
      <p>Hi ${firstName},</p>
      <p>Thanks for reaching out. I've received your message and will get back to you within <strong>24-48 hours</strong>.</p>
    </div>`,
  });
}

export async function POST(request) {
  const ip = getClientIp(request) || 'unknown';
  const limitState = checkContactRateLimit(ip);

  if (!limitState.allowed) {
    return NextResponse.json(
      { error: 'Too many contact requests. Please try again later.' },
      {
        status: 429,
        headers: { 'Retry-After': String(limitState.retryAfterSeconds || 3600) },
      },
    );
  }

  const body = await request.json().catch(() => ({}));
  const { error, value } = schema.validate(body, { abortEarly: false });

  if (error) {
    return NextResponse.json(
      { error: 'Validation failed', details: error.details.map((detail) => detail.message) },
      { status: 400 },
    );
  }

  if (value.website) {
    return NextResponse.json({ success: true });
  }

  await Promise.allSettled([
    notify(value),
    query(
      `INSERT INTO contacts (name, email, phone, company, subject, message, interest, source, ip_address, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, 'technologist', $8, NOW())`,
      [
        value.name,
        value.email,
        value.phone || null,
        value.company || null,
        value.subject,
        value.message,
        value.interest || null,
        ip,
      ],
    ).catch((dbError) => console.error('[DB]', dbError.message)),
  ]);

  return NextResponse.json({ success: true, message: "Message received! I'll respond within 24-48 hours." });
}

export async function GET(request) {
  if (!isAdminSecretAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { rows } = await query('SELECT * FROM contacts ORDER BY created_at DESC LIMIT 100');
    return NextResponse.json({ data: rows, count: rows.length });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
