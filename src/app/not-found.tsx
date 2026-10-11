import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/section-heading";

export default function NotFound() {
  return (
    <Container className="grid min-h-[80vh] place-items-center text-center">
      <div>
        <p className="text-sm font-medium text-muted">404</p>
        <h1 className="mt-2 text-5xl font-semibold tracking-[-0.04em]">This page doesn&rsquo;t exist.</h1>
        <p className="mt-4 text-lg text-muted">It may have moved, or the link has a typo.</p>
        <Link
          href="/"
          className="mt-8 inline-flex h-11 items-center gap-2 rounded-full bg-fg px-5 text-sm font-medium text-bg transition-opacity hover:opacity-85"
        >
          <ArrowLeft className="size-4" strokeWidth={2} /> Back home
        </Link>
      </div>
    </Container>
  );
}
