import type { Metadata } from "next";
import { CertificateGallery } from "@/components/certificates/certificate-gallery";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Container, SectionHeading } from "@/components/section-heading";
import { Connect } from "@/components/sections/connect";
import { CERTIFICATE_SLOTS } from "@/data/certificates";
import { getCertificates } from "@/lib/certificates";

export const metadata: Metadata = {
  title: "Certificates",
  description: "Courses, credentials and certifications earned by Elisha Paul in AI, machine learning and software engineering.",
};

export default function CertificatesPage() {
  const certificates = getCertificates();

  return (
    <>
      <Container className="pt-28">
        <BlurFade>
          <SectionHeading
            as="h1"
            title="Certificates"
            subtitle={
              certificates.length > 0
                ? "Courses, credentials and certifications in AI, machine learning and software engineering. Tap one to view it, and verify where a link is available."
                : "Courses, credentials and certifications in AI, machine learning and software engineering. New certificates are on the way."
            }
          />
        </BlurFade>
        <BlurFade className="mt-12" delay={0.06}>
          <CertificateGallery certificates={certificates} slots={CERTIFICATE_SLOTS} />
        </BlurFade>
      </Container>
      <Connect />
    </>
  );
}
