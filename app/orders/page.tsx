"use client";

import { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import ProductThumb from "./ProductThumb";
import OrderDetailPanel from "./OrderDetailPanel";
import { orderGroups, totalOrders, type Order, type OrderGroup } from "./data";
import {
  SearchIcon,
  GearIcon,
  TruckIcon,
  TagIcon,
  CompleteOrderIcon,
  ChatFilledIcon,
  KebabIcon,
  GiftIcon,
  GlobeIcon,
  ChevronDownIcon,
  PencilIcon,
  CheckIcon,
  ChatIcon,
} from "../components/icons";

const dispatchFilters = [
  "All",
  "Overdue",
  "Today",
  "Tomorrow",
  "Within a week",
  "No estimate",
] as const;

const destinationFilters = [
  "All",
  "Pakistan",
  "United States",
  "Everywhere else",
] as const;

const orderDetailFilters = [
  "Has note from buyer",
  "Marked as gift",
  "Personalised",
] as const;

export default function OrdersPage() {
  const [tab, setTab] = useState<"new" | "completed">("new");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [openOrder, setOpenOrder] = useState<Order | null>(null);
  const [dispatchFilter, setDispatchFilter] =
    useState<(typeof dispatchFilters)[number]>("All");
  const [destinationFilter, setDestinationFilter] =
    useState<(typeof destinationFilters)[number]>("All");
  const [detailFilters, setDetailFilters] = useState<Set<string>>(new Set());
  const [upgradeRequested, setUpgradeRequested] = useState(false);

  // Deep link: /orders?order=<id> opens that order's detail panel
  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("order");
    if (!id) return;
    const order = orderGroups
      .flatMap((g) => g.orders)
      .find((o) => o.id === id);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- URL is only readable on the client, after mount
    if (order) setOpenOrder(order);
  }, []);

  const visibleGroups = useMemo(() => {
    const q = query.trim().toLowerCase();

    const matches = (order: Order, group: OrderGroup) => {
      if (q) {
        const haystack = [
          order.buyer,
          order.orderNumber,
          order.deliverToName,
          order.deliverToCity,
          ...order.items.map((i) => i.title),
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (dispatchFilter === "Overdue" && group.key !== "overdue") return false;
      if (dispatchFilter === "Today" && group.key !== "today") return false;
      if (dispatchFilter === "Tomorrow") return false;
      if (dispatchFilter === "Within a week" && group.key === "later")
        return false;
      if (dispatchFilter === "No estimate") return false;
      // All current orders ship to the United States
      if (
        destinationFilter === "Pakistan" ||
        destinationFilter === "Everywhere else"
      )
        return false;
      if (detailFilters.has("Has note from buyer")) return false;
      if (detailFilters.has("Marked as gift") && !order.gift) return false;
      if (detailFilters.has("Personalised")) return false;
      if (upgradeRequested) return false;
      return true;
    };

    return orderGroups
      .map((group) => ({
        ...group,
        orders: group.orders.filter((o) => matches(o, group)),
      }))
      .filter((group) => group.orders.length > 0);
  }, [query, dispatchFilter, destinationFilter, detailFilters, upgradeRequested]);

  const toggleOrder = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectGroup = (group: OrderGroup) => {
    setSelected((prev) => {
      const next = new Set(prev);
      group.orders.forEach((o) => next.add(o.id));
      return next;
    });
  };

  const toggleDetailFilter = (label: string) => {
    setDetailFilters((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  const resetFilters = () => {
    setDispatchFilter("All");
    setDestinationFilter("All");
    setDetailFilters(new Set());
    setUpgradeRequested(false);
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-white text-[#222] font-sans lg:flex-row">
      <Sidebar active="Orders" />

      <main className="relative flex-1 overflow-y-auto">
        <div className="px-4 py-6 sm:px-6 lg:px-10">
          {/* Page header */}
          <header className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-[26px] font-medium text-[#222]">Orders</h2>
            <div className="flex flex-1 items-center justify-end gap-3">
              <div className="relative w-full max-w-[400px]">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search your orders"
                  className="w-full rounded-full border border-[#a5a5a5] py-2.5 pl-5 pr-12 text-[15px] text-[#222] placeholder-[#767676] outline-none focus:border-[#222] focus:ring-1 focus:ring-[#222]"
                />
                <button
                  aria-label="Search"
                  className="absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-[#222] hover:bg-[#f4f3ee]"
                >
                  <SearchIcon width={19} height={19} />
                </button>
              </div>
              <button
                aria-label="Order settings"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ececec] text-[#222] hover:bg-[#e0e0e0]"
              >
                <GearIcon width={20} height={20} />
              </button>
            </div>
          </header>

          <div className="mt-6 flex flex-col gap-8 xl:flex-row">
            {/* Left column */}
            <div className="min-w-0 flex-1">
              {/* EU banner */}
              <div className="flex flex-wrap items-center gap-5 pr-2">
                <TruckIcon className="shrink-0 text-[#222]" />
                <div className="min-w-0 flex-1 basis-72">
                  <h3 className="text-[16px] font-semibold text-[#222]">
                    Update your EU delivery profiles
                  </h3>
                  <p className="mt-0.5 text-[15px] leading-snug text-[#595959]">
                    Sending to the EU? Review your delivery profiles and update
                    your carrier options to Delivered Duty Paid (DDP) where
                    available.
                  </p>
                </div>
                <button className="shrink-0 rounded-full border border-[#222] px-6 py-3 text-[15px] font-medium text-[#222] hover:bg-[#f4f3ee]">
                  Learn more
                </button>
              </div>

              {/* Toolbar */}
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 rounded-full border border-[#a5a5a5] px-4 py-2.5 text-[15px] text-[#222] hover:border-[#222]">
                  <Checkbox
                    checked={selected.size > 0}
                    onChange={() => setSelected(new Set())}
                  />
                  {selected.size}
                  <ChevronDownIcon width={14} height={14} />
                </div>
                <button className="flex items-center gap-2 rounded-full border border-[#a5a5a5] px-5 py-2.5 text-[15px] font-medium text-[#222] hover:border-[#222] hover:bg-[#f4f3ee]">
                  <CompleteOrderIcon width={19} height={19} />
                  Complete order
                </button>
                <button className="flex items-center gap-2 rounded-full border border-[#d6d6d6] px-5 py-2.5 text-[15px] text-[#9b9b9b]">
                  More actions
                  <ChevronDownIcon width={14} height={14} className="text-[#9b9b9b]" />
                </button>
              </div>

              {/* Tabs */}
              <nav className="mt-6 flex items-center gap-7 border-b border-[#e5e3dc] text-[16px]">
                <button
                  onClick={() => setTab("new")}
                  className={`-mb-px border-b-2 pb-3 ${
                    tab === "new"
                      ? "border-[#222] font-semibold text-[#222]"
                      : "border-transparent text-[#595959] hover:text-[#222]"
                  }`}
                >
                  New{"  "}
                  <span className="ml-1">{totalOrders}</span>
                </button>
                <button
                  onClick={() => setTab("completed")}
                  className={`-mb-px border-b-2 pb-3 ${
                    tab === "completed"
                      ? "border-[#222] font-semibold text-[#222]"
                      : "border-transparent text-[#595959] hover:text-[#222]"
                  }`}
                >
                  Completed
                </button>
                <button
                  aria-label="Edit tabs"
                  className="-mb-px pb-3 text-[#222] hover:opacity-70"
                >
                  <PencilIcon width={18} height={18} />
                </button>
              </nav>

              {tab === "new" ? (
                <>
                  {/* Per page */}
                  <div className="mt-5 flex justify-end">
                    <button className="flex items-center gap-2 rounded-full border border-[#a5a5a5] px-5 py-2.5 text-[15px] text-[#222] hover:border-[#222]">
                      20 orders per page
                      <ChevronDownIcon width={14} height={14} />
                    </button>
                  </div>

                  {/* Order groups */}
                  {visibleGroups.length === 0 ? (
                    <p className="mt-16 text-center text-[15px] text-[#595959]">
                      No orders match your filters.
                    </p>
                  ) : (
                    <div className="mt-5 space-y-6">
                      {visibleGroups.map((group) => (
                        <section
                          key={group.label}
                          className="overflow-hidden rounded-xl border border-[#e5e3dc]"
                        >
                          <div className="flex items-center gap-3 bg-[#f3f1ea] px-5 py-3">
                            <span className="text-[15px] font-semibold text-[#222]">
                              {group.label}
                            </span>
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[13px] font-semibold text-[#222]">
                              {group.orders.length}
                            </span>
                            <button
                              onClick={() => selectGroup(group)}
                              className="text-[14px] text-[#222] underline hover:no-underline"
                            >
                              Select all
                            </button>
                          </div>
                          {group.orders.map((order, i) => (
                            <OrderCard
                              key={order.id}
                              order={order}
                              checked={selected.has(order.id)}
                              onToggle={() => toggleOrder(order.id)}
                              onOpen={() => setOpenOrder(order)}
                              divider={i !== group.orders.length - 1}
                            />
                          ))}
                        </section>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <p className="mt-16 text-center text-[15px] text-[#595959]">
                  No completed orders yet.
                </p>
              )}
            </div>

            {/* Right rail */}
            <aside className="w-full shrink-0 xl:w-[210px]">
              <button className="flex items-center gap-2 whitespace-nowrap rounded-full border border-[#a5a5a5] px-5 py-2.5 text-[15px] text-[#222] hover:border-[#222]">
                Sort by <span className="font-semibold">Dispatch by date</span>
                <ChevronDownIcon width={14} height={14} className="shrink-0" />
              </button>

              <h3 className="mt-7 text-[16px] font-semibold text-[#222]">
                Dispatch by date
              </h3>
              <div className="mt-3 space-y-2.5">
                {dispatchFilters.map((label) => (
                  <Radio
                    key={label}
                    label={label}
                    checked={dispatchFilter === label}
                    onChange={() => setDispatchFilter(label)}
                  />
                ))}
              </div>

              <h3 className="mt-7 text-[16px] font-semibold text-[#222]">
                Destination
              </h3>
              <div className="mt-3 space-y-2.5">
                {destinationFilters.map((label) => (
                  <Radio
                    key={label}
                    label={label}
                    checked={destinationFilter === label}
                    onChange={() => setDestinationFilter(label)}
                  />
                ))}
              </div>

              <h3 className="mt-7 text-[16px] font-semibold text-[#222]">
                Order details
              </h3>
              <div className="mt-3 space-y-2.5">
                {orderDetailFilters.map((label) => (
                  <label
                    key={label}
                    className="flex cursor-pointer items-center gap-3 text-[15px] text-[#222]"
                  >
                    <Checkbox
                      checked={detailFilters.has(label)}
                      onChange={() => toggleDetailFilter(label)}
                    />
                    {label}
                  </label>
                ))}
              </div>

              <h3 className="mt-7 text-[16px] font-semibold text-[#222]">
                Delivery
              </h3>
              <div className="mt-3">
                <label className="flex cursor-pointer items-center gap-3 text-[15px] text-[#222]">
                  <Checkbox
                    checked={upgradeRequested}
                    onChange={() => setUpgradeRequested(!upgradeRequested)}
                  />
                  Upgrade requested
                </label>
              </div>

              <button
                onClick={resetFilters}
                className="mt-7 rounded-full border border-[#222] px-6 py-2.5 text-[15px] font-medium text-[#222] hover:bg-[#f4f3ee]"
              >
                Reset filters
              </button>
            </aside>
          </div>

          {/* Footer */}
          <footer className="mt-14 flex flex-wrap items-center justify-between gap-y-3 border-t border-[#e5e3dc] pt-6 pb-10 text-[14px] text-[#595959]">
            <div className="flex items-center gap-2">
              <GlobeIcon className="text-[#595959]" />
              <span>Pakistan</span>
              <span className="text-[#d6d6d6]">|</span>
              <span>English (UK)</span>
              <span className="text-[#d6d6d6]">|</span>
              <span>$ (USD)</span>
            </div>
            <span>© 2026 Etsy, Inc.</span>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
              {[
                "Terms of Use",
                "Privacy",
                "Interest-based ads",
                "Local Shops",
                "Regions",
                "Help Centre",
              ].map((link) => (
                <a key={link} href="#" className="underline hover:text-[#222]">
                  {link}
                </a>
              ))}
            </div>
          </footer>
        </div>

        {/* Get Help floating button */}
        <button className="fixed bottom-4 right-4 flex items-center gap-2 rounded-full bg-[#2f2f31] px-4 py-3 text-[14px] font-medium text-white shadow-lg hover:bg-[#1f1f21] sm:bottom-6 sm:right-6 sm:px-5 sm:py-3.5 sm:text-[15px]">
          <ChatIcon />
          Get Help
        </button>
      </main>

      {openOrder && (
        <OrderDetailPanel order={openOrder} onClose={() => setOpenOrder(null)} />
      )}
    </div>
  );
}

function OrderCard({
  order,
  checked,
  onToggle,
  onOpen,
  divider,
}: {
  order: Order;
  checked: boolean;
  onToggle: () => void;
  onOpen: () => void;
  divider: boolean;
}) {
  const [addressOpen, setAddressOpen] = useState(false);

  return (
    <article
      className={`bg-white px-5 py-6 ${
        divider ? "border-b border-[#e5e3dc]" : ""
      }`}
    >
      <div className="flex flex-col gap-5 lg:flex-row">
        {/* Checkbox */}
        <div className="pt-1">
          <Checkbox checked={checked} onChange={onToggle} />
        </div>

        {/* Order info */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <button
              onClick={onOpen}
              className="text-[15px] font-semibold text-[#222] underline hover:no-underline"
            >
              {order.buyer}
            </button>
            <ChevronDownIcon width={14} height={14} className="text-[#595959]" />
          </div>
          <p className="mt-1 text-[14px]">
            <button
              onClick={onOpen}
              className="text-[#222] underline hover:no-underline"
            >
              {order.orderNumber}
            </button>{" "}
            <span className="ml-1 text-[#222]">{order.total}</span>
          </p>

          {order.coupon && (
            <div className="mt-3">
              <p className="flex items-center gap-2 text-[14px] font-medium text-[#222]">
                <TagIcon />
                {order.coupon.code} ({order.coupon.off})
              </p>
              <p className="pl-[26px] text-[14px] text-[#595959]">
                Shop coupon
              </p>
            </div>
          )}

          <div className="mt-4 space-y-4">
            {order.items.map((item) => (
              <div key={item.transactionId} className="flex gap-4">
                <ProductThumb kind={item.thumb} size={64} />
                <div className="min-w-0">
                  <p className="text-[14px] leading-snug text-[#222]">
                    {item.title}
                  </p>
                  <p className="mt-1.5 text-[14px] text-[#595959]">
                    Quantity{"  "}
                    <span className="ml-1 text-[#222]">{item.quantity}</span>
                  </p>
                  {item.colors && (
                    <p className="mt-0.5 text-[14px] text-[#595959]">
                      colors{"  "}
                      <span className="ml-1 font-semibold text-[#222]">
                        {item.colors}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dispatch / delivery */}
        <div className="w-full shrink-0 lg:w-[250px]">
          <p
            className={`text-[15px] font-semibold ${
              order.dispatchOverdue ? "text-[#c22f1b]" : "text-[#222]"
            }`}
          >
            {order.dispatchLabel}
          </p>
          <p className="mt-0.5 text-[14px] text-[#595959]">
            {order.orderedDate}
          </p>
          <p className="mt-5 text-[14px] text-[#222]">
            {order.deliveryMethod}{"  "}
            <span className="text-[#595959]">({order.deliveryPrice})</span>
          </p>
          <button
            onClick={() => setAddressOpen(!addressOpen)}
            className="mt-4 flex w-full items-center justify-between text-left"
          >
            <span className="text-[15px] font-semibold text-[#222]">
              Deliver to
            </span>
            <ChevronDownIcon
              width={16}
              height={16}
              className={`text-[#222] transition-transform ${
                addressOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {addressOpen ? (
            <div className="mt-2 space-y-0.5 text-[14px] text-[#222]">
              {order.address.map((line, i) => (
                <p key={line} className={i === 0 ? "font-semibold" : ""}>
                  {line}
                </p>
              ))}
              {order.phone && <p>{order.phone}</p>}
            </div>
          ) : (
            <div className="mt-2 text-[14px]">
              <p className="font-semibold text-[#222]">{order.deliverToName}</p>
              <p className="text-[#222]">{order.deliverToCity}</p>
            </div>
          )}
          {order.gift && (
            <p className="mt-4 flex items-center gap-2 text-[14px] text-[#222]">
              <GiftIcon className="text-[#222]" />
              Marked as gift
            </p>
          )}
        </div>

        {/* Action icons */}
        <div className="flex shrink-0 flex-row items-start gap-2 lg:flex-col lg:gap-5">
          <button
            aria-label="Complete order"
            onClick={onOpen}
            className="rounded-full p-1.5 text-[#222] hover:bg-[#f4f3ee]"
          >
            <CompleteOrderIcon />
          </button>
          <button
            aria-label="Message buyer"
            className="rounded-full p-1.5 text-[#222] hover:bg-[#f4f3ee]"
          >
            <ChatFilledIcon />
          </button>
          <button
            aria-label="More options"
            className="rounded-full p-1.5 text-[#222] hover:bg-[#f4f3ee]"
          >
            <KebabIcon />
          </button>
        </div>
      </div>
    </article>
  );
}

function Radio({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-[15px] text-[#222]">
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
      {label}
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
