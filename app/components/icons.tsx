import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function SearchIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

export function HomeIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5" />
    </svg>
  );
}

export function ListingsIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M3 12V5a2 2 0 0 1 2-2h7l9 9-9 9-9-9Z" />
      <circle cx="7.5" cy="7.5" r="1.4" />
    </svg>
  );
}

export function MessagesIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-5 4V6a1 1 0 0 1 1-1Z" />
    </svg>
  );
}

export function OrdersIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="3" y="7" width="18" height="13" rx="1.5" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

export function VisibilityIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M4 9V6a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v3" />
      <path d="M15 9V6a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v3" />
      <path d="M4 9h5l1 5a3.5 3.5 0 0 1-7 0Z" />
      <path d="M15 9h5l-1 5a3.5 3.5 0 0 1-7 0l1-5" />
      <path d="M9 11h6" />
    </svg>
  );
}

export function StatsIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M5 21V10" />
      <path d="M12 21V4" />
      <path d="M19 21v-7" />
    </svg>
  );
}

export function GearIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" />
    </svg>
  );
}

export function FlagIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M5 21V4" />
      <path d="M5 4h11l-2 4 2 4H5" />
    </svg>
  );
}

export function MarketingIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M4 9v6h3l9 5V4L7 9H4Z" />
      <path d="M18 9a3 3 0 0 1 0 6" />
    </svg>
  );
}

export function FinancesIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M3 9 12 4l9 5" />
      <path d="M5 9v8M9 9v8M15 9v8M19 9v8" />
      <path d="M3 20h18" />
    </svg>
  );
}

export function AppsIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="4" y="4" width="7" height="7" rx="1.5" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" />
      <rect x="13" y="13" width="7" height="7" rx="1.5" />
    </svg>
  );
}

export function HelpIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.5a2.5 2.5 0 0 1 4.5 1.5c0 1.5-2 2-2 3" />
      <path d="M12 17h.01" />
    </svg>
  );
}

export function ChevronDownIcon(p: IconProps) {
  return (
    <svg {...base} width={16} height={16} {...p}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function ChevronUpIcon(p: IconProps) {
  return (
    <svg {...base} width={16} height={16} {...p}>
      <path d="m6 15 6-6 6 6" />
    </svg>
  );
}

export function MenuIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

export function CheckCircleIcon(p: IconProps) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...p}>
      <circle cx="12" cy="12" r="11" fill="#4a8a3f" />
      <path
        d="m7.5 12.5 3 3 6-6.5"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PencilIcon(p: IconProps) {
  return (
    <svg {...base} width={22} height={22} {...p}>
      <path d="M16.5 4.5a2.1 2.1 0 0 1 3 3L8 19l-4 1 1-4Z" />
      <path d="M14 7l3 3" />
    </svg>
  );
}

export function PersonIcon(p: IconProps) {
  return (
    <svg {...base} width={22} height={22} {...p}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </svg>
  );
}

export function ArrowRightIcon(p: IconProps) {
  return (
    <svg {...base} width={16} height={16} strokeWidth={2} {...p}>
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}

export function ExternalLinkIcon(p: IconProps) {
  return (
    <svg {...base} width={15} height={15} {...p}>
      <path d="M14 4h6v6" />
      <path d="M20 4 11 13" />
      <path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
    </svg>
  );
}

export function ClockIcon(p: IconProps) {
  return (
    <svg {...base} width={14} height={14} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function ChatIcon(p: IconProps) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" {...p}>
      <path
        d="M4 5h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-7l-4 4v-4H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ClipboardIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="5" y="4" width="14" height="17" rx="1.5" />
      <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
      <path d="M9 10h6M9 14h6" />
    </svg>
  );
}

export function Star({ fill = "full" }: { fill?: "full" | "half" }) {
  if (fill === "half") {
    return (
      <svg width={16} height={16} viewBox="0 0 24 24" aria-hidden="true">
        <defs>
          <linearGradient id="halfStar">
            <stop offset="50%" stopColor="#222222" />
            <stop offset="50%" stopColor="#d6d6d6" />
          </linearGradient>
        </defs>
        <path
          d="m12 2 2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 18l-5.9 3.2 1.2-6.6L2.5 9l6.6-.9Z"
          fill="url(#halfStar)"
        />
      </svg>
    );
  }
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" aria-hidden="true" fill="#222222">
      <path d="m12 2 2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 18l-5.9 3.2 1.2-6.6L2.5 9l6.6-.9Z" />
    </svg>
  );
}
