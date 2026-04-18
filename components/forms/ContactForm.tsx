"use client";

import { useActionState, useEffect, useRef, useState, startTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import {
  SERVICE_OPTIONS,
  contactSchema,
  type ContactInput,
} from "@/lib/validations";
import { submitContact, type ContactState } from "@/app/actions/contact";
import { cn } from "@/lib/cn";

const initialState: ContactState = { status: "idle" };

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContact,
    initialState,
  );
  const formRef = useRef<HTMLFormElement>(null);
  const [serviceValue, setServiceValue] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: undefined as unknown as ContactInput["service"],
      message: "",
      website: "",
    },
  });

  useEffect(() => {
    if (state.status === "success") {
      toast.success("Thanks — we'll reply within one business day.");
      reset();
      setServiceValue("");
    } else if (state.status === "error") {
      toast.error(state.message);
      if (state.fieldErrors) {
        for (const [field, msgs] of Object.entries(state.fieldErrors)) {
          if (msgs && msgs[0]) {
            setError(field as keyof ContactInput, { message: msgs[0] });
          }
        }
      }
    }
  }, [state, reset, setError]);

  const onSubmit = handleSubmit(() => {
    if (!formRef.current) return;
    const data = new FormData(formRef.current);
    startTransition(() => formAction(data));
  });

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      className="space-y-6 rounded-2xl border border-[--color-line] bg-[--color-bone-2]/40 p-6 md:p-10"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Field
          label="Your name"
          error={errors.name?.message}
          input={
            <input
              type="text"
              autoComplete="name"
              {...register("name")}
              className={inputCx}
              placeholder="Full name"
            />
          }
        />
        <Field
          label="Email"
          error={errors.email?.message}
          input={
            <input
              type="email"
              autoComplete="email"
              {...register("email")}
              className={inputCx}
              placeholder="you@example.com"
            />
          }
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Field
          label="Phone"
          hint="Optional"
          error={errors.phone?.message}
          input={
            <input
              type="tel"
              autoComplete="tel"
              {...register("phone")}
              className={inputCx}
              placeholder="+971 …"
            />
          }
        />
        <Field
          label="Service"
          error={errors.service?.message}
          input={
            <select
              {...register("service", {
                onChange: (e) => setServiceValue(e.target.value),
              })}
              className={cn(
                inputCx,
                !serviceValue && "text-[--color-muted]",
              )}
              defaultValue=""
            >
              <option value="" disabled>
                Choose a service
              </option>
              {SERVICE_OPTIONS.map((s) => (
                <option key={s} value={s} className="text-[--color-ink]">
                  {s}
                </option>
              ))}
            </select>
          }
        />
      </div>

      <Field
        label="Project details"
        error={errors.message?.message}
        input={
          <textarea
            rows={5}
            {...register("message")}
            className={cn(inputCx, "resize-y min-h-[120px]")}
            placeholder="Briefly: what, where, and roughly when."
          />
        }
      />

      <div aria-hidden className="absolute -left-[9999px] -top-[9999px]">
        <label>
          Website
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("website")}
          />
        </label>
      </div>

      <motion.button
        type="submit"
        disabled={isPending}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[--color-ink] px-7 text-sm font-medium text-[--color-bone] transition-colors hover:bg-[--color-gold] hover:text-[--color-ink] disabled:cursor-not-allowed disabled:opacity-60",
        )}
      >
        {isPending ? (
          <>
            <Spinner /> Sending
          </>
        ) : (
          <>
            Send enquiry
            <ArrowUpRight
              size={16}
              strokeWidth={1.6}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </>
        )}
      </motion.button>

      <p className="text-xs text-[--color-muted]">
        By sending this form you agree we may contact you about your enquiry.
        We never share your details.
      </p>
    </form>
  );
}

const inputCx =
  "block w-full rounded-md border border-[--color-line] bg-[--color-bone] px-4 py-3 text-[15px] text-[--color-ink] placeholder:text-[--color-muted] outline-none transition-[border-color,box-shadow] focus:border-[--color-ink] focus:ring-0";

function Field({
  label,
  hint,
  error,
  input,
}: {
  label: string;
  hint?: string;
  error?: string;
  input: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between gap-3 pb-2 text-[11px] uppercase tracking-[0.22em] text-[--color-muted]">
        <span>{label}</span>
        {hint && <span className="normal-case tracking-normal text-[10px]">{hint}</span>}
      </span>
      {input}
      {error && (
        <span className="mt-1.5 block text-xs text-[--color-gold-2]">
          {error}
        </span>
      )}
    </label>
  );
}

function Spinner() {
  return (
    <span
      className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-[--color-bone-2]/30 border-t-[--color-bone]"
      aria-hidden
    />
  );
}
