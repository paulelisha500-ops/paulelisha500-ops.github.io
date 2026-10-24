// To add a photo, put the file in public/media/ and add it to a list below,
// e.g. { src: "/media/graduation.jpg", alt: "..." }. With two or more photos
// the hero becomes a swipeable stack.

export type Photo = { src: string; alt: string };

const portrait: Photo = { src: "/media/elisha-paul.jpg", alt: "Elisha Paul in a light blue blazer" };

/** The swipeable stack in the hero. */
export const heroPhotos: Photo[] = [portrait];

/** The tilted cards at the top of the About page. */
export const aboutPhotos: Photo[] = [portrait];

/** The Photos page grid. */
export const galleryPhotos: (Photo & { caption?: string; tall?: boolean })[] = [{ ...portrait, tall: true }];
