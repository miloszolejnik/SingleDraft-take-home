import { ListItem } from "../api/getListData";

type RemoveCardFunction = (
    id: number,
    setVisibleCards: (cards: ListItem[]) => void,
    visibleCards: ListItem[],
    setDeletedCard: (id: number) => void,
    deletedCards: ListItem[]
) => void;
export const removeCard: RemoveCardFunction = (id, setVisibleCards, visibleCards, setDeletedCard, deletedCards) => {
    setDeletedCard(id);
    setVisibleCards(visibleCards.filter((card) => card.id !== id));
    console.log(deletedCards)
    return
}