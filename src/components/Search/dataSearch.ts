import create from "zustand";

interface DataSearchState {
  searchTerm: string;
  categoryId: string | null;
  setSearch: (data: string) => void;
  setCategoryId: (data: string | null) => void;
}

const useDataSearch = create<DataSearchState>((set) => ({
  searchTerm: "",
  categoryId: "",
  setSearch: (data) => set({ searchTerm: data }),
  setCategoryId: (data) => set({ categoryId: data }),
}));

export default useDataSearch;
