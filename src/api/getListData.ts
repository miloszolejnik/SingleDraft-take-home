import { useQuery } from "@tanstack/react-query";
import mockJson from "./mock.json";

export type ListItem = {
  id: number;
  title: string;
  description: string;
  isVisible: boolean;
};

export type DeletedListItem = Omit<ListItem, "description">;

/**
 * Fetches the list of cards from a mock API.
 *
 * Returns a list of items with an additional "isVisible" property.
 *
 * @returns {UseQueryResult<ListItem[]>}
 */
export const useGetListData = () => {
  const query = useQuery({
    queryKey: ["list"],
    queryFn: async () => {
      await sleep(1000);

      /**
        Not sure if this is part of the refactor that is expected
        Let me know if I was supposed to delete that
      
        if (getRandom() > 85) {
          console.error("An unexpected error occurred!");
          throw new Error("👀");
      */

      const mockData = mockJson as Omit<ListItem, "isVisible">[];

      return shuffleArray(mockData).map((item) => {
        return { ...item, isVisible: getRandom() > 50 ? true : false };
      });
    },
  });

  return query;
};

const getRandom = () => Math.floor(Math.random() * 100);

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const shuffleArray = <T>(array: T[]): T[] => {
  for (let currentIndex = array.length - 1; currentIndex >= 0; currentIndex--) {
    const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};
