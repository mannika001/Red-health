
"use client";

import { useState } from "react";

type CommentsHeaderProps = {
  totalComments: number;
  onSortChange?: (sort: "newest" | "oldest") => void;
};

export default function CommentsHeader({
  totalComments,
  onSortChange,
}: CommentsHeaderProps) {
  const [sort, setSort] = useState<"newest" | "oldest">("newest");

  const handleSort = (value: "newest" | "oldest") => {
    console.log("value",value)
    setSort(value);
    onSortChange?.(value);
  };

  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold text-foreground">
        Comments ({totalComments})
      </h2>

      <div className="flex gap-2">
    
        <button
          onClick={() => handleSort("newest")}
          className={`flex items-center gap-2 h-9 rounded-md px-3 text-sm font-medium transition-colors ${
            sort === "oldest"
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          Newest
        </button>

        <button
          onClick={() => handleSort("oldest")}
          className={`flex items-center gap-2 h-9 rounded-md px-3 text-sm font-medium transition-colors ${
            sort === "newest"
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8 2v4" />
            <path d="M16 2v4" />
            <rect width="18" height="18" x="3" y="4" rx="2" />
            <path d="M3 10h18" />
          </svg>
          Oldest
        </button>
      </div>
    </div>
  );
}
