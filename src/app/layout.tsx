import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { AmbientBackground } from "@/components/ambient/ambient-background";
import { SiteDock } from "@/components/nav/site-dock";
import { RegisterServiceWorker } from "@/components/pwa/pwa";
import { SettingsMenu } from "@/components/settings-menu";
import { SplashScreen } from "@/components/splash/splash-screen";
import { StaticHostUrls } from "@/components/static-host-urls";
import { profile } from "@/data/profile";
import { settingsScript } from "@/lib/settings-script";
import "./globals.css";

// SF Pro is used on Apple devices through the system font stack; Inter is the
// self-hosted fallback everywhere else.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

const description = `${profile.name}: ${profile.role}. ${profile.summary}`;

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: { default: `${profile.name} · ${profile.role}`, template: `%s · ${profile.name}` },
  description,
  applicationName: profile.name,
  authors: [{ name: profile.name, url: profile.siteUrl }],
  keywords: ["Elisha Paul", "AI engineer", "ML engineer", "computer vision", "LLM", "RAG", "portfolio", "India", "UAE"],
  appleWebApp: { capable: true, title: profile.name, statusBarStyle: "black-translucent" },
  formatDetection: { telephone: false },
  openGraph: {
    type: "website",
    url: profile.siteUrl,
    title: `${profile.name} · ${profile.role}`,
    description,
    siteName: profile.name,
  },
  twitter: { card: "summary", title: `${profile.name} · ${profile.role}`, description },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }, { url: "/icons/icon-192.png", sizes: "192x192" }],
    apple: "/icons/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#05070c",
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-theme="dark" data-ambient="on" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: settingsScript }} />
        <noscript>
          <style>{`[data-blurfade],.reveal{opacity:1!important;filter:none!important;transform:none!important}#splash{display:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-dvh overflow-x-hidden">
        <SplashScreen />
        <AmbientBackground />
        <SettingsMenu />
        <a
          href="#main"
          className="sr-only rounded-full bg-fg px-4 py-2 text-bg focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70]"
        >
          Skip to content
        </a>
        <main id="main" className="pb-36">
          {children}
        </main>
        <SiteDock />
        <RegisterServiceWorker />
        <StaticHostUrls />
      </body>
    </html>
  );
}
