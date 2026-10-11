import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  title,
  subtitle,
  action,
  className,
  as: Tag = "h2",
}: {
  title: string;
  subtitle?: ReactNode;
  action?: ReactNode;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("flex flex-wrap items-end justify-between gap-x-8 gap-y-4", className)}>
      <div className="max-w-xl">
        <Tag
          className={cn(
            "font-semibold tracking-[-0.035em] text-balance",
            Tag === "h1" ? "text-5xl sm:text-6xl" : "text-4xl sm:text-5xl",
          )}
        >
          {title}
        </Tag>
        {subtitle && <p className="mt-3 text-lg leading-relaxed text-pretty text-muted">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-8", className)}>{children}</div>;
}
