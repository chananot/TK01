"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { getProduct, type CartItem, type Product } from "./products";

const STORAGE_KEY = "velocity:cart:v1";

type StoredLine = { productId: string; color: string; size: string; quantity: number };

type CartContextValue = {
  items: CartItem[];
  quantity: number;
  subtotal: number;
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, color: string, size: string) => void;
  updateQuantity: (index: number, quantity: number) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

// --- External localStorage store (read via useSyncExternalStore) ---

const listeners = new Set<() => void>();
const EMPTY: StoredLine[] = [];
let cachedLines: StoredLine[] = EMPTY;
let cachedRaw: string | null = null;

function parse(raw: string | null): StoredLine[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as StoredLine[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function getSnapshot(): StoredLine[] {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  // Keep a stable reference while the underlying string is unchanged, so
  // useSyncExternalStore doesn't see a new array every render.
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedLines = raw ? parse(raw) : EMPTY;
  }
  return cachedLines;
}

// Must return a stable reference (same array every call) or React loops.
function getServerSnapshot(): StoredLine[] {
  return EMPTY;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function writeLines(lines: StoredLine[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  } catch {
    /* storage full or unavailable: still notify so in-memory state updates */
  }
  cachedRaw = window.localStorage.getItem(STORAGE_KEY);
  cachedLines = lines;
  listeners.forEach((listener) => listener());
}

function hydrate(lines: StoredLine[]): CartItem[] {
  return lines
    .map((line) => {
      const product = getProduct(line.productId);
      if (!product) return null;
      return { product, color: line.color, size: line.size, quantity: line.quantity };
    })
    .filter((item): item is CartItem => item !== null);
}

// --- Provider ---

export function CartProvider({ children }: { children: React.ReactNode }) {
  const lines = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [cartOpen, setCartOpen] = useState(false);

  const items = useMemo(() => hydrate(lines), [lines]);

  const addItem = useCallback((product: Product, color: string, size: string) => {
    const current = parse(window.localStorage.getItem(STORAGE_KEY));
    const idx = current.findIndex(
      (line) => line.productId === product.id && line.size === size && line.color === color,
    );
    const next =
      idx >= 0
        ? current.map((line, i) => (i === idx ? { ...line, quantity: line.quantity + 1 } : line))
        : [...current, { productId: product.id, color, size, quantity: 1 }];
    writeLines(next);
    setCartOpen(true);
  }, []);

  const updateQuantity = useCallback((index: number, quantity: number) => {
    const current = parse(window.localStorage.getItem(STORAGE_KEY));
    const next = current.flatMap((line, i) =>
      i === index ? (quantity > 0 ? [{ ...line, quantity }] : []) : [line],
    );
    writeLines(next);
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const quantity = items.reduce((total, item) => total + item.quantity, 0);
    const subtotal = items.reduce((total, item) => total + item.product.price * item.quantity, 0);
    return {
      items,
      quantity,
      subtotal,
      cartOpen,
      openCart: () => setCartOpen(true),
      closeCart: () => setCartOpen(false),
      addItem,
      updateQuantity,
    };
  }, [items, cartOpen, addItem, updateQuantity]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
