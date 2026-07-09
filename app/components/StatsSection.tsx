"use client";

import { useEffect, useState } from "react";
import { ChevronDownIcon, ClockIcon } from "./icons";

type StatValues = {
  totalViews: string;
  visits: string;
  orders: string;
  revenue: string;
};

const DEFAULTS: StatValues = {
  totalViews: "5,350",
  visits: "2,712",
  orders: "344",
  revenue: "$4,716",
};

const RESET: StatValues = {
  totalViews: "0",
  visits: "0",
  orders: "0",
  revenue: "$0",
};

const STORAGE_KEY = "etsy-stats-values";

const fields: { key: keyof StatValues; label: string }[] = [
  { key: "totalViews", label: "Total Views" },
  { key: "visits", label: "Visits" },
  { key: "orders", label: "Orders" },
  { key: "revenue", label: "Revenue" },
];

export default function StatsSection() {
  const [values, setValues] = useState<StatValues>(DEFAULTS);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<StatValues>(DEFAULTS);

  // Load saved values after mount (avoids hydration mismatch)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = { ...DEFAULTS, ...JSON.parse(saved) } as StatValues;
        setValues(parsed);
        setDraft(parsed);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const openEditor = () => {
    setDraft(values);
    setEditing(true);
  };

  const applyValues = () => {
    setEditing(false);
    // Step 1: reset old numbers to zero (visible reset)
    setValues(RESET);
    // Step 2: after a short delay, show the new numbers
    window.setTimeout(() => {
      setValues(draft);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
      } catch {
        /* ignore */
      }
    }, 600);
  };

  const resetToDefaults = () => {
    setDraft(DEFAULTS);
  };

  return (
    <section className="mt-10">
      <div className="flex items-center justify-between">
        {/* Hidden trigger: double-click the "Stats" heading to edit numbers */}
        <h3
          onDoubleClick={openEditor}
          title=""
          className="cursor-default select-none text-[20px] font-semibold text-[#222] sm:text-[22px]"
        >
          Stats
        </h3>
        <a href="#" className="text-[15px] text-[#222] underline">
          View all
        </a>
      </div>

      <div className="mt-4 rounded-xl border border-[#e5e3dc] p-4 sm:p-6">
        <button className="flex items-center gap-1.5 text-[15px] text-[#222]">
          <span className="font-semibold">Date Range</span>
          <span className="text-[#595959]">This year</span>
          <ChevronDownIcon className="text-[#595959]" />
        </button>
        <div className="mt-5 grid grid-cols-2 gap-y-6 sm:grid-cols-4">
          {fields.map((field) => (
            <div key={field.key}>
              <p className="text-[15px] font-medium text-[#222]">{field.label}</p>
              <p className="mt-1 text-[24px] font-medium leading-none text-[#222] transition-all duration-300 sm:text-[30px]">
                {values[field.key]}
              </p>
              <p className="mt-2 text-[14px] text-[#595959] underline decoration-dashed underline-offset-4">
                --% YoY
              </p>
              <p className="mt-1.5 flex items-center gap-1 text-[13px] text-[#595959]">
                <ClockIcon />
                Just now
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Hidden editor modal */}
      {editing && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setEditing(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="text-[18px] font-semibold text-[#222]">
              Edit stats numbers
            </h4>
            <p className="mt-1 text-[14px] text-[#595959]">
              Enter your values. Old numbers reset first, then yours appear.
            </p>

            <div className="mt-5 space-y-4">
              {fields.map((field) => (
                <div key={field.key}>
                  <label className="mb-1 block text-[14px] font-medium text-[#222]">
                    {field.label}
                  </label>
                  <input
                    value={draft[field.key]}
                    onChange={(e) =>
                      setDraft((d) => ({ ...d, [field.key]: e.target.value }))
                    }
                    className="w-full rounded-lg border border-[#d6d4cc] px-3 py-2 text-[15px] text-[#222] outline-none focus:border-[#222]"
                    placeholder={DEFAULTS[field.key]}
                  />
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <button
                onClick={resetToDefaults}
                className="text-[14px] text-[#595959] underline hover:text-[#222]"
              >
                Reset to defaults
              </button>
              <div className="flex gap-3">
                <button
                  onClick={() => setEditing(false)}
                  className="rounded-full border border-[#d6d4cc] px-5 py-2 text-[15px] font-medium text-[#222] hover:bg-[#f4f3ee]"
                >
                  Cancel
                </button>
                <button
                  onClick={applyValues}
                  className="rounded-full bg-[#222] px-5 py-2 text-[15px] font-medium text-white hover:bg-[#000]"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
