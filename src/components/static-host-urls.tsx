"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Hugging Face static Spaces serve /about/index.html but not /about/ (they
// redirect that to huggingface.co). After each navigation on an hf.space host,
// rewrite the address to the index.html form so refreshing or sharing a page
// works there too. GitHub Pages handles both forms, so nothing changes there.
export function StaticHostUrls() {
  const pathname = usePathname();

  useEffect(() => {
    if (!window.location.hostname.endsWith(".hf.space") || !pathname.endsWith("/")) return;
    window.history.replaceState(null, "", `${pathname}index.html${window.location.search}${window.location.hash}`);
  }, [pathname]);

  return null;
}

/** "/about/index.html" and "/about/" are the same page. */
export const normalizePath = (pathname: string) => pathname.replace(/index\.html$/, "") || "/";
