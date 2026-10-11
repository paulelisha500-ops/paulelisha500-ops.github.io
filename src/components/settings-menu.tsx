"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Monitor, Moon, Settings2, Sun } from "lucide-react";
import { updateSettings, useSettings, type ThemePref } from "@/lib/settings";
import { cn } from "@/lib/utils";

const themes: { value: ThemePref; label: string; Icon: typeof Sun }[] = [
  { value: "system", label: "Auto", Icon: Monitor },
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
];

export function SettingsMenu() {
  const [open, setOpen] = useState(false);
  const settings = useSettings();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="fixed top-4 right-4 z-50 sm:top-5 sm:right-5">
      <button
        type="button"
        aria-label="Display settings"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="glass grid size-10 place-items-center rounded-full text-fg transition-transform duration-300 ease-(--ease-spring) hover:scale-105 active:scale-95"
      >
        <Settings2 className={cn("size-[18px] transition-transform duration-500", open && "rotate-90")} strokeWidth={1.8} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Display settings"
            initial={{ opacity: 0, scale: 0.92, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
            style={{ transformOrigin: "top right" }}
            className="glass absolute top-12 right-0 w-64 rounded-2xl p-3 shadow-2xl shadow-black/20"
          >
            <p className="eyebrow px-1 pb-2">Appearance</p>
            <div className="grid grid-cols-3 gap-1 rounded-xl bg-surface-strong p-1">
              {themes.map(({ value, label, Icon }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => updateSettings({ theme: value })}
                  aria-pressed={settings.theme === value}
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-lg py-2 text-[11px] font-medium text-muted transition-colors",
                    settings.theme === value && "bg-elevated text-fg shadow-sm",
                  )}
                >
                  <Icon className="size-4" strokeWidth={1.8} />
                  {label}
                </button>
              ))}
            </div>

            <label className="mt-3 flex cursor-pointer items-center justify-between rounded-xl px-1 py-1.5">
              <span>
                <span className="block text-sm font-medium">Ambient light</span>
                <span className="block text-xs text-muted">3D colour glow behind the page</span>
              </span>
              <input
                type="checkbox"
                className="peer sr-only"
                checked={settings.ambient}
                onChange={(e) => updateSettings({ ambient: e.target.checked })}
              />
              <span
                aria-hidden
                className="relative h-[26px] w-[44px] shrink-0 rounded-full bg-line-strong transition-colors peer-checked:bg-[#34c759] after:absolute after:top-[2px] after:left-[2px] after:size-[22px] after:rounded-full after:bg-white after:shadow after:transition-transform after:duration-300 peer-checked:after:translate-x-[18px] peer-focus-visible:ring-2 peer-focus-visible:ring-accent"
              />
            </label>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
