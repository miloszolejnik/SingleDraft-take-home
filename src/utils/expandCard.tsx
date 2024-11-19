import { ListItem } from "../api/getListData";

type ExpandCardFunction = (
    id: number,
    isClosed: boolean,
    setIsClosed: React.Dispatch<React.SetStateAction<boolean>>,
    setExpandedCards: (cards: ListItem[]) => void,
    expandedCards: ListItem[],
    visibleCards: ListItem[]
) => void;

/**
 * Toggles the expansion state of a card. If the card is currently closed, it opens it 
 * and adds it to the `expandedCards` list. If the card is open, it closes it and 
 * removes it from the `expandedCards` list.
 * 
 * @param id - The unique identifier of the card to be expanded or collapsed.
 * @param isClosed - Current state indicating if the card is closed.
 * @param setIsClosed - Function to update the closed state of the card.
 * @param setExpandedCards - Function to update the list of expanded cards.
 * @param expandedCards - The current list of expanded cards.
 * @param visibleCards - The list of currently visible cards used to find the card by id.
 */
export const expandCard: ExpandCardFunction = (id, isClosed, setIsClosed, setExpandedCards, expandedCards, visibleCards) => {
    if (isClosed) {
        setIsClosed(false);
        setExpandedCards([...expandedCards, visibleCards.find((card) => card.id === id) as ListItem]);
        return
    }
    setIsClosed(!isClosed);
    setExpandedCards([...expandedCards.filter((card) => card.id !== id)]);
    return
}