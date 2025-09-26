import { create } from "zustand";
import { initialCards } from "../data/initialCards";

const getInitialCards = () => {
  const stored = localStorage.getItem("cards");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return initialCards;
    }
  }
  return initialCards;
};

const useStore = create((set, get) => ({
  cards: getInitialCards(),
  selectedCards: [],
  metric: "rating",
  reverseMetric: false,
  filter: "all",
  sortBy: "rating",
  sortOrder: "desc",
  winner: null,
  showResult: false,
  isOpen: false,

  setPanelOpen: (open) => {
    set({ isOpen: open });
  },
  togglePanel: () => set((state) => ({ isOpen: !state.isOpen })),
  snackbar: { open: false, message: "", severity: "info" },
  setCards: (cards) => {
    localStorage.setItem("cards", JSON.stringify(cards));
    set({ cards });
  },
  selectCard: (cardId) => {
    const { selectedCards } = get();
    if (selectedCards.includes(cardId)) {
      set({ selectedCards: selectedCards.filter((id) => id !== cardId) });
    } else if (selectedCards.length < 2) {
      set({ selectedCards: [...selectedCards, cardId] });
    } else {
      set({
        snackbar: {
          open: true,
          message: "En fazla 2 kart seçebilirsiniz!",
          severity: "warning",
        },
      });
    }
  },
  setMetric: (metric) => set({ metric }),
  setReverseMetric: (reverse) => set({ reverseMetric: reverse }),
  setFilter: (filter) => set({ filter }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSortOrder: (order) => set({ sortOrder: order }),
  compareCards: () => {
    const { selectedCards, cards, metric, reverseMetric } = get();
    if (selectedCards.length !== 2) return;

    const card1 = cards.find((c) => c.id === selectedCards[0]);
    const card2 = cards.find((c) => c.id === selectedCards[1]);

    const value1 = card1[metric];
    const value2 = card2[metric];

    let winner;
    if (reverseMetric) {
      winner = value1 < value2 ? card1.id : value1 > value2 ? card2.id : "draw";
    } else {
      winner = value1 > value2 ? card1.id : value1 < value2 ? card2.id : "draw";
    }
    set({ winner, showResult: true });
  },
  resetComparison: () =>
    set({ winner: null, showResult: false, selectedCards: [] }),
  closeSnackbar: () => set({ snackbar: { ...get().snackbar, open: false } }),
  showSnackbar: (message, severity = "info") =>
    set({ snackbar: { open: true, message, severity } }),
}));

export default useStore;
