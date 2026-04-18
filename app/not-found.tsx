import Link from "next/link";
import { LinkButton } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="mb-5 text-xs uppercase tracking-[0.22em] text-[--color-muted]">
        404
      </p>
      <h1 className="font-display text-5xl tracking-tight md:text-7xl">
        Page not found.
      </h1>
      <p className="mt-4 max-w-md text-[--color-muted]">
        The page you were looking for has moved, been renamed or never existed.
      </p>
      <div className="mt-8 flex items-center gap-3">
        <LinkButton href="/" variant="primary" size="md">
          Back to home
        </LinkButton>
        <Link
          href="/#contact"
          className="text-sm underline-offset-4 hover:underline"
        >
          Contact us
        </Link>
      </div>
    </section>
  );
}
