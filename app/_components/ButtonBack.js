"use client";

import { ArrowLeft } from "@boxicons/react";

export default function BackButton() {
  return (
    <button
      onClick={() => window.history.back()}
      className="flex h-10 items-center justify-center gap-2 rounded-lg border border-steel px-5 font-sans text-sm font-medium text-light-ink transition-colors hover:bg-steel focus:outline-none focus:ring-2 focus:ring-iron-200"
    >
      <ArrowLeft className="size-4" />
      Go back
    </button>
  );
}
