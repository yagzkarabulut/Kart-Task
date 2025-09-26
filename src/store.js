import { create } from "zustand";
import { characters } from "./characters.js";

// basit karşılaştırma fonksiyonu
function compare(a, b, metric, reverse) {
  const va = a[metric];
  const vb = b[metric];
  if (reverse) [va, vb] = [vb, va]; // düşük kazanacaksa
  if (va > vb) return "left";
  if (vb > va) return "right";
  return "draw";
}

export const useStore = create((set, get) => ({
  characters,
  selected: [], // [id1, id2]  max 2
  metric: "power", // power | speed | hp
  reverse: false,
  rarity: "All",
  sort: "power",
  order: "desc",
  winner: null, // 'left' | 'right' | 'draw'
  winnerId: null, // kazananın id'si (draw → null)
  snack: null,

  toggleSelect(id) {
    const { selected } = get();
    if (selected.includes(id))
      return set({
        selected: selected.filter((i) => i !== id),
        winner: null,
        winnerId: null,
      });
    if (selected.length >= 2)
      return set({ snack: "En fazla 2 kart seçebilirsiniz!" });
    set({ selected: [...selected, id], winner: null, winnerId: null });
  },

  setMetric: (m) => set({ metric: m }),
  setReverse: (r) => set({ reverse: r }),
  setRarity: (r) => set({ rarity: r }),
  setSort: (key, ord) => set({ sort: key, order: ord }),
  setWinner: (w, id = null) => set({ winner: w, winnerId: id }),
  closeSnack: () => set({ snack: null }),
  reset: () => set({ selected: [], winner: null, winnerId: null, snack: null }),

  filteredChars() {
    const { characters, rarity, sort, order } = get();
    let list =
      rarity === "All"
        ? characters
        : characters.filter((c) => c.rarity === rarity);
    return [...list].sort((a, b) =>
      order === "desc" ? b[sort] - a[sort] : a[sort] - b[sort]
    );
  },
}));
