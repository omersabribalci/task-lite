import type { Dispatch, SetStateAction } from "react";

type SearchFilterProps = {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  filterTerm: string;
  setFilterTerm: Dispatch<SetStateAction<string>>;
};

export default function SearchFilter({
  searchTerm,
  setSearchTerm,
  filterTerm,
  setFilterTerm,
}: SearchFilterProps) {
  return (
    <div className="flex flex-row gap-4 justify-between">
      <div className="flex flex-row items-center gap-4">
        <label htmlFor="search" className="text-nowrap">
          Search by Title
        </label>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          id="search"
          type="text"
          className="min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-600 focus:outline-3 focus:outline-blue-100"
        />
      </div>
      <div className="flex flex-row items-center gap-4">
        <label htmlFor="filter" className="text-nowrap">
          Filter by Status
        </label>
        <select
          value={filterTerm}
          onChange={(e) => setFilterTerm(e.target.value)}
          id="filter"
          name="filter"
          className="min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-600 focus:outline-3 focus:outline-blue-100"
        >
          <option value="all">All</option>
          <option value="PENDING">Pending</option>
          <option value="IN_PROGRESS">In progress</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </div>
    </div>
  );
}
