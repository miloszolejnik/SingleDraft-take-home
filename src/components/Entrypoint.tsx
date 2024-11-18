import { useEffect } from "react";
import { useGetListData } from "../api/getListData";
import { Card } from "./Card";
import { Spinner } from "./Spinner";
import { useCardStore } from "../store";

export const Entrypoint = () => {

  const { visibleCards, setVisibleCards, deletedCards, setIsRevealed, isRevealed } = useCardStore((state) => state);

  const listQuery = useGetListData();


  useEffect(() => {
    if (listQuery.data && !listQuery.isLoading && !listQuery.isError) {
      setVisibleCards(listQuery.data?.filter((item) => item.isVisible) ?? []);
    }

  }, [listQuery.data, listQuery.isLoading]);

  if (listQuery.isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex gap-x-16">
      <div className="w-full max-w-xl">
        <h1 className="mb-1 font-medium text-lg">My Awesome List ({visibleCards.length})</h1>
        <div className="flex flex-col gap-y-3">
          {visibleCards.map((card) => (
            <Card key={card.id} id={card.id} title={card.title} description={card.description} />
          ))}
        </div>
      </div>
      <div className="w-full max-w-xl">
        <div className="flex items-center justify-between gap-2">
          <h1 className="mb-1 font-medium text-lg">Deleted Cards ({deletedCards?.length})</h1>
          <button
            className="text-white text-sm transition-colors hover:bg-gray-800 disabled:bg-black/75 bg-black rounded px-3 py-1"
            onClick={() => setIsRevealed(!isRevealed)}
          >
            {isRevealed ? "Reveal" : "Hide"}
          </button>
          <button
            disabled
            className="text-white text-sm transition-colors hover:bg-gray-800 disabled:bg-black/75 bg-black rounded px-3 py-1"
          >
            Refresh
          </button>
        </div>
        <div className="flex flex-col gap-y-3">
          {deletedCards?.map((card) => (
            <Card key={card.id} id={card.id} title={card.title} className={isRevealed ? "opacity-100" : "opacity-0"} />
          ))}
        </div>
      </div>
    </div >
  );
};
