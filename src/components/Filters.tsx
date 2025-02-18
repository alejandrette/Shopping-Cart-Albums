import { FiltersProps } from "../types/filters";

export function Filters({ filters, onAuthorChange, onMaxPriceChange, authorUnique }: FiltersProps) {
  return (
    <div className="flex justify-between justify-center max-w-lg mx-auto gap-x-10 mt-3">
      <div className="w-1/3 flex items-center">
      <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => onAuthorChange(e.target.value)}>
        <option value={'all'}>All Author</option>
        {authorUnique.map((author, index) => (
          <option key={index} value={author}>{author}</option>
        ))}
      </select>
      </div>

      <div className="w-1/4 text-right">
        <label className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          Max Price: <span className="text-blue-600 dark:text-blue-400">${filters.maxPrice}</span>
        </label>
        <input 
          type="range"  
          min="10" 
          max="26"
          step='2'
          className="w-full max-w-sm h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-500 dark:bg-gray-700 dark:accent-blue-400"
          value={filters.maxPrice}
          onChange={(e) => onMaxPriceChange(Number(e.target.value))}
        />
      </div>
    </div>
  )
}
