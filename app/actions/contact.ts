"use server";

import { contactSchema, type ContactInput } from "@/lib/validations";
import { getResend } from "@/lib/resend";
import { BUSINESS } from "@/lib/business";

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | {
      status: "error";
      message: string;
      fieldErrors?: Partial<Record<keyof ContactInput, string[]>>;
    };

const recentSubmissions = new Map<string, number>();
const THROTTLE_MS = 20_000;

function renderEmailText(data: ContactInput): string {
  return [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || "—"}`,
    `Service: ${data.service}`,
    "",
    "Message:",
    data.message,
  ].join("\n");
}

function renderWhatsAppText(data: ContactInput): string {
  return [
    `*New enquiry — ${data.service}*`,
    `${data.name}`,
    data.email,
    data.phone ? data.phone : null,
    "",
    data.message,
  ]
    .filter(Boolean)
    .join("\n");
}

function whatsappReplyLink(data: ContactInput): string {
  const text = encodeURIComponent(
    `Hi, I just submitted an enquiry on your website about ${data.service.toLowerCase()} works. (${data.name})`,
  );
  return `${BUSINESS.whatsappHref}?text=${text}`;
}

function renderUserConfirmText(data: ContactInput): string {
  return [
    `Hi ${data.name.split(" ")[0]},`,
    "",
    `Thanks for reaching out to ${BUSINESS.name}. We've received your enquiry and one of our team will be in touch within one business day.`,
    "",
    "What you sent:",
    `· Service:  ${data.service}`,
    `· Phone:    ${data.phone || "—"}`,
    `· Message:`,
    data.message
      .split("\n")
      .map((l) => "  " + l)
      .join("\n"),
    "",
    "If it's urgent, the fastest reply is on WhatsApp:",
    BUSINESS.whatsappHref,
    "",
    `Or call ${BUSINESS.phone}.`,
    "",
    "— Anay Interior",
    "We design, you deserve.",
    "",
    "—",
    `${BUSINESS.legalName}`,
    `${BUSINESS.address.street}, ${BUSINESS.address.city}, U.A.E.`,
  ].join("\n");
}

function renderUserConfirmHtml(data: ContactInput): string {
  const safe = (s: string) =>
    s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  const firstName = data.name.split(" ")[0];
  const messageHtml = safe(data.message).replace(/\n/g, "<br/>");
  const waHref = whatsappReplyLink(data);

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>We received your enquiry</title></head>
<body style="margin:0;padding:24px 12px;background:#F7F5F0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#0A0A0A;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:560px;margin:0 auto;background:#FFFFFF;border:1px solid rgba(10,10,10,0.08);border-radius:14px;overflow:hidden;">
    <tr><td style="padding:32px 32px 8px;">
      <p style="margin:0;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#8A8680;">
        <span style="display:inline-block;width:32px;height:1px;background:#C8A96A;vertical-align:middle;margin-right:10px;"></span>
        Anay Interior
      </p>
    </td></tr>
    <tr><td style="padding:8px 32px 0;">
      <h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:32px;line-height:1.1;letter-spacing:-0.02em;color:#0A0A0A;font-weight:500;">
        Thanks, ${safe(firstName)}.
      </h1>
      <p style="margin:16px 0 0;font-size:16px;line-height:1.6;color:#0A0A0A;">
        We've received your enquiry and one of our team will be in touch within one business day.
      </p>
    </td></tr>

    <tr><td style="padding:24px 32px 0;">
      <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#8A8680;">What you sent</p>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-top:1px solid rgba(10,10,10,0.08);margin-top:6px;">
        <tr>
          <td style="padding:14px 0 4px;font-size:13px;color:#8A8680;width:96px;vertical-align:top;">Service</td>
          <td style="padding:14px 0 4px;font-size:15px;color:#0A0A0A;">${safe(data.service)}</td>
        </tr>
        <tr>
          <td style="padding:4px 0;font-size:13px;color:#8A8680;vertical-align:top;">Phone</td>
          <td style="padding:4px 0;font-size:15px;color:#0A0A0A;">${data.phone ? safe(data.phone) : "—"}</td>
        </tr>
        <tr>
          <td style="padding:4px 0 14px;font-size:13px;color:#8A8680;vertical-align:top;">Message</td>
          <td style="padding:4px 0 14px;font-size:15px;line-height:1.55;color:#0A0A0A;">${messageHtml}</td>
        </tr>
      </table>
    </td></tr>

    <tr><td style="padding:8px 32px 0;">
      <p style="margin:0 0 14px;font-size:14px;line-height:1.5;color:#0A0A0A;">
        If it's urgent, the fastest reply is on WhatsApp.
      </p>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="padding-right:8px;">
            <a href="${waHref}" style="display:inline-block;background:#C8A96A;color:#0A0A0A;text-decoration:none;padding:12px 22px;border-radius:999px;font-size:14px;font-weight:600;letter-spacing:-0.01em;">Reply on WhatsApp →</a>
          </td>
          <td>
            <a href="mailto:${BUSINESS.email}" style="display:inline-block;color:#0A0A0A;text-decoration:none;padding:12px 4px;border-radius:999px;font-size:14px;font-weight:500;">or email us</a>
          </td>
        </tr>
      </table>
    </td></tr>

    <tr><td style="padding:28px 32px 32px;">
      <p style="margin:24px 0 4px;font-family:Georgia,'Times New Roman',serif;font-size:13px;color:#8A8680;">— Anay Interior</p>
      <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:13px;color:#8A8680;">We design, you deserve.</p>
    </td></tr>
  </table>

  <p style="max-width:560px;margin:18px auto 0;font-size:11px;line-height:1.6;color:#8A8680;text-align:center;">
    ${safe(BUSINESS.legalName)} · ${safe(BUSINESS.address.street)}, ${safe(BUSINESS.address.city)}, U.A.E.<br/>
    You received this because you submitted the contact form on anayinterior.com.
  </p>
</body></html>`;
}

async function sendUserConfirmation(data: ContactInput): Promise<void> {
  const from = process.env.CONTACT_FROM_EMAIL;
  const replyTo = process.env.CONTACT_TO_EMAIL;
  if (!from) return;
  try {
    await getResend().emails.send({
      from,
      to: data.email,
      replyTo: replyTo || from,
      subject: `We received your enquiry — ${BUSINESS.name}`,
      text: renderUserConfirmText(data),
      html: renderUserConfirmHtml(data),
    });
  } catch (e) {
    console.error("User confirmation send failed:", e);
  }
}

async function sendWhatsApp(data: ContactInput): Promise<void> {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_WHATSAPP_FROM; // e.g. "whatsapp:+14155238886"
  const to = process.env.TWILIO_WHATSAPP_TO; // e.g. "whatsapp:+971568532328"

  if (!sid || !token || !from || !to) return;

  try {
    const auth = Buffer.from(`${sid}:${token}`).toString("base64");
    const resp = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          From: from,
          To: to,
          Body: renderWhatsAppText(data),
        }).toString(),
      },
    );
    if (!resp.ok) {
      const text = await resp.text();
      console.error("Twilio WhatsApp send failed:", resp.status, text);
    }
  } catch (e) {
    console.error("Twilio WhatsApp send error:", e);
  }
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const raw = Object.fromEntries(formData);
  const parsed = contactSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the form and try again.",
      fieldErrors: parsed.error.flatten().fieldErrors as ContactState extends {
        fieldErrors?: infer T;
      }
        ? T
        : never,
    };
  }

  if (parsed.data.website && parsed.data.website.length > 0) {
    return { status: "success" };
  }

  const now = Date.now();
  const key = parsed.data.email.toLowerCase();
  const last = recentSubmissions.get(key);
  if (last && now - last < THROTTLE_MS) {
    return {
      status: "error",
      message: "You've just sent a message — please wait a moment and try again.",
    };
  }
  recentSubmissions.set(key, now);

  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  try {
    if (to && from) {
      await getResend().emails.send({
        from,
        to,
        replyTo: parsed.data.email,
        subject: `New enquiry — ${parsed.data.service} — ${parsed.data.name}`,
        text: renderEmailText(parsed.data),
      });
    } else {
      console.warn("Contact form submitted but email env vars are not configured.");
    }

    // Best-effort side-effects. Never block the form result.
    void sendWhatsApp(parsed.data);
    void sendUserConfirmation(parsed.data);

    return { status: "success" };
  } catch (err) {
    console.error("Contact form send failed:", err);
    return {
      status: "error",
      message:
        "We couldn't send your message right now. Please email us directly or try again shortly.",
    };
  }
}
