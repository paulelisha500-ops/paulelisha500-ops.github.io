"use client";

import { useEffect, useSyncExternalStore } from "react";
import { Download } from "lucide-react";
import { cn } from "@/lib/utils";

// Makes the site an installable app: registers the service worker (offline
// support) and captures the browser's install prompt so we can offer it.

type InstallPromptEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };

let deferred: InstallPromptEvent | null = null;
const listeners = new Set<() => void>();
const notify = () => listeners.forEach((l) => l());

if (typeof window !== "undefined") {
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferred = e as InstallPromptEvent;
    notify();
  });
  window.addEventListener("appinstalled", () => {
    deferred = null;
    notify();
  });
}

export function RegisterServiceWorker() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;
    const register = () => navigator.serviceWorker.register("/sw.js", { scope: "/" }).catch(() => {});
    if (document.readyState === "complete") register();
    else window.addEventListener("load", register, { once: true });
  }, []);
  return null;
}

const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};

export function InstallAppButton({ className }: { className?: string }) {
  const canInstall = useSyncExternalStore(
    subscribe,
    () => deferred !== null,
    () => false,
  );
  if (!canInstall) return null;

  return (
    <button
      type="button"
      onClick={async () => {
        const prompt = deferred;
        if (!prompt) return;
        await prompt.prompt();
        await prompt.userChoice;
        deferred = null;
        notify();
      }}
      className={cn("chip font-medium transition-colors hover:bg-surface-strong", className)}
    >
      <Download className="size-3.5" strokeWidth={2} />
      Install app
    </button>
  );
}
