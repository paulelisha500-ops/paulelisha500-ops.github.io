// Six monogram marks for the loading screen; one is picked at random on every
// load. Strokes use pathLength=1 so the CSS draw animation works for any shape.

import type { ReactNode } from "react";

const E = "M30 22H20v20h10M20 32h8";
const P = "M36 42V22h6.5a5.5 5.5 0 0 1 0 11H36";

const marks: { name: string; body: ReactNode }[] = [
  {
    name: "Tile",
    body: (
      <>
        <rect className="draw" pathLength={1} x="6" y="6" width="52" height="52" rx="15" />
        <path className="draw draw-2" pathLength={1} d={E} />
        <path className="draw draw-3" pathLength={1} d={P} />
      </>
    ),
  },
  {
    name: "Network",
    body: (
      <>
        <path
          className="draw"
          pathLength={1}
          d="M12 18 32 14M12 18 32 32M12 32 32 14M12 32 32 50M12 46 32 32M12 46 32 50M32 14 52 24M32 32 52 24M32 32 52 40M32 50 52 40"
          strokeWidth="1.4"
          opacity="0.55"
        />
        {[
          [12, 18],
          [12, 32],
          [12, 46],
          [32, 14],
          [32, 32],
          [32, 50],
          [52, 24],
          [52, 40],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} className="pop" cx={cx} cy={cy} r="3.4" fill="currentColor" stroke="none" />
        ))}
      </>
    ),
  },
  {
    name: "Orbit",
    body: (
      <>
        <circle className="draw" pathLength={1} cx="32" cy="32" r="25" />
        <ellipse className="draw draw-2" pathLength={1} cx="32" cy="32" rx="25" ry="9" transform="rotate(-28 32 32)" opacity="0.6" />
        <circle className="pop" cx="53" cy="20" r="3" fill="currentColor" stroke="none" />
        <path className="draw draw-3" pathLength={1} d="M27 26h-6v12h6M21 32h5M35 38V26h4a3.5 3.5 0 0 1 0 7h-4" strokeWidth="2.2" />
      </>
    ),
  },
  {
    name: "Hex",
    body: (
      <>
        <path className="draw" pathLength={1} d="M32 5 55.4 18.5v27L32 59 8.6 45.5v-27Z" />
        <path className="draw draw-2" pathLength={1} d={E} />
        <path className="draw draw-3" pathLength={1} d={P} />
      </>
    ),
  },
  {
    name: "Code",
    body: (
      <>
        <path className="draw" pathLength={1} d="M14 14c-4 0-5 2-5 6v6c0 3-1.5 5-4 6 2.5 1 4 3 4 6v6c0 4 1 6 5 6" />
        <path className="draw" pathLength={1} d="M50 14c4 0 5 2 5 6v6c0 3 1.5 5 4 6-2.5 1-4 3-4 6v6c0 4-1 6-5 6" />
        <path className="draw draw-2" pathLength={1} d={E} />
        <path className="draw draw-3" pathLength={1} d={P} />
      </>
    ),
  },
  {
    name: "Spark",
    body: (
      <>
        <circle className="draw" pathLength={1} cx="32" cy="32" r="25" strokeDasharray="1" />
        <path
          className="draw draw-2"
          pathLength={1}
          d="M32 15c1.6 8.4 4.6 11.4 13 13-8.4 1.6-11.4 4.6-13 13-1.6-8.4-4.6-11.4-13-13 8.4-1.6 11.4-4.6 13-13Z"
        />
        <circle className="pop" cx="45.5" cy="45.5" r="2.6" fill="currentColor" stroke="none" />
      </>
    ),
  },
];

export const LOGO_COUNT = marks.length;

export function SplashLogo({ index, size = 72 }: { index: number; size?: number }) {
  const mark = marks[index % marks.length];
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-label={`Elisha Paul logo, ${mark.name}`}
      role="img"
    >
      {mark.body}
    </svg>
  );
}

export function AllSplashLogos() {
  return marks.map((_, i) => (
    <div key={i} className="splash-logo" data-i={i}>
      <SplashLogo index={i} />
    </div>
  ));
}
