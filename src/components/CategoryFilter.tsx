"use client";

import { Category, CATEGORY_LABELS, CATEGORY_ICONS } from "@/types";

interface Props {
  selected: Category | "all";
  onChange: (cat: Category | "all") => void;
}

export default function CategoryFilter({ selected, onChange }: Props) {
  const categories: Array<{ key: Category | "all"; label: string; icon: string }> = [
    { key: "all", label: "Todos", icon: "💐" },
    ...(Object.keys(CATEGORY_LABELS) as Category[]).map((k) => ({
      key: k,
      label: CATEGORY_LABELS[k],
      icon: CATEGORY_ICONS[k],
    })),
  ];

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {categories.map((c) => (
        <button
          key={c.key}
          onClick={() => onChange(c.key)}
          className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
            selected === c.key
              ? "bg-primary-500 text-white shadow-md shadow-primary-200"
              : "bg-white text-gray-600 border border-gray-200 hover:border-primary-300 hover:text-primary-600"
          }`}
        >
          <span>{c.icon}</span>
          <span>{c.label}</span>
        </button>
      ))}
    </div>
  );
}
