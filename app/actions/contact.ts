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

  try {
    const to = process.env.CONTACT_TO_EMAIL;
    const from = process.env.CONTACT_FROM_EMAIL;
    if (!to || !from) {
      console.warn("Contact form submitted but email env vars are not configured.");
      return { status: "success" };
    }

    await getResend().emails.send({
      from,
      to,
      replyTo: parsed.data.email,
      subject: `New enquiry — ${parsed.data.service} — ${parsed.data.name}`,
      text: renderEmailText(parsed.data),
    });

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
