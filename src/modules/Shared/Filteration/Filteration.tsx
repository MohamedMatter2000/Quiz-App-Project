import { Search, X } from "lucide-react";
interface FilterConfig {
  key: string;
  type: string;
  label: string;
  placeholder: string;
  className?: string;
  formatOption?: (option: string) => string;
}
interface Filters {
  [key: string]: string;
}
interface FilterationProps {
  config: {
    filters: FilterConfig[];
  };
  filters: Filters;
  updateFilter: (key: string, value: string) => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;
  getUniqueValues: (key: string) => string[];
  totalItems: number;
  totalData: number | undefined;
}
const Filteration = ({
  config,
  filters,
  updateFilter,
  clearFilters,
  hasActiveFilters,
  getUniqueValues,
  totalItems,
  totalData,
}: FilterationProps) => {
  const renderFilter = (filterConfig: FilterConfig) => {
    const value = filters[filterConfig.key] || "";
    switch (filterConfig.type) {
      case "search":
        return (
          <div
            key={filterConfig.key}
            className={filterConfig.className || "flex-1"}
          >
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {filterConfig.label}
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search size={20} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder={filterConfig.placeholder}
                value={value}
                onChange={(e) => updateFilter(filterConfig.key, e.target.value)}
                className="block w-full rounded-lg border border-gray-300 py-2 pl-10 pr-10 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
              {value && (
                <button
                  onClick={() => updateFilter(filterConfig.key, "")}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  <X size={20} className="text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
          </div>
        );
      case "select":
        return (
          <div
            key={filterConfig.key}
            className={filterConfig.className || "lg:w-48"}
          >
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {filterConfig.label}
            </label>
            <select
              value={value}
              onChange={(e) => updateFilter(filterConfig.key, e.target.value)}
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">{filterConfig.placeholder}</option>
              {getUniqueValues(filterConfig.key).map((option) => (
                <option key={option} value={option}>
                  {filterConfig.formatOption
                    ? filterConfig.formatOption(option)
                    : option}
                </option>
              ))}
            </select>
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <div>
      <div className="flex flex-col space-y-4 lg:flex-row lg:items-end lg:space-x-4 lg:space-y-0">
        {config.filters.map(renderFilter)}
        {hasActiveFilters && (
          <div>
            <button
              onClick={clearFilters}
              className="rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
      {totalData && (
        <div className="mt-4 text-sm text-gray-600">
          Showing {totalItems} of {totalData} results
        </div>
      )}
    </div>
  );
};

export default Filteration;
