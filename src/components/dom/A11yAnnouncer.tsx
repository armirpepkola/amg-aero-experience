"use client";

import { useStore } from "@/lib/store/useStore";

export function A11yAnnouncer() {
  const currentChapter = useStore((state) => state.currentChapter);

  return (
    <div className="sr-only" aria-live="polite" aria-atomic="true">
      {currentChapter}
    </div>
  );
}