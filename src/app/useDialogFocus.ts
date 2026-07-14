"use client";

import { useEffect } from "react";

// Traps focus inside an open dialog/drawer, closes on Escape, restores focus on close,
// and locks body scroll while open. Shared across search, cart, quick-view, and mobile nav.
export function useDialogFocus(
  isOpen: boolean,
  panelRef: React.RefObject<HTMLElement | null>,
  onClose: () => void,
) {
  useEffect(() => {
    if (!isOpen) return;
    const panel = panelRef.current;
    if (!panel) return;
    const previous = document.activeElement as HTMLElement | null;
    const selector =
      "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex='-1'])";
    const focusable = Array.from(panel.querySelectorAll<HTMLElement>(selector));
    focusable[0]?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.body.classList.add("is-locked");
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("is-locked");
      previous?.focus();
    };
  }, [isOpen, onClose, panelRef]);
}
