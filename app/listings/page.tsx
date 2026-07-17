"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Sidebar from "../components/Sidebar";
import { listings, type Listing } from "./data";
import {
  SearchIcon,
  PlusIcon,
  ChevronDownIcon,
  CheckIcon,
  ChatIcon,
  CogIcon,
  GridViewIcon,
  ListViewIcon,
  StarFilledIcon,
  StarOutlineIcon,
} from "../components/icons";

const statusFilters = [
  { label: "Active", count: 34 },
  { label: "Draft", count: 0 },
  { label: "Expired", count: 0 },
  { label: "Sold Out", count: 0 },
  { label: "Inactive", count: 28 },
] as const;

const videoFilters = [
  { label: "All", count: 34 },
  { label: "With video", count: 2 },
  { label: "Without video", count: 32 },
] as const;

export default function ListingsPage() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [starred, setStarred] = useState<Set<string>>(
    new Set(listings.filter((l) => l.featured).map((l) => l.id))
  );
  const [status, setStatus] =
    useState<(typeof statusFilters)[number]["label"]>("Active");
  const [videoFilter, setVideoFilter] =
    useState<(typeof videoFilters)[number]["label"]>("All");
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [statsOn, setStatsOn] = useState(true);
  const [view, setView] = useState<"grid" | "list">("grid");

  const visible = useMemo(() => {
    if (status !== "Active") return [];
    const q = query.trim().toLowerCase();
    return listings.filter((l) => {
      if (q && !l.title.toLowerCase().includes(q)) return false;
      if (videoFilter === "With video" && !l.hasVideo) return false;
      if (videoFilter === "Without video" && l.hasVideo) return false;
      if (featuredOnly && !starred.has(l.id)) return false;
      return true;
    });
  }, [query, status, videoFilter, featuredOnly, starred]);

  const toggleSelected = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleStarred = (id: string) => {
    setStarred((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-white text-[#222] font-sans lg:flex-row">
      <Sidebar active="Listings" />

      <main className="relative flex-1 overflow-y-auto">
        <div className="px-4 py-6 sm:px-6 lg:px-10">
          {/* Page header */}
          <header className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-[26px] font-medium text-[#222]">Listings</h2>
            <div className="flex flex-1 flex-wrap items-center justify-end gap-4">
              <div className="relative w-full max-w-[340px]">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by title, tag, or SKU"
                  className="w-full rounded-full border border-[#a5a5a5] py-2.5 pl-5 pr-12 text-[15px] text-[#222] placeholder-[#767676] outline-none focus:border-[#222] focus:ring-1 focus:ring-[#222]"
                />
                <button
                  aria-label="Search"
                  className="absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-[#222] hover:bg-[#f4f3ee]"
                >
                  <SearchIcon width={19} height={19} />
                </button>
              </div>
              <button className="flex items-center gap-1.5 text-[15px] font-medium text-[#222] hover:underline">
                Get free credits
                <ChevronDownIcon width={14} height={14} />
              </button>
              <button className="flex items-center gap-2 rounded-full bg-[#222] px-5 py-3 text-[15px] font-medium text-white hover:bg-black">
                <PlusIcon className="text-white" />
                Add a listing
              </button>
            </div>
          </header>

          <div className="mt-6 flex flex-col gap-8 xl:flex-row">
            {/* Left column */}
            <div className="min-w-0 flex-1">
              {/* Toolbar */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 rounded-full border border-[#a5a5a5] px-4 py-2.5 text-[15px] text-[#222] hover:border-[#222]">
                  <Checkbox
                    checked={selected.size > 0}
                    onChange={() =>
                      setSelected(
                        selected.size > 0
                          ? new Set()
                          : new Set(visible.map((l) => l.id))
                      )
                    }
                  />
                  <ChevronDownIcon width={14} height={14} />
                </div>
                {["Renew", "Deactivate", "Delete"].map((label) => (
                  <button
                    key={label}
                    onClick={() => setSelected(new Set())}
                    className={`rounded-full border px-5 py-2.5 text-[15px] ${
                      selected.size > 0
                        ? "border-[#a5a5a5] text-[#222] hover:border-[#222] hover:bg-[#f4f3ee]"
                        : "border-[#d6d6d6] text-[#9b9b9b]"
                    }`}
                  >
                    {label}
                  </button>
                ))}
                <button
                  className={`flex items-center gap-2 rounded-full border px-5 py-2.5 text-[15px] ${
                    selected.size > 0
                      ? "border-[#a5a5a5] text-[#222] hover:border-[#222] hover:bg-[#f4f3ee]"
                      : "border-[#d6d6d6] text-[#9b9b9b]"
                  }`}
                >
                  Editing options
                  <ChevronDownIcon
                    width={14}
                    height={14}
                    className={selected.size > 0 ? "" : "text-[#9b9b9b]"}
                  />
                </button>
              </div>

              {/* Listings */}
              {visible.length === 0 ? (
                <p className="mt-16 text-center text-[15px] text-[#595959]">
                  {status === "Active"
                    ? "No listings match your filters."
                    : `No ${status.toLowerCase()} listings.`}
                </p>
              ) : view === "grid" ? (
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 min-[1750px]:grid-cols-5">
                  {visible.map((listing) => (
                    <ListingCard
                      key={listing.id}
                      listing={listing}
                      statsOn={statsOn}
                      checked={selected.has(listing.id)}
                      starred={starred.has(listing.id)}
                      onToggle={() => toggleSelected(listing.id)}
                      onStar={() => toggleStarred(listing.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="mt-6 overflow-hidden rounded-xl border border-[#e5e3dc]">
                  {visible.map((listing, i) => (
                    <ListingRow
                      key={listing.id}
                      listing={listing}
                      statsOn={statsOn}
                      checked={selected.has(listing.id)}
                      starred={starred.has(listing.id)}
                      onToggle={() => toggleSelected(listing.id)}
                      onStar={() => toggleStarred(listing.id)}
                      divider={i !== visible.length - 1}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Right rail */}
            <aside className="w-full shrink-0 xl:w-[220px]">
              <button className="w-full rounded-full border border-[#222] px-6 py-3 text-[15px] font-medium text-[#222] hover:bg-[#f4f3ee]">
                Quick edit
              </button>

              {/* Stats toggle + view switch */}
              <div className="mt-6 flex items-center justify-between">
                <label className="flex cursor-pointer items-center gap-3">
                  <span className="text-[15px] font-semibold text-[#222]">
                    Stats
                  </span>
                  <button
                    role="switch"
                    aria-checked={statsOn}
                    aria-label="Show stats"
                    onClick={() => setStatsOn(!statsOn)}
                    className={`relative h-6 w-11 rounded-full transition-colors ${
                      statsOn ? "bg-[#222]" : "bg-[#c9c7c0]"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${
                        statsOn ? "left-[22px]" : "left-0.5"
                      }`}
                    />
                  </button>
                </label>
                <div className="flex overflow-hidden rounded-lg border border-[#222]">
                  <button
                    aria-label="Grid view"
                    onClick={() => setView("grid")}
                    className={`flex h-9 w-10 items-center justify-center ${
                      view === "grid"
                        ? "bg-[#222] text-white"
                        : "bg-white text-[#222] hover:bg-[#f4f3ee]"
                    }`}
                  >
                    <GridViewIcon />
                  </button>
                  <button
                    aria-label="List view"
                    onClick={() => setView("list")}
                    className={`flex h-9 w-10 items-center justify-center ${
                      view === "list"
                        ? "bg-[#222] text-white"
                        : "bg-white text-[#222] hover:bg-[#f4f3ee]"
                    }`}
                  >
                    <ListViewIcon />
                  </button>
                </div>
              </div>

              {/* Sort */}
              <h3 className="mt-6 text-[15px] font-semibold text-[#222]">
                Sort
              </h3>
              <FakeSelect className="mt-2" value="Expiration: latest first" />

              {/* Listing status */}
              <h3 className="mt-7 text-[16px] font-semibold text-[#222]">
                Listing status
              </h3>
              <div className="mt-3 space-y-2.5">
                {statusFilters.map((s) => (
                  <Radio
                    key={s.label}
                    checked={status === s.label}
                    onChange={() => setStatus(s.label)}
                    muted={s.count === 0}
                  >
                    {s.label}{" "}
                    <span className="ml-1 text-[13px]">{s.count}</span>
                  </Radio>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between">
                <label className="flex cursor-pointer items-center gap-3 text-[15px] text-[#222]">
                  <Checkbox
                    checked={featuredOnly}
                    onChange={() => setFeaturedOnly(!featuredOnly)}
                  />
                  Featured listings
                </label>
                <ManageLink />
              </div>

              {/* Sections */}
              <div className="mt-7 flex items-center justify-between">
                <h3 className="text-[16px] font-semibold text-[#222]">
                  Sections
                </h3>
                <ManageLink />
              </div>
              <FakeSelect className="mt-2" value="All" />

              {/* Shipping profiles */}
              <div className="mt-7 flex items-center justify-between">
                <h3 className="text-[16px] font-semibold text-[#222]">
                  Shipping profiles
                </h3>
                <ManageLink />
              </div>
              <FakeSelect className="mt-2" value="All" />

              {/* Return & exchange policies */}
              <h3 className="mt-7 text-[16px] font-semibold leading-snug text-[#222]">
                Return &amp; exchange policies
              </h3>
              <div className="mt-1 flex justify-end">
                <ManageLink />
              </div>
              <FakeSelect className="mt-1" value="All" />

              {/* Production partners */}
              <h3 className="mt-7 text-[16px] font-semibold text-[#222]">
                Production partners
              </h3>
              <a
                href="#"
                className="mt-2 inline-block text-[14px] text-[#222] underline hover:no-underline"
              >
                Add production partner
              </a>

              {/* Listing videos */}
              <h3 className="mt-7 text-[16px] font-semibold text-[#222]">
                Listing videos
              </h3>
              <div className="mt-3 space-y-2.5">
                {videoFilters.map((v) => (
                  <Radio
                    key={v.label}
                    checked={videoFilter === v.label}
                    onChange={() => setVideoFilter(v.label)}
                  >
                    {v.label}{" "}
                    <span className="ml-1 text-[13px]">{v.count}</span>
                  </Radio>
                ))}
              </div>
            </aside>
          </div>
        </div>

        {/* Get Help floating button */}
        <button className="fixed bottom-4 right-4 flex items-center gap-2 rounded-full bg-[#2f2f31] px-4 py-3 text-[14px] font-medium text-white shadow-lg hover:bg-[#1f1f21] sm:bottom-6 sm:right-6 sm:px-5 sm:py-3.5 sm:text-[15px]">
          <ChatIcon />
          Get Help
        </button>
      </main>
    </div>
  );
}

function StatsBlock({ listing }: { listing: Listing }) {
  return (
    <div className="border-t border-[#e5e3dc] px-4 py-3">
      <p className="text-[11px] font-semibold tracking-wide text-[#222]">
        LAST 30 DAYS
      </p>
      <p className="mt-0.5 text-[13px] text-[#595959]">
        {listing.visits30} visits{" "}
        <span className="mx-1 text-[#d6d6d6]">|</span> {listing.favorites30}{" "}
        favorites
      </p>
      <p className="mt-2.5 text-[11px] font-semibold tracking-wide text-[#222]">
        ALL TIME
      </p>
      <p className="mt-0.5 text-[13px] text-[#595959]">
        {listing.sales} {listing.sales === 1 ? "sale" : "sales"}{" "}
        <span className="mx-1 text-[#d6d6d6]">|</span> {listing.revenue}{" "}
        revenue
      </p>
      <p className="text-[13px] text-[#595959]">
        {listing.renewals} {listing.renewals === 1 ? "renewal" : "renewals"}
      </p>
    </div>
  );
}

function CardFooter({
  checked,
  starred,
  onToggle,
  onStar,
}: {
  checked: boolean;
  starred: boolean;
  onToggle: () => void;
  onStar: () => void;
}) {
  return (
    <div className="flex items-center justify-between border-t border-[#e5e3dc] px-4 py-2.5">
      <Checkbox checked={checked} onChange={onToggle} />
      <button
        aria-label={starred ? "Unfeature listing" : "Feature listing"}
        onClick={onStar}
        className="rounded-full p-1 hover:bg-[#f4f3ee]"
      >
        {starred ? (
          <StarFilledIcon className="text-[#f2a900]" />
        ) : (
          <StarOutlineIcon className="text-[#222]" />
        )}
      </button>
      <button
        aria-label="Listing options"
        className="flex items-center gap-0.5 rounded-full p-1 text-[#222] hover:bg-[#f4f3ee]"
      >
        <CogIcon width={19} height={19} />
        <ChevronDownIcon width={12} height={12} />
      </button>
    </div>
  );
}

function ListingCard({
  listing,
  statsOn,
  checked,
  starred,
  onToggle,
  onStar,
}: {
  listing: Listing;
  statsOn: boolean;
  checked: boolean;
  starred: boolean;
  onToggle: () => void;
  onStar: () => void;
}) {
  return (
    <article className="overflow-hidden rounded-lg border border-[#e5e3dc] bg-white">
      <div className="relative aspect-[4/3]">
        <Image
          src={listing.image}
          alt={listing.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover"
        />
        {listing.badge && (
          <span className="absolute bottom-2 left-2 rounded bg-white px-2 py-0.5 text-[12px] font-medium text-[#222] shadow-sm">
            {listing.badge}
          </span>
        )}
      </div>
      <div className="px-4 pb-3 pt-3">
        <h3 className="truncate text-[15px] font-semibold text-[#222]">
          <a href="#" className="hover:underline">
            {listing.title}
          </a>
        </h3>
        <p className="mt-1 text-[13px] text-[#595959]">
          {listing.stock} in stock
        </p>
        <p className="mt-0.5 text-[14px] text-[#222]">{listing.price}</p>
        <p className="mt-0.5 text-[13px] text-[#595959]">
          Auto-renews {listing.renewDate}
        </p>
      </div>
      {statsOn && <StatsBlock listing={listing} />}
      <CardFooter
        checked={checked}
        starred={starred}
        onToggle={onToggle}
        onStar={onStar}
      />
    </article>
  );
}

function ListingRow({
  listing,
  statsOn,
  checked,
  starred,
  onToggle,
  onStar,
  divider,
}: {
  listing: Listing;
  statsOn: boolean;
  checked: boolean;
  starred: boolean;
  onToggle: () => void;
  onStar: () => void;
  divider: boolean;
}) {
  return (
    <article
      className={`flex flex-wrap items-center gap-4 bg-white px-4 py-4 ${
        divider ? "border-b border-[#e5e3dc]" : ""
      }`}
    >
      <Checkbox checked={checked} onChange={onToggle} />
      <span className="relative block h-16 w-[85px] shrink-0 overflow-hidden rounded-md">
        <Image
          src={listing.image}
          alt={listing.title}
          fill
          sizes="85px"
          className="object-cover"
        />
        {listing.badge && (
          <span className="absolute bottom-1 left-1 rounded bg-white px-1.5 py-px text-[10px] font-medium text-[#222] shadow-sm">
            {listing.badge}
          </span>
        )}
      </span>
      <div className="min-w-0 flex-1 basis-56">
        <h3 className="truncate text-[15px] font-semibold text-[#222]">
          <a href="#" className="hover:underline">
            {listing.title}
          </a>
        </h3>
        <p className="mt-0.5 text-[13px] text-[#595959]">
          {listing.stock} in stock <span className="mx-1 text-[#d6d6d6]">|</span>
          <span className="ml-1 text-[#222]">{listing.price}</span>
        </p>
        <p className="mt-0.5 text-[13px] text-[#595959]">
          Auto-renews {listing.renewDate}
        </p>
      </div>
      {statsOn && (
        <div className="hidden shrink-0 text-[13px] text-[#595959] md:block md:w-[200px]">
          <p>
            <span className="font-semibold text-[#222]">Last 30 days:</span>{" "}
            {listing.visits30} visits, {listing.favorites30} favorites
          </p>
          <p className="mt-0.5">
            <span className="font-semibold text-[#222]">All time:</span>{" "}
            {listing.sales} {listing.sales === 1 ? "sale" : "sales"},{" "}
            {listing.revenue}
          </p>
        </div>
      )}
      <div className="flex shrink-0 items-center gap-2">
        <button
          aria-label={starred ? "Unfeature listing" : "Feature listing"}
          onClick={onStar}
          className="rounded-full p-1 hover:bg-[#f4f3ee]"
        >
          {starred ? (
            <StarFilledIcon className="text-[#f2a900]" />
          ) : (
            <StarOutlineIcon className="text-[#222]" />
          )}
        </button>
        <button
          aria-label="Listing options"
          className="flex items-center gap-0.5 rounded-full p-1 text-[#222] hover:bg-[#f4f3ee]"
        >
          <CogIcon width={19} height={19} />
          <ChevronDownIcon width={12} height={12} />
        </button>
      </div>
    </article>
  );
}

function ManageLink() {
  return (
    <a
      href="#"
      className="text-[13px] text-[#595959] underline hover:text-[#222]"
    >
      Manage
    </a>
  );
}

function FakeSelect({
  value,
  className = "",
}: {
  value: string;
  className?: string;
}) {
  return (
    <button
      className={`flex w-full items-center justify-between rounded-md border border-[#c9c7c0] bg-white px-3 py-2.5 text-[14px] text-[#767676] hover:border-[#a5a5a5] ${className}`}
    >
      <span className="truncate">{value}</span>
      <ChevronDownIcon width={14} height={14} className="shrink-0 text-[#767676]" />
    </button>
  );
}

function Radio({
  checked,
  onChange,
  muted = false,
  children,
}: {
  checked: boolean;
  onChange: () => void;
  muted?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label
      className={`flex cursor-pointer items-center gap-3 text-[15px] ${
        muted && !checked ? "text-[#767676]" : "text-[#222]"
      }`}
    >
      <input
        type="radio"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span
        aria-hidden="true"
        className={`h-5 w-5 shrink-0 rounded-full ${
          checked ? "border-[6px] border-[#222]" : "border border-[#767676]"
        }`}
      />
      <span>{children}</span>
    </label>
  );
}

function Checkbox({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <span className="relative inline-flex">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        onClick={(e) => e.stopPropagation()}
        className="peer h-5 w-5 shrink-0 cursor-pointer appearance-none rounded-[4px] border border-[#767676] checked:border-[#222] checked:bg-[#222]"
      />
      {checked && (
        <CheckIcon
          width={13}
          height={13}
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white"
        />
      )}
    </span>
  );
}
