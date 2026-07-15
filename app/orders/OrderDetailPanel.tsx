"use client";

import { useEffect, useState } from "react";
import type { Order, OrderItem } from "./data";
import ProductThumb from "./ProductThumb";
import {
  ChevronDownIcon,
  ChatFilledIcon,
  NoteIcon,
  PencilIcon,
  PlusIcon,
  CloseIcon,
  BellIcon,
  TagIcon,
  QuestionCircleIcon,
  CheckIcon,
} from "../components/icons";

export default function OrderDetailPanel({
  order,
  onClose,
}: {
  order: Order;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<"details" | "earnings">("details");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Dimmed area + close button */}
      <div className="relative flex-1 bg-black/30" onClick={onClose}>
        <button
          aria-label="Close order details"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#faf9f5]/90 text-[#222] shadow ring-2 ring-[#7b9ff9] hover:bg-white"
        >
          <CloseIcon />
        </button>
      </div>

      {/* Panel */}
      <aside className="h-full w-full max-w-[860px] overflow-y-auto bg-white shadow-2xl">
        <div className="px-6 py-8 sm:px-10">
          {/* Header */}
          <h2 className="text-[26px] font-medium text-[#222]">
            Order from {order.buyer}
          </h2>
          <p
            className={`mt-1 text-[16px] font-semibold ${
              order.dispatchOverdue ? "text-[#c22f1b]" : "text-[#222]"
            }`}
          >
            {order.dispatchLabel}
          </p>

          <div className="mt-4 flex items-center gap-3">
            <button className="rounded-full bg-[#ececec] px-6 py-3 text-[15px] font-semibold text-[#222] hover:bg-[#e0e0e0]">
              Complete order
            </button>
            <button
              aria-label="More options"
              className="rounded-full px-3 py-3 text-[18px] font-bold tracking-widest text-[#222] hover:bg-[#f4f3ee]"
            >
              •••
            </button>
          </div>

          {/* Tabs */}
          <nav className="mt-7 flex gap-7 border-b border-[#e5e3dc] text-[16px]">
            <button
              onClick={() => setTab("details")}
              className={`-mb-px border-b-2 pb-3 ${
                tab === "details"
                  ? "border-[#222] font-semibold text-[#222]"
                  : "border-transparent text-[#595959] hover:text-[#222]"
              }`}
            >
              Order details
            </button>
            <button
              onClick={() => setTab("earnings")}
              className={`-mb-px border-b-2 pb-3 ${
                tab === "earnings"
                  ? "border-[#222] font-semibold text-[#222]"
                  : "border-transparent text-[#595959] hover:text-[#222]"
              }`}
            >
              Earnings
            </button>
          </nav>

          {tab === "details" ? (
            <DetailsTab order={order} />
          ) : (
            <EarningsTab order={order} />
          )}
        </div>
      </aside>
    </div>
  );
}

function DetailsTab({ order }: { order: Order }) {
  return (
    <div className="mt-6">
      {/* Meta */}
      <p className="text-[15px] text-[#222]">
        <a href="#" className="font-medium underline">
          {order.orderNumber}
        </a>{" "}
        via Etsy (
        <a href="#" className="underline">
          ANZCart
        </a>
        )
      </p>
      <p className="mt-1 text-[15px] text-[#595959]">{order.orderedFull}</p>
      <p className="mt-1 text-[15px] text-[#222]">
        {order.itemCount} {order.itemCount === 1 ? "item" : "items"},{"  "}
        <span className="font-medium">{order.total}</span>
      </p>
      <p className="mt-1 text-[15px] text-[#222]">
        Deliver to {order.deliverToCity}
      </p>

      {/* Buyer card */}
      <div className="mt-5 rounded-xl border border-[#e5e3dc] p-5">
        <div className="flex items-center gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e4e2db] text-[#8a8a8a]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="9" r="4" />
              <path d="M4 21a8 8 0 0 1 16 0Z" />
            </svg>
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <a
                href="#"
                className="flex items-center gap-1 text-[15px] font-semibold text-[#222] underline"
              >
                {order.buyer}
                <ChevronDownIcon width={14} height={14} />
              </a>
              <a href="#" className="text-[15px] text-[#222] underline">
                {order.username}
              </a>
            </div>
            <a
              href="#"
              className="mt-0.5 inline-block text-[14px] text-[#222] underline"
            >
              Order history
            </a>
          </div>
        </div>
      </div>

      {/* Messages card */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#e5e3dc] p-5">
        <span className="flex items-center gap-3 text-[15px] text-[#222]">
          <ChatFilledIcon className="shrink-0" />
          No messages about this order yet
        </span>
        <button className="flex items-center gap-2 rounded-full border border-[#222] px-5 py-2.5 text-[14px] font-medium text-[#222] hover:bg-[#f4f3ee]">
          <PencilIcon width={16} height={16} />
          Message buyer
        </button>
      </div>

      {/* Private note card */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#e5e3dc] p-5">
        <span className="flex items-center gap-3 text-[15px] text-[#222]">
          <NoteIcon className="shrink-0" />
          Only you can see this note
        </span>
        <button className="flex items-center gap-2 rounded-full border border-[#222] px-5 py-2.5 text-[14px] font-medium text-[#222] hover:bg-[#f4f3ee]">
          <PlusIcon />
          Add a private note
        </button>
      </div>

      {/* Deliver to / Selected by buyer */}
      <div className="mt-4 rounded-xl border border-[#e5e3dc] p-5">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <h3 className="text-[14px] text-[#595959]">Deliver to</h3>
            <div className="mt-2 space-y-0.5 text-[15px] text-[#222]">
              {order.address.map((line, i) => (
                <p key={line} className={i === 0 ? "font-semibold" : ""}>
                  {line}
                </p>
              ))}
              {order.phone && <p>{order.phone}</p>}
            </div>
            <p className="mt-3 flex items-center gap-1.5 text-[14px] font-medium text-[#258635]">
              <CheckIcon className="text-[#258635]" />
              USPS Verified
            </p>
          </div>
          <div>
            <h3 className="text-[14px] text-[#595959]">Selected by buyer</h3>
            <div className="mt-2 flex items-center justify-between text-[15px]">
              <span className="font-semibold text-[#222]">
                {order.deliveryMethod}
              </span>
              <span className="text-[#222]">{order.deliveryPrice}</span>
            </div>
            <div className="mt-3 space-y-3">
              {order.items.map((item) => (
                <div
                  key={item.transactionId}
                  className="flex items-center justify-between gap-3 text-[14px]"
                >
                  <span className="flex min-w-0 items-center gap-2 text-[#222]">
                    <ProductThumb kind={item.thumb} size={28} />
                    <span className="truncate">{item.title}</span>
                  </span>
                  <span className="shrink-0 text-[#595959]">
                    Qty {item.quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* DDP notice */}
      <div className="mt-4 flex flex-wrap items-center gap-4 rounded-xl border border-[#e5e3dc] p-5">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#fdf1d7] text-[#8a6d1f]">
          <BellIcon />
        </span>
        <div className="min-w-0 flex-1 basis-64">
          <h3 className="text-[15px] font-semibold text-[#222]">
            Use DDP for US deliveries
          </h3>
          <p className="mt-0.5 text-[14px] leading-snug text-[#595959]">
            With Delivered Duties Paid (DDP), buyers see the full order cost at
            checkout with no unexpected charges at delivery. You can use one of
            our recommended carriers for your region.
          </p>
        </div>
        <button className="shrink-0 rounded-full border border-[#222] px-5 py-2.5 text-[14px] font-medium text-[#222] hover:bg-[#f4f3ee]">
          Learn more
        </button>
      </div>

      {/* Items */}
      <h3 className="mt-8 text-[18px] font-semibold text-[#222]">
        {order.itemCount} {order.itemCount === 1 ? "Item" : "Items"}
      </h3>
      <div className="mt-3 rounded-xl border border-[#e5e3dc] p-5">
        <div className="grid grid-cols-[1fr_auto_auto] items-center gap-x-8 gap-y-4">
          <span className="text-[14px] font-semibold text-[#222]">Item</span>
          <span className="text-[14px] font-semibold text-[#222]">
            Quantity
          </span>
          <span className="text-right text-[14px] font-semibold text-[#222]">
            Total
          </span>
          {order.items.map((item) => (
            <ItemRow key={item.transactionId} item={item} />
          ))}
        </div>
      </div>

      {/* Receipt */}
      <h3 className="mt-8 text-[18px] font-semibold text-[#222]">
        Receipt {order.orderNumber}
      </h3>
      <div className="mt-3 rounded-xl border border-[#e5e3dc] p-5 text-[15px]">
        <div className="flex items-center justify-between">
          <span className="text-[#222]">Item total</span>
          <span className="text-[#222]">{order.receipt.itemTotal}</span>
        </div>
        {order.coupon && order.receipt.couponDiscount && (
          <div className="mt-3 flex items-start justify-between">
            <span>
              <span className="flex items-center gap-2 font-medium text-[#222]">
                <TagIcon />
                {order.coupon.code} ({order.coupon.off})
              </span>
              <span className="block pl-[26px] text-[14px] text-[#595959]">
                Shop coupon
              </span>
            </span>
            <span className="text-[#222]">{order.receipt.couponDiscount}</span>
          </div>
        )}
        <div className="mt-4 flex items-center justify-between border-t border-[#e5e3dc] pt-4">
          <span className="font-semibold text-[#222]">Subtotal</span>
          <span className="font-semibold text-[#222]">
            {order.receipt.subtotal}
          </span>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-[#e5e3dc] pt-4">
          <span className="text-[#222]">Postage price</span>
          <span className="text-[#222]">{order.receipt.postage}</span>
        </div>
        {order.receipt.salesTax && (
          <div className="mt-4 flex items-center justify-between border-t border-[#e5e3dc] pt-4">
            <span className="flex items-center gap-1.5 text-[#222]">
              <span className="underline decoration-dashed underline-offset-4">
                Sales tax
              </span>
              <QuestionCircleIcon className="text-[#595959]" />
            </span>
            <span className="text-[#222]">{order.receipt.salesTax}</span>
          </div>
        )}
        <div className="mt-4 flex items-center justify-between border-t border-[#e5e3dc] pt-4">
          <span className="text-[16px] font-semibold text-[#222]">
            Order total
          </span>
          <span className="text-[16px] font-semibold text-[#222]">
            {order.receipt.orderTotal}
          </span>
        </div>
        <p className="mt-4 text-right text-[14px] text-[#595959]">
          {order.receipt.paidOn}
        </p>
      </div>
    </div>
  );
}

function ItemRow({ item }: { item: OrderItem }) {
  return (
    <>
      <span className="flex min-w-0 items-start gap-3">
        <ProductThumb kind={item.thumb} size={40} />
        <span className="min-w-0">
          <a
            href="#"
            className="block truncate text-[15px] font-semibold text-[#222] underline"
          >
            {item.title}
          </a>
          <span className="mt-0.5 block text-[14px] text-[#595959]">
            Transaction ID: {item.transactionId}
          </span>
          {item.colors && (
            <span className="mt-0.5 block text-[14px] text-[#222]">
              <span className="font-semibold">colors:</span> {item.colors}
            </span>
          )}
        </span>
      </span>
      <span className="text-center text-[15px] text-[#222]">
        {item.quantity}
      </span>
      <span className="text-right text-[15px] text-[#222]">{item.price}</span>
    </>
  );
}

function EarningsTab({ order }: { order: Order }) {
  return (
    <div className="mt-6">
      <div className="rounded-xl border border-[#e5e3dc] p-5 text-[15px]">
        <div className="flex items-center justify-between">
          <span className="text-[#222]">Order total</span>
          <span className="text-[#222]">{order.receipt.orderTotal}</span>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-[#e5e3dc] pt-4">
          <span className="text-[#222]">Fees &amp; taxes</span>
          <span className="text-[#222]">
            Deducted when funds are available
          </span>
        </div>
        <p className="mt-4 border-t border-[#e5e3dc] pt-4 text-[14px] text-[#595959]">
          Your earnings for this order will appear in your Payment account once
          the order is complete. Transaction, processing and listing fees are
          deducted automatically.
        </p>
      </div>
    </div>
  );
}
