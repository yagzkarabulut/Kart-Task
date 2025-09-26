import { useMemo } from "react";
import useStore from "../store/cardStore";

const useFilteredCards = () => {
  const { cards, filter, sortBy, sortOrder } = useStore();

  return useMemo(() => {
    let filtered =
      filter === "all"
        ? cards
        : cards.filter((card) => card.category === filter);
    return filtered.sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];
      const order = sortOrder === "asc" ? 1 : -1;
      return (aVal - bVal) * order;
    });
  }, [cards, filter, sortBy, sortOrder]);
};
export default useFilteredCards;
