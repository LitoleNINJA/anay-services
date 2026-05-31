"use server";

import { contactSchema, type ContactInput } from "@/lib/validations";
import { getResend } from "@/lib/resend";

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

    // Best-effort WhatsApp ping to the owner. Never blocks the form result.
    void sendWhatsApp(parsed.data);

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
