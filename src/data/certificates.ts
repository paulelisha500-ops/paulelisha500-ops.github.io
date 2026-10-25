// Certificates are picked up automatically from public/media/certificates/.
//
// 1. Upload the certificate as an image (PNG, JPG, WebP) and/or a PDF, named
//    after the certificate, e.g. "aws-machine-learning.png". An image and a PDF
//    with the same name become one certificate (the image is the preview).
// 2. That's it: the title comes from the file name ("Aws Machine Learning").
// 3. Optionally add details below, keyed by the same file name (no extension).
//    An entry with no file at all still shows, which suits link-only credentials.

export type CertificateDetails = {
  title?: string;
  issuer?: string;
  /** "2026-05" or "2026-05-14"; newest certificates are shown first. */
  date?: string;
  credentialId?: string;
  /** Link where anyone can verify the credential. */
  credentialUrl?: string;
  skills?: string[];
};

export const certificateDetails: Record<string, CertificateDetails> = {
  // Upload tritrix-internship.pdf (and optionally a .jpg preview) to attach the certificate itself.
  "tritrix-internship": {
    title: "Software Developer Internship",
    issuer: "Tritrix Technologies, Chennai",
    date: "2025-02",
    skills: ["Python", "JavaScript", "HTML", "CSS", "SQL", "Code reviews"],
  },
  "generative-ai-imarticus": {
    title: "Generative AI",
    issuer: "Imarticus Learning · Skill India / NSDC",
    date: "2025-04",
    skills: ["Generative AI", "30-hour course"],
  },
  "mobile-app-development-george-academy": {
    title: "Mobile App Development",
    issuer: "George Academy",
    date: "2025-01",
    credentialId: "22619902",
    skills: ["Mobile apps"],
  },
  "game-development-inlustro": {
    title: "Game Development",
    issuer: "InLustro",
    date: "2024-03",
    skills: ["Game development"],
  },
};

/** Empty frames shown until the first certificate is added. */
export const CERTIFICATE_SLOTS = 6;
