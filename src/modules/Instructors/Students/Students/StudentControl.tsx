import { LayoutList, LayoutGrid, Grid3x3, List } from "lucide-react";
export default function StudentControl({
  setitemsPerPage,
  itemsPerPage,
  setCardStyle,
  cardStyle,
  columns,
  setColumns,
}) {
  const columnOptions = [
    { id: 1, icon: LayoutList },
    { id: 2, icon: LayoutGrid },
    { id: 3, icon: Grid3x3 },
  ];
  return (
    <div>
      <div className="flex justify-end gap-3">
        <div className="inline-flex select-none rounded-full border-2 border-gray-200 bg-gray-200 text-sm text-gray-500">
          {[6, 12, 24].map((num) => (
            <button
              key={num}
              onClick={() => setitemsPerPage(num)}
              className={`px-4 py-2 transition-colors duration-300 ${
                itemsPerPage === num
                  ? "rounded-full bg-white text-blue-400"
                  : "hover:text-blue-400"
              }`}
            >
              {num}
            </button>
          ))}
        </div>
        <div className="inline-flex select-none rounded-full border-2 border-gray-200 bg-gray-200 text-sm leading-none text-gray-500">
          <button
            onClick={() => setCardStyle("grid")}
            className={`inline-flex items-center rounded-l-full px-4 py-2 transition-colors duration-300 ease-in focus:outline-none ${
              cardStyle === "grid"
                ? "bg-white text-blue-400"
                : "hover:text-blue-400 focus:text-blue-400"
            }`}
            id="grid"
            type="button"
          >
            <Grid3x3 size={18} className="me-[5px]" />
            <span>Grid</span>
          </button>
          <button
            onClick={() => setCardStyle("list")}
            className={`inline-flex items-center rounded-r-full px-4 py-2 transition-colors duration-300 ease-in focus:outline-none ${
              cardStyle === "list"
                ? "bg-white text-blue-400"
                : "hover:text-blue-400 focus:text-blue-400"
            }`}
            id="list"
            type="button"
          >
            <List size={18} className="me-[5px]" />
            <span>List</span>
          </button>
        </div>
        <div className="hidden rounded-full border-2 border-gray-200 bg-gray-200 text-sm text-gray-500 md:inline-flex">
          {columnOptions.map(({ id, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setColumns(id)}
              className={`px-4 py-2 transition-colors duration-300 ${
                columns === id
                  ? "rounded-full bg-white text-blue-400"
                  : "hover:text-blue-400"
              }`}
            >
              <Icon className="h-5 w-5" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
