import {
  SearchIcon,
  HomeIcon,
  ListingsIcon,
  MessagesIcon,
  OrdersIcon,
  VisibilityIcon,
  StatsIcon,
  GearIcon,
  FlagIcon,
  MarketingIcon,
  FinancesIcon,
  AppsIcon,
  HelpIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MenuIcon,
} from "./icons";
import type { ReactNode } from "react";

type NavItem = {
  label: string;
  icon: ReactNode;
  active?: boolean;
  expandable?: boolean;
};

const items: NavItem[] = [
  { label: "Search", icon: <SearchIcon /> },
  { label: "Dashboard", icon: <HomeIcon />, active: true },
  { label: "Listings", icon: <ListingsIcon /> },
  { label: "Messages", icon: <MessagesIcon /> },
  { label: "Orders", icon: <OrdersIcon /> },
  { label: "Etsy search visibility", icon: <VisibilityIcon /> },
  { label: "Stats", icon: <StatsIcon />, expandable: true },
  { label: "Customer service stats", icon: <GearIcon /> },
  { label: "Policy violations", icon: <FlagIcon /> },
  { label: "Marketing", icon: <MarketingIcon />, expandable: true },
  { label: "Finances", icon: <FinancesIcon />, expandable: true },
  { label: "Apps", icon: <AppsIcon /> },
  { label: "Help", icon: <HelpIcon />, expandable: true },
  { label: "Settings", icon: <GearIcon />, expandable: true },
];

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-[316px] shrink-0 flex-col overflow-y-auto border-r border-[#e5e3dc] bg-[#faf9f5]">
      {/* Header */}
      <div className="flex items-start justify-between px-6 pt-6 pb-4">
        <div>
          <h1 className="text-[22px] font-semibold leading-tight text-[#222]">
            Shop Manager
          </h1>
          <p className="text-[15px] text-[#595959]">Etsy Plus</p>
        </div>
        <button
          aria-label="Toggle menu"
          className="mt-1 text-[#222] hover:opacity-70"
        >
          <MenuIcon width={22} height={22} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-0.5 px-3">
        {items.map((item) => (
          <button
            key={item.label}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-left text-[15px] transition-colors ${
              item.active
                ? "bg-[#e4e2db] font-semibold text-[#222]"
                : "text-[#3c3c3c] hover:bg-[#efeee8]"
            }`}
          >
            <span className="shrink-0 text-[#222]">{item.icon}</span>
            <span className="flex-1">{item.label}</span>
            {item.expandable && (
              <ChevronDownIcon className="shrink-0 text-[#595959]" />
            )}
          </button>
        ))}
      </nav>

      {/* Profile */}
      <div className="mt-auto border-t border-[#e5e3dc] px-3 py-3">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 hover:bg-[#efeee8]">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#d9d7cf] text-[#595959]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="9" r="4" />
              <path d="M4 21a8 8 0 0 1 16 0Z" />
            </svg>
          </span>
          <span className="flex-1 text-left text-[15px] font-medium text-[#222]">
            Akbar
          </span>
          <ChevronUpIcon className="shrink-0 text-[#595959]" />
        </button>
      </div>
    </aside>
  );
}
