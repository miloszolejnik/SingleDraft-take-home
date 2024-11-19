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
  setDeletedCard: (cards: number) => void;
  setUndeleteCard: (cards: number) => void;
  setExpandedCards: (cards: ListItem[]) => void;
  setIsRevealed: (isRevealed: boolean) => void;
};

export const useCardStore = create<State & Actions>((set) => ({
  visibleCards: [],
  deletedCards: [],
  expandedCards: [],
  isRevealed: false,
  setVisibleCards: (cards) => set({ visibleCards: cards }),
  /**
   * Adds a card to the deletedCards array based on the provided card id.
   * The card is retrieved from the visibleCards array and appended to
   * the deletedCards array. Assumes that the card with the given id exists
   * in the visibleCards array.
   *
   * @param id - The unique identifier of the card to be deleted.
   */
  setDeletedCard: (id) =>
    set((state) => ({
      deletedCards: [
        ...state.deletedCards,
        state.visibleCards.find((card) => card.id === id) as ListItem,
      ],
    })),
  /**
   * Removes a card from the deletedCards array and re-adds it to the
   * visibleCards array based on the provided card id. Assumes that the
   * card with the given id exists in the deletedCards array.
   *
   * @param id - The unique identifier of the card to be undeleted.
   */
  setUndeleteCard: (id) =>
    set((state) => {
      const cardToRestore = state.deletedCards.find((card) => card.id === id);
      if (!cardToRestore) {
        return {};
      }

      return {
        deletedCards: state.deletedCards.filter((card) => card.id !== id),
        visibleCards: [...state.visibleCards, cardToRestore],
      };
    }),
  setExpandedCards: (cards) => set({ expandedCards: cards }),
  setIsRevealed: (isRevealed) => set({ isRevealed }),
}));
