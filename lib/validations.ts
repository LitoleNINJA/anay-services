import { z } from "zod";

export const SERVICE_OPTIONS = [
  "Carpet",
  "Tile",
  "Vinyl",
  "LVT",
  "Raised Floor",
  "Gypsum",
  "Paint",
  "Plastering",
  "Electrical",
  "Plumbing",
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
