import { FC, useState } from "react";
import { ListItem } from "../api/getListData";
import { DeleteButton, ExpandButton } from "./Buttons";
import { ChevronUpIcon } from "./icons";
import { useCardStore } from "../store";
import { removeCard } from "../utils/removeCard";

type CardProps = {
  title: ListItem["title"];
  description?: ListItem["description"];
  id: number;
};

export const Card: FC<CardProps> = ({ title, description, id }) => {

  const { setVisibleCards, visibleCards, setDeletedCard, deletedCards } = useCardStore((state) => state);

  const [isClosed, setIsClosed] = useState(true);

  return (
    <div className="border border-black px-2 py-1.5 w-96">
      <div className="flex justify-between mb-0.5">
        <h1 className="font-medium">{title}</h1>
        <div className="flex">
          <ExpandButton onClick={() => setIsClosed(!isClosed)}>
            <ChevronUpIcon />
          </ExpandButton>
          <DeleteButton onClick={() => removeCard(id, setVisibleCards, visibleCards, setDeletedCard, deletedCards)} />
        </div>
      </div>
      <div className={`text-sm transition-all duration-300 ease-in-out overflow-hidden ${isClosed ? "max-h-0 opacity-0" : "max-h-96 opacity-100"}`}>
        <p>
          {description}
        </p>
      </div>
    </div>
  );
};
