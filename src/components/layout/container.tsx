import { cn } from "@/lib/utils";

export function Container({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1600px] px-[clamp(20px,4.5vw,72px)]",
        className
      )}
    >
      {children}
    </div>
  );
}

export function Section({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <section className={cn("py-16 sm:py-24", className)}>{children}</section>;
}
