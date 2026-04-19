import { z } from "zod";

export const SERVICE_OPTIONS = [
  "Civil",
  "Flooring",
  "Paint",
  "Electrical",
  "Plumbing",
  "Gypsum",
  "Other",
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(80),
  email: z.string().trim().email("Please enter a valid email."),
  phone: z
    .string()
    .trim()
    .max(30)
    .optional()
    .or(z.literal("")),
  service: z.enum(SERVICE_OPTIONS, {
    message: "Please choose a service.",
  }),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little more about your project.")
    .max(2000),
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
