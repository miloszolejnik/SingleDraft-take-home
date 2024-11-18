import { create } from "zustand";
import { ListItem } from "./api/getListData";

type State = {
  visibleCards: ListItem[];
  deletedCards: ListItem[];
};

type Actions = {
  setVisibleCards: (cards: ListItem[]) => void;
  setDeletedCard: (id: number) => void;
};

export const useCardStore = create<State & Actions>((set) => ({
  visibleCards: [],
  deletedCards: [],
  setVisibleCards: (cards) => set({ visibleCards: cards }),
  setDeletedCard: (id) =>
    set((state) => ({
      deletedCards: [
        ...state.deletedCards,
        state.visibleCards.find((card) => card.id === id) as ListItem,
      ],
    })),
}));
