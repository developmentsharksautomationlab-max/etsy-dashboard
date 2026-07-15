import Image from "next/image";

export type ThumbKind =
  | "macrame-ivory"
  | "macrame-green"
  | "wooden-map"
  | "mahjong";

const thumbs: Record<ThumbKind, { src: string; alt: string }> = {
  "macrame-ivory": {
    src: "/products/macrame-ivory.jpg",
    alt: "Tie-Dye Macrame Wall Hanging – Ivory Brown",
  },
  "macrame-green": {
    src: "/products/macrame-green.jpg",
    alt: "Tie-Dye Macrame Wall Hanging – Green",
  },
  "wooden-map": {
    src: "/products/wooden-map.jpg",
    alt: "USA Travel Map Tracker – Wooden Puzzle Map",
  },
  mahjong: {
    src: "/products/mahjong.jpg",
    alt: "166 Piece American Mahjong Set",
  },
};

export default function ProductThumb({
  kind,
  size = 64,
  className = "",
}: {
  kind: ThumbKind;
  size?: number;
  className?: string;
}) {
  const { src, alt } = thumbs[kind];
  return (
    <span
      className={`relative inline-block shrink-0 overflow-hidden rounded-md ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={`${size}px`}
        className="object-cover"
      />
    </span>
  );
}
