import { Camera } from "lucide-react";
import type { Photo } from "@/data/photos";
import { cn } from "@/lib/utils";

// A photo, or, while photos are still blank, an empty frame that holds the layout.
export function PhotoFrame({ photo, className, eager }: { photo: Photo; className?: string; eager?: boolean }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[inherit] bg-gradient-to-br from-surface-strong to-surface",
        "after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:ring-1 after:ring-line after:ring-inset",
        className,
      )}
    >
      {photo.src ? (
        // eslint-disable-next-line @next/next/no-img-element -- static export, images are served as-is
        <img
          src={photo.src}
          alt={photo.alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          draggable={false}
          className="size-full object-cover select-none"
        />
      ) : (
        <div className="grid size-full place-items-center" role="img" aria-label={`${photo.alt} (photo coming soon)`}>
          <Camera className="size-5 text-subtle opacity-50" strokeWidth={1.5} aria-hidden />
        </div>
      )}
    </div>
  );
}
