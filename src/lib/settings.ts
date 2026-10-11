"use client";

import { useSyncExternalStore } from "react";
import { SETTINGS_KEY as KEY } from "./settings-script";

// Viewer preferences: theme and the ambient background. Persisted in
// localStorage and applied to <html> by an inline script before first paint.

export type ThemePref = "system" | "light" | "dark";
export type Settings = { theme: ThemePref; ambient: boolean };

const DEFAULTS: Settings = { theme: "system", ambient: true };
const EVENT = "ep:settings";

let cached: Settings | null = null;

function read(): Settings {
  if (cached) return cached;
  try {
    cached = { ...DEFAULTS, ...JSON.parse(localStorage.getItem(KEY) || "{}") };
  } catch {
    cached = DEFAULTS;
  }
  return cached!;
}

export function resolvedTheme(theme: ThemePref): "light" | "dark" {
  if (theme !== "system") return theme;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export function applySettings(s: Settings) {
  const root = document.documentElement;
  const theme = resolvedTheme(s.theme);
  root.dataset.theme = theme;
  root.dataset.ambient = s.ambient ? "on" : "off";
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#000000" : "#fbfbfd");
}

export function updateSettings(patch: Partial<Settings>) {
  const next = { ...read(), ...patch };
  cached = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Private mode: the change still applies for this page view.
  }
  applySettings(next);
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(cb: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: light)");
  const onSystem = () => {
    if (read().theme === "system") applySettings(read());
    cb();
  };
  window.addEventListener(EVENT, cb);
  media.addEventListener("change", onSystem);
  return () => {
    window.removeEventListener(EVENT, cb);
    media.removeEventListener("change", onSystem);
  };
}

export function useSettings(): Settings {
  return useSyncExternalStore(subscribe, read, () => DEFAULTS);
}
