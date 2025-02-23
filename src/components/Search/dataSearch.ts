import { Place } from "@api";
import create from "zustand";

interface DataSearchState {
  searchTerm: string;
  categoryId: string | undefined;
  places: Place[];
  activeCategories: string[];
  setSearchTerm: (data: string | undefined) => void;
  setCategoryId: (data: string | undefined) => void;
  setActiveCategories: (data: string[]) => void;
  setPlaces: (data: Place[]) => void;
}

const useDataSearch = create<DataSearchState>((set) => ({
  searchTerm: "",
  places: [{ id: "", city: "", state: "" }],
  categoryId: "",
  activeCategories: [],
  setSearchTerm: (data) => set({ searchTerm: data }),
  setPlaces: (data: Place[]) => set({ places: data }),
  setCategoryId: (data) => set({ categoryId: data }),
  setActiveCategories: (data) => set({ activeCategories: data }),
}));

export default useDataSearch;
