import create from "zustand";

interface DataSearchState {
  searchTerm: string;
  categoryId: string | undefined;
  activeCategories: string[];
  setSearch: (data: string) => void;
  setCategoryId: (data: string | undefined) => void;
  setActiveCategories: (data: string[]) => void;
}

const useDataSearch = create<DataSearchState>((set) => ({
  searchTerm: "",
  categoryId: "",
  activeCategories: [],
  setSearch: (data) => set({ searchTerm: data }),
  setCategoryId: (data) => set({ categoryId: data }),
  setActiveCategories: (data) => set({ activeCategories: data }),
}));

export default useDataSearch;
