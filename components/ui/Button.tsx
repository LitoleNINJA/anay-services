import Link from "next/link";
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

type BaseProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

const base =
  "inline-flex items-center justify-center gap-2 font-sans font-medium tracking-tight transition-colors duration-300 rounded-full select-none whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[--color-gold] disabled:opacity-60 disabled:cursor-not-allowed";

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-7 text-[15px]",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-[--color-gold] text-[--color-ink] hover:bg-[--color-gold-2]",
  ghost:
    "bg-transparent text-[--color-ink] hover:bg-[--color-ink] hover:text-[--color-bone]",
  outline:
    "bg-transparent text-[--color-ink] border border-[--color-ink] hover:bg-[--color-ink] hover:text-[--color-bone]",
};

export const Button = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<"button"> & BaseProps
>(function Button(
  { variant = "primary", size = "md", className, children, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn(base, sizes[size], variants[variant], className)}
      {...rest}
    >
      {children}
    </button>
  );
});

export function LinkButton({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  external,
  ...rest
}: BaseProps & {
  href: string;
  external?: boolean;
} & Omit<ComponentPropsWithoutRef<"a">, "href">) {
  const classes = cn(base, sizes[size], variants[variant], className);
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className={classes}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}
