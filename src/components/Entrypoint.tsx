import { useEffect, useState } from "react";
import { useGetListData } from "../api/getListData";
import { Card } from "./Card";
import { Spinner } from "./Spinner";
import { useCardStore } from "../store";
import { ToggleButton } from "./Buttons";

export const Entrypoint = () => {

  const { visibleCards, setVisibleCards, deletedCards, setIsRevealed, isRevealed, expandedCards } = useCardStore((state) => state);
  const [isLoading, setIsLoading] = useState(false);
  const listQuery = useGetListData();

  useEffect(() => {
    if (listQuery.data && !listQuery.isLoading && !listQuery.isError) {
      const exclusionSet = new Set([
        ...expandedCards.map((card) => card.id),
        ...deletedCards.map((card) => card.id),
      ]);

      const newData = listQuery.data
        ?.filter((item) => item.isVisible)
        .filter((item) => !exclusionSet.has(item.id));

      if (expandedCards.length > 0) {
        newData.unshift(...expandedCards);
      }

      setVisibleCards(newData);
    }
  }, [listQuery.data, listQuery.isLoading]);

  if (listQuery.isLoading) {
    return <Spinner />;
  }

  const refetch = () => {
    listQuery.refetch();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  }
  return (
    <div className="flex w-3/4 px-32 transition-all duration-300 ease-in-out">
      {/* Left panel */}
      <div className="w-1/2 px-8">
        {/* Header */}
        <h1 className="mb-1 font-medium text-lg">My Awesome List ({visibleCards.length})</h1>
        {/* Cards */}
        <div className="flex flex-col gap-y-3">
          {visibleCards.map((card) => (
            <Card key={card.id} id={card.id} title={card.title} description={card.description} />
          ))}
        </div>
      </div>
      {/* Right panel */}
      <div className="w-1/2 px-8">
        <div className="flex items-center justify-between gap-2">
          {/* Header */}
          <h1 className="mb-1 font-medium text-lg">Deleted Cards ({deletedCards?.length})</h1>
          <div className="flex gap-4">
            <ToggleButton state={isRevealed} setState={setIsRevealed} >
              {isRevealed ? "Hide" : "Reveal"}
            </ToggleButton>
            <button
              onClick={() => refetch()}
              disabled={isLoading}
              className={`text-white text-sm transition-colors hover:bg-gray-800 disabled:bg-black/75 bg-black rounded px-3 py-1}`}
            >
              Refresh
            </button>
          </div>

        </div>
        {/* Cards */}
        <div className="flex flex-col gap-y-3">
          {deletedCards?.map((card) => (
            <Card key={card.id} id={card.id} title={card.title} className={isRevealed ? "opacity-100" : "opacity-0"} />
          ))}
        </div>
      </div>
    </div >
  );
};
