import type { Metadata } from "next";
import { BlurFade } from "@/components/magicui/blur-fade";
import { PhotoFrame } from "@/components/photo-frame";
import { Container, SectionHeading } from "@/components/section-heading";
import { galleryPhotos } from "@/data/photos";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Photos", description: "Photos by Elisha Paul." };

export default function PhotosPage() {
  return (
    <Container className="pt-28">
      <BlurFade>
        <SectionHeading as="h1" title="Photos" subtitle="Moments away from the keyboard." />
      </BlurFade>
      <div className="mt-12 columns-2 gap-4 md:columns-3 [&>*]:mb-4">
        {galleryPhotos.map((photo, i) => (
          <BlurFade key={i} delay={0.04 * (i % 3)} className="break-inside-avoid">
            <figure className="group">
              <PhotoFrame
                photo={photo}
                className={cn("w-full rounded-[24px] transition-transform duration-500 group-hover:scale-[0.985]", photo.tall ? "aspect-[3/4]" : "aspect-square")}
              />
              <figcaption className="mt-2 px-1 text-xs text-subtle">{photo.caption}</figcaption>
            </figure>
          </BlurFade>
        ))}
      </div>
    </Container>
  );
}
