import { create } from "zustand";

type SearchState = {
  query: string;
  debouncedQuery: string;
  setQuery: (q: string) => void;
};

export const useSearchStore = create<SearchState>((set) => {
  let timeout: NodeJS.Timeout;

  return {
    query: "",
    debouncedQuery: "",
    setQuery: (q) => {
      set({ query: q });

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        set({ debouncedQuery: q });
      }, ); 
    },
  };
});
