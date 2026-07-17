"use client";

import { useState } from "react";
import Link from "next/link";
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
  PencilIcon,
} from "./icons";
import type { ReactNode } from "react";

type NavItem = {
  label: string;
  icon: ReactNode;
  href?: string;
  expandable?: boolean;
  badge?: number;
  newPill?: boolean;
  dot?: boolean;
};

const items: NavItem[] = [
  { label: "Search", icon: <SearchIcon /> },
  { label: "Dashboard", icon: <HomeIcon />, href: "/" },
  { label: "Listings", icon: <ListingsIcon />, href: "/listings" },
  { label: "Messages", icon: <MessagesIcon /> },
  { label: "Orders", icon: <OrdersIcon />, href: "/orders", badge: 4 },
  { label: "Etsy search visibility", icon: <VisibilityIcon /> },
  { label: "Stats", icon: <StatsIcon />, expandable: true, newPill: true },
  { label: "Customer service stats", icon: <GearIcon /> },
  { label: "Policy violations", icon: <FlagIcon /> },
  { label: "Marketing", icon: <MarketingIcon />, expandable: true, dot: true },
  { label: "Finances", icon: <FinancesIcon />, expandable: true },
  { label: "Apps", icon: <AppsIcon /> },
  { label: "Help", icon: <HelpIcon />, expandable: true },
  { label: "Settings", icon: <GearIcon />, expandable: true },
];

function SidebarContent({
  active,
  onNavigate,
}: {
  active: string;
  onNavigate?: () => void;
}) {
  return (
    <>
      {/* Nav */}
      <nav className="flex flex-col gap-0.5 px-3">
        {items.map((item) => {
          const isActive = item.label === active;
          const className = `flex items-center gap-3 rounded-lg px-3 py-2 text-left text-[15px] transition-colors ${
            isActive
              ? "bg-[#e4e2db] font-semibold text-[#222]"
              : "text-[#3c3c3c] hover:bg-[#efeee8]"
          }`;
          const content = (
            <>
              <span className="shrink-0 text-[#222]">{item.icon}</span>
              <span className="flex items-center gap-2">
                {item.label}
                {item.dot && (
                  <span className="h-[7px] w-[7px] rounded-full bg-[#2f9cbb]" />
                )}
              </span>
              <span className="ml-auto flex items-center gap-2">
                {item.newPill && (
                  <span className="rounded-full bg-[#3b4ee4] px-2.5 py-0.5 text-[12px] font-semibold text-white">
                    New
                  </span>
                )}
                {item.badge !== undefined && (
                  <span className="rounded-full bg-[#fce2c9] px-2 py-0.5 text-[13px] font-semibold text-[#7a4b00]">
                    {item.badge}
                  </span>
                )}
                {item.expandable && (
                  <ChevronDownIcon className="shrink-0 text-[#595959]" />
                )}
              </span>
            </>
          );

          return item.href ? (
            <Link
              key={item.label}
              href={item.href}
              onClick={onNavigate}
              className={className}
            >
              {content}
            </Link>
          ) : (
            <button key={item.label} onClick={onNavigate} className={className}>
              {content}
            </button>
          );
        })}
      </nav>

      {/* Sales channels */}
      <div className="mt-6 px-6">
        <h2 className="text-[15px] font-semibold text-[#222]">
          Sales channels
        </h2>
        <div className="mt-2 flex items-center gap-3">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[4px] bg-[#222] text-[13px] font-bold text-white">
            E
          </span>
          <span className="flex-1 text-[14px] leading-tight text-[#3c3c3c]">
            Etsy
            <br />
            ANZCart
          </span>
          <button
            aria-label="Edit shop"
            className="p-1 text-[#222] hover:opacity-70"
          >
            <PencilIcon width={18} height={18} />
          </button>
        </div>
      </div>

      {/* Pattern */}
      <div className="mt-5 flex items-start gap-3 px-6">
        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] bg-[#9b9b9b] text-[11px] font-bold text-white">
          P
        </span>
        <p className="text-[14px] leading-snug text-[#595959]">
          Want your own website?
          <br />
          Learn more about Pattern
        </p>
      </div>

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
            Shahzaib
          </span>
          <ChevronUpIcon className="shrink-0 text-[#595959]" />
        </button>
      </div>
    </>
  );
}

export default function Sidebar({ active = "Dashboard" }: { active?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <header className="flex shrink-0 items-center justify-between border-b border-[#e5e3dc] bg-[#faf9f5] px-4 py-3 lg:hidden">
        <h1 className="text-[18px] font-semibold leading-tight text-[#222]">
          Shop Manager
        </h1>
        <button
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="text-[#222] hover:opacity-70"
        >
          <MenuIcon width={24} height={24} />
        </button>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 flex w-[300px] max-w-[85vw] flex-col overflow-y-auto border-r border-[#e5e3dc] bg-[#faf9f5] shadow-xl">
            <div className="flex items-start justify-between px-6 pt-6 pb-4">
              <h1 className="text-[22px] font-semibold leading-tight text-[#222]">
                Shop Manager
              </h1>
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="mt-1 p-1 text-[#222] hover:opacity-70"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <SidebarContent active={active} onNavigate={() => setOpen(false)} />
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden h-screen w-[280px] shrink-0 flex-col overflow-y-auto border-r border-[#e5e3dc] bg-[#faf9f5] pb-2 lg:flex">
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <h1 className="text-[20px] font-semibold leading-tight text-[#222]">
            Shop Manager
          </h1>
          <button
            aria-label="Toggle menu"
            className="text-[#222] hover:opacity-70"
          >
            <MenuIcon width={22} height={22} />
          </button>
        </div>
        <SidebarContent active={active} />
      </aside>
    </>
  );
}
