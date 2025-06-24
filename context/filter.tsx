"use client";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useMemo,
} from "react";

interface FilterStateContextType {
  filterState: boolean;
  setFilterState: React.Dispatch<React.SetStateAction<boolean>>;
}

const FilterStateContext = createContext<FilterStateContextType | null>(null);

interface FilterStateProviderProps {
  children: ReactNode;
}

export function FilterStateProvider({
  children,
}: Readonly<FilterStateProviderProps>) {
  const [filterState, setFilterState] = useState<boolean>(false);

  const value = useMemo(() => ({ filterState, setFilterState }), [filterState]);

  return (
    <FilterStateContext.Provider value={value}>
      {children}
    </FilterStateContext.Provider>
  );
}

export function useFilterState() {
  const context = useContext(FilterStateContext);
  if (!context) {
    throw new Error("useFilterState must be used within a FilterStateProvider");
  }
  return context;
}
