import { FC, useState } from "react";
import { ListItem } from "../api/getListData";
import { DeleteButton, ExpandButton } from "./Buttons";
import { ChevronUpIcon } from "./icons";
import { useCardStore } from "../store";
import { removeCard } from "../utils/removeCard";
import { expandCard } from "../utils/expandCard";

type CardProps = {
  title: ListItem["title"];
  description?: ListItem["description"];
  id: number;
  className?: string;
};

export const Card: FC<CardProps> = ({ title, description, id, className }) => {

  const { setVisibleCards, visibleCards, setDeletedCard, setUndeleteCard, setExpandedCards, expandedCards } = useCardStore((state) => state);

  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  return (
    <div className={`border border-black px-2 py-1.5 w-full transition-all duration-300 ease-in-out ${className}`}>
      <div className="flex justify-between mb-0.5">
        <h1 className="font-medium">{title}</h1>
        <div className="flex">
          {description ? (
            <div className="flex">
              <ExpandButton onClick={() => expandCard(id, isExpanded, setIsExpanded, setExpandedCards, expandedCards, visibleCards)}>
                <ChevronUpIcon />
              </ExpandButton>
              <DeleteButton disabled={!isExpanded} onClick={() => removeCard(id, setVisibleCards, visibleCards, setDeletedCard)} />
            </div>
          ) : (
            <div>
              <button
                disabled
                onClick={() => setUndeleteCard(id)}>
                Revert
              </button>
            </div>
          )}
        </div>
      </div>
      {description ? (
        <div className={`text-sm transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? "max-h-0 opacity-0" : "max-h-96 opacity-100"}`}>
          <p>
            {description}
          </p>
        </div>
      ) : ''}
    </div>
  );
};
