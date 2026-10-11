"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Award, GitPullRequestArrow, House, Images, LayoutGrid, type LucideIcon } from "lucide-react";
import { Dock, DockIcon, DockSeparator } from "@/components/magicui/dock";
import { normalizePath } from "@/components/static-host-urls";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

type Item = { href: string; label: string; Icon?: LucideIcon };

const items: Item[] = [
  { href: "/", label: "Home", Icon: House },
  { href: "/projects/", label: "Projects", Icon: LayoutGrid },
  { href: "/about/", label: "About" },
  { href: "/certificates/", label: "Certificates", Icon: Award },
  { href: "/shipped/", label: "Shipped", Icon: GitPullRequestArrow },
  { href: "/photos/", label: "Photos", Icon: Images },
];

const isActive = (pathname: string, href: string) => {
  const path = normalizePath(pathname);
  return href === "/" ? path === "/" : path.startsWith(href.replace(/\/$/, ""));
};

function Avatar({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "grid size-full place-items-center rounded-full bg-gradient-to-br from-[#d1d1d6] to-[#8e8e93] text-[11px] font-semibold tracking-tight text-black/80 dark:from-[#48484a] dark:to-[#1c1c1e] dark:text-white/90",
        className,
      )}
    >
      {profile.initials}
    </span>
  );
}

// Floating dock, macOS style. While scrolling down it tucks into a small pill
// showing the current page, and opens again on scroll up, hover or tap.
export function SiteDock() {
  const pathname = usePathname();
  const [compact, setCompact] = useState(false);
  const current = items.find((i) => isActive(pathname, i.href)) ?? items[0];

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY) < 8) return;
      setCompact(y > lastY && y > 240);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Primary"
      className="pointer-events-none fixed inset-x-0 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex justify-center"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {compact ? (
          <motion.button
            key="pill"
            type="button"
            onClick={() => setCompact(false)}
            onPointerEnter={(e) => e.pointerType === "mouse" && setCompact(false)}
            initial={{ opacity: 0, scale: 0.85, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 6 }}
            transition={{ type: "spring", stiffness: 500, damping: 34 }}
            className="glass pointer-events-auto flex h-10 items-center gap-2 rounded-full pr-4 pl-3 text-sm font-medium shadow-lg shadow-black/10"
            aria-label={`Open navigation (current page: ${current.label})`}
          >
            {current.Icon ? <current.Icon className="size-4" strokeWidth={2} /> : <Avatar className="size-5 text-[8px]" />}
            {current.label}
          </motion.button>
        ) : (
          <motion.div
            key="dock"
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 8 }}
            transition={{ type: "spring", stiffness: 480, damping: 34 }}
            className="pointer-events-auto"
          >
            <Dock>
              {items.map((item, i) => {
                const active = isActive(pathname, item.href);
                return (
                  <div key={item.href} className="contents">
                    {i === 4 && <DockSeparator />}
                    <DockIcon className="group">
                      <Link
                        href={item.href}
                        aria-label={item.label}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "grid size-full place-items-center rounded-full transition-colors",
                          item.Icon && "hover:bg-surface-strong",
                          active && item.Icon && "bg-surface-strong",
                        )}
                      >
                        {item.Icon ? <item.Icon className="size-[46%]" strokeWidth={1.9} /> : <Avatar />}
                      </Link>
                      <span
                        aria-hidden
                        className={cn(
                          "absolute -bottom-[7px] size-1 rounded-full bg-fg transition-opacity",
                          active ? "opacity-70" : "opacity-0",
                        )}
                      />
                      <span className="glass pointer-events-none absolute -top-10 rounded-lg px-2.5 py-1 text-xs font-medium whitespace-nowrap opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:opacity-100">
                        {item.label}
                      </span>
                    </DockIcon>
                  </div>
                );
              })}
            </Dock>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
