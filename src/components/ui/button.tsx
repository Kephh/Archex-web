import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  busy?: boolean;
  onClick?: () => void;
};

const variants = {
  primary: "button-primary shadow-[0_8px_20px_rgba(17,28,46,0.18)] ring-1 ring-forest/15",
  secondary: "button-secondary border border-[#d1a477] shadow-[0_8px_20px_rgba(157,118,81,0.22)]",
  ghost: "text-ink hover:bg-surface"
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  type = "button",
  disabled,
  busy = false,
  onClick
}: ButtonProps) {
  const classes = cn(
    "group inline-flex min-h-11 min-w-[8.5rem] items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold transition duration-200 hover:-translate-y-px active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60",
    variants[variant],
    className
  );
  const content = (
    <>
      {children}
      {href ? (
        <ArrowRight
          aria-hidden="true"
          size={16}
          className="transition-transform group-hover:translate-x-0.5"
        />
      ) : null}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        onClick={disabled ? (event) => event.preventDefault() : onClick}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      aria-busy={busy || undefined}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
