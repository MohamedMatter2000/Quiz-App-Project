import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
interface FilterConfig<T> {
  key: string;
  type: "search" | "select";
  label: string;
  placeholder: string;
  className?: string;
  filterFunction: (item: T, value: string) => boolean;
  getUniqueValues?: (data: T[]) => string[];
}
interface FilterConfiguration<T> {
  filters: FilterConfig<T>[];
}
interface Filters {
  [key: string]: string;
}
interface UseFilterReturn<T> {
  filters: Filters;
  filteredData: T[];
  updateFilter: (key: string, value: string) => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;
  getUniqueValues: (key: string) => string[];
  totalItems: number;
}

export const useFilter = <T extends Record<string, any>>(
  data: T[] | undefined,
  config: FilterConfiguration<T>
): UseFilterReturn<T> => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState<Filters>(() => {
    const initialFilters: Filters = {};
    config.filters.forEach((filter) => {
      initialFilters[filter.key] = searchParams.get(filter.key) || "";
    });
    return initialFilters;
  });

  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value.toString().trim()) {
        params.set(key, value.toString().trim());
      }
    });
    setSearchParams(params, { replace: true });
  }, [filters, setSearchParams]);

  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.filter((item) => {
      return config.filters.every((filterConfig) => {
        const filterValue = filters[filterConfig.key];
        if (!filterValue) return true;
        return filterConfig.filterFunction(item, filterValue);
      });
    });
  }, [data, filters, config.filters]);

  const getUniqueValues = (key: string): string[] => {
    if (!data) return [];
    const filterConfig = config.filters.find((f) => f.key === key);
    if (!filterConfig?.getUniqueValues) return [];
    return filterConfig.getUniqueValues(data);
  };

  const updateFilter = (key: string, value: string): void => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = (): void => {
    const clearedFilters: Filters = {};
    config.filters.forEach((filter) => {
      clearedFilters[filter.key] = "";
    });
    setFilters(clearedFilters);
  };

  const hasActiveFilters = Object.values(filters).some(
    (value) => value && value.toString().trim()
  );

  return {
    filters,
    filteredData,
    updateFilter,
    clearFilters,
    hasActiveFilters,
    getUniqueValues,
    totalItems: filteredData.length,
  };
};
