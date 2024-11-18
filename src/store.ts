import { create } from "zustand";
import { ListItem } from "./api/getListData";

type State = {
  visibleCards: ListItem[];
  deletedCards: ListItem[];
  expandedCards: ListItem[];
  isRevealed: boolean;
};

type Actions = {
  setVisibleCards: (cards: ListItem[]) => void;
  setDeletedCard: (id: number) => void;
  setExpandedCards: (cards: ListItem[]) => void;
  setIsRevealed: (isRevealed: boolean) => void;
};

export const useCardStore = create<State & Actions>((set) => ({
  visibleCards: [],
  deletedCards: [],
  expandedCards: [],
  isRevealed: false,
  setVisibleCards: (cards) => set({ visibleCards: cards }),
  setDeletedCard: (id) =>
    set((state) => ({
      deletedCards: [
        ...state.deletedCards,
        state.visibleCards.find((card) => card.id === id) as ListItem,
      ],
    })),
  setExpandedCards: (cards) => set({ expandedCards: cards }),
  setIsRevealed: (isRevealed) => set({ isRevealed }),
}));
