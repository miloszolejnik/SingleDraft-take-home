import { ListItem } from "../api/getListData";

type ExpandCardFunction = (
    id: number,
    isClosed: boolean,
    setIsClosed: React.Dispatch<React.SetStateAction<boolean>>,
    setExpandedCards: (cards: ListItem[]) => void,
    expandedCards: ListItem[],
    visibleCards: ListItem[]
) => void;

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