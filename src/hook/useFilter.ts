import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export const useFilter = (data, config) => {
  const [searchParams, setSearchParams] = useSearchParams();
  // Initialize state from URL params
  const [filters, setFilters] = useState(() => {
    const initialFilters = {};
    config.filters.forEach((filter) => {
      initialFilters[filter.key] = searchParams.get(filter.key) || "";
    });
    return initialFilters;
  });
  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value.toString().trim()) {
        params.set(key, value.toString().trim());
      }
    });
    setSearchParams(params, { replace: true });
  }, [filters, setSearchParams]);
  // Filter data based on configuration
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
  // Get unique values for select filters
  const getUniqueValues = (key) => {
    if (!data) return [];
    const filterConfig = config.filters.find((f) => f.key === key);
    if (!filterConfig?.getUniqueValues) return [];
    return filterConfig.getUniqueValues(data);
  };
  // Update a specific filter
  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };
  // Clear all filters
  const clearFilters = () => {
    const clearedFilters = {};
    config.filters.forEach((filter) => {
      clearedFilters[filter.key] = "";
    });
    setFilters(clearedFilters);
  };
  // Check if any filters are active
  const hasActiveFilters = Object.values(filters).some(
    (value) => value && value.toString().trim(),
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
