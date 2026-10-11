import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const monthFmt = new Intl.DateTimeFormat("en", { month: "short", year: "numeric", timeZone: "UTC" });
const dayFmt = new Intl.DateTimeFormat("en", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

export const formatMonth = (iso: string) => monthFmt.format(new Date(iso));
export const formatDay = (iso: string) => dayFmt.format(new Date(iso));

export const compact = (n: number) => new Intl.NumberFormat("en", { notation: "compact" }).format(n);

/** Turns **bold** markers into segments so copy can stay in plain data files. */
export function splitBold(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part) =>
    part.startsWith("**") ? { bold: true, text: part.slice(2, -2) } : { bold: false, text: part },
  );
}
