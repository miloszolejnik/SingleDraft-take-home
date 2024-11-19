import { ListItem } from "../api/getListData";

type RemoveCardFunction = (
    id: number,
    setVisibleCards: (cards: ListItem[]) => void,
    visibleCards: ListItem[],
    setDeletedCard: (id: number) => void,
) => void;


/**
 * Removes a card from the visibleCards array and adds it to the deletedCards list.
 * This is done by utilizing the setDeletedCard function to append the card with
 * the specified id to the deletedCards list and then updating the visibleCards list
 * by filtering out the card with the given id.
 *
 * @param id - The unique identifier of the card to be removed.
 * @param setVisibleCards - Function to update the list of visible cards.
 * @param visibleCards - The current list of visible cards.
 * @param setDeletedCard - Function to add the card to the deleted cards list.
 */
export const removeCard: RemoveCardFunction = (id, setVisibleCards, visibleCards, setDeletedCard) => {
    setDeletedCard(id);
    setVisibleCards(visibleCards.filter((card) => card.id !== id));
    return
}