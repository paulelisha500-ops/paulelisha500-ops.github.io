// Photos are intentionally blank for now. To add one, put the file in
// public/media/ and set `src`, e.g. { src: "/media/hero-1.jpg", alt: "..." }.
// Empty entries render as clean placeholder frames.

export type Photo = { src: string; alt: string };

const blank = (alt: string): Photo => ({ src: "", alt });

/** The swipeable stack in the hero. */
export const heroPhotos: Photo[] = Array.from({ length: 7 }, (_, i) => blank(`Portrait ${i + 1}`));

/** The tilted strip at the top of the About page. */
export const aboutPhotos: Photo[] = Array.from({ length: 8 }, (_, i) => blank(`Moment ${i + 1}`));

/** The Photos page grid. */
export const galleryPhotos: (Photo & { caption: string; tall?: boolean })[] = [
  { ...blank("Gallery 1"), caption: "Add a caption", tall: true },
  { ...blank("Gallery 2"), caption: "Add a caption" },
  { ...blank("Gallery 3"), caption: "Add a caption" },
  { ...blank("Gallery 4"), caption: "Add a caption", tall: true },
  { ...blank("Gallery 5"), caption: "Add a caption" },
  { ...blank("Gallery 6"), caption: "Add a caption", tall: true },
  { ...blank("Gallery 7"), caption: "Add a caption" },
  { ...blank("Gallery 8"), caption: "Add a caption" },
  { ...blank("Gallery 9"), caption: "Add a caption", tall: true },
];
