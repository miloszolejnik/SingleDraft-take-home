import { ListItem } from "../api/getListData";

type RemoveCardFunction = (
    id: number,
    setVisibleCards: (cards: ListItem[]) => void,
    visibleCards: ListItem[],
    setDeletedCard: (id: number) => void,
) => void;
/**
 * Removes a card from the visibleCards array and adds it to the deletedCards array.
 *
 * @param id - The unique identifier of the card to be removed.
 * @param setVisibleCards - Function to update the visibleCards state.
 * @param visibleCards - Array of currently visible cards.
 * @param setDeletedCard - Function to add the card to the deletedCards state.
 */
export const removeCard: RemoveCardFunction = (id, setVisibleCards, visibleCards, setDeletedCard) => {
    setDeletedCard(id);
    setVisibleCards(visibleCards.filter((card) => card.id !== id));
    return
}