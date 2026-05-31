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
import { useLang } from "@/context/LanguageProvider";
import { Magnetic } from "@/components/ui/Magnetic";

const initialState: ContactState = { status: "idle" };

export function ContactForm() {
  const { t } = useLang();
  const f = t.contact.form;
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
      toast.success(f.successToast);
      reset();
      setServiceValue("");
    } else if (state.status === "error") {
      toast.error(state.message || f.errorToast);
      if (state.fieldErrors) {
        for (const [field, msgs] of Object.entries(state.fieldErrors)) {
          if (msgs && msgs[0]) {
            setError(field as keyof ContactInput, { message: msgs[0] });
          }
        }
      }
    }
  }, [state, reset, setError, f]);

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
          label={f.name}
          error={errors.name?.message}
          input={
            <input
              type="text"
              autoComplete="name"
              {...register("name")}
              className={inputCx}
              placeholder={f.namePlaceholder}
            />
          }
        />
        <Field
          label={f.email}
          error={errors.email?.message}
          input={
            <input
              type="email"
              autoComplete="email"
              {...register("email")}
              className={inputCx}
              placeholder={f.emailPlaceholder}
            />
          }
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Field
          label={f.phone}
          hint={f.phoneHint}
          error={errors.phone?.message}
          input={
            <input
              type="tel"
              autoComplete="tel"
              {...register("phone")}
              className={inputCx}
              placeholder={f.phonePlaceholder}
              dir="ltr"
            />
          }
        />
        <Field
          label={f.service}
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
                {f.serviceChoose}
              </option>
              {SERVICE_OPTIONS.map((s) => (
                <option key={s} value={s} className="text-[--color-ink]">
                  {t.services_enum[s] ?? s}
                </option>
              ))}
            </select>
          }
        />
      </div>

      <Field
        label={f.message}
        error={errors.message?.message}
        input={
          <textarea
            rows={5}
            {...register("message")}
            className={cn(inputCx, "resize-y min-h-[120px]")}
            placeholder={f.messagePlaceholder}
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

      <Magnetic strength={0.28}>
        <motion.button
          type="submit"
          disabled={isPending}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 500, damping: 22 }}
          className="group relative inline-flex h-12 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full px-7 text-sm font-medium shadow-[0_1px_0_rgba(10,10,10,0.04),0_12px_28px_-14px_rgba(10,10,10,0.5)] transition-shadow duration-300 hover:shadow-[0_1px_0_rgba(10,10,10,0.04),0_18px_36px_-14px_rgba(200,169,106,0.55)] focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          style={{
            backgroundColor: "#0A0A0A",
            color: "#F7F5F0",
          }}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 origin-left scale-x-0 transition-transform duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
            style={{ backgroundColor: "#C8A96A" }}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-active:opacity-100"
            style={{
              background:
                "radial-gradient(circle at center, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 60%)",
            }}
          />
          <span
            className="relative z-10 inline-flex items-center gap-2 transition-colors duration-200 group-hover:text-[#0A0A0A]"
          >
            {isPending ? (
              <>
                <Spinner /> {f.submitting}
              </>
            ) : (
              <>
                {f.submit}
                <ArrowUpRight
                  size={16}
                  strokeWidth={1.6}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </>
            )}
          </span>
        </motion.button>
      </Magnetic>

      <p className="text-xs text-[--color-muted]">{f.legalNote}</p>
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
    <label className="block" suppressHydrationWarning>
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
