"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Filters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const priceOptions = [];
  for (let i = 10000; i <= 10000000; i += 10000) {
    priceOptions.push(i);
  }

  const handleFilterChange = (filterName: string, value: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (value !== "") {
      newSearchParams.set(filterName, value);
    } else {
      newSearchParams.delete(filterName);
    }
    const url = pathname + "?" + newSearchParams;
    router.push(url);
  };

  const resetFilters = () => {
    router.push(pathname);
  };

  return (
    <div className="flex items-end gap-4 p-2">
      <div className="flex flex-col gap-2">
        <label htmlFor="bedrooms" className="font-semibold">
          Bedrooms
        </label>
        <select
          id="bedrooms"
          name="bedrooms"
          value={searchParams.get("bedrooms") || ""}
          onChange={(e) => handleFilterChange("bedrooms", e.target.value)}
          className="p-2 border border-black rounded-sm w-full"
        >
          <option value="">Any</option>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="bathrooms" className="font-semibold">
          Bathrooms
        </label>
        <select
          id="bathrooms"
          name="bathrooms"
          value={searchParams.get("bathrooms") || ""}
          onChange={(e) => handleFilterChange("bathrooms", e.target.value)}
          className="p-2 border border-black rounded-sm w-full"
        >
          <option value="">Any</option>
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="price" className="font-semibold">
          Price
        </label>
        <select
          id="price"
          name="price"
          value={searchParams.get("price") || ""}
          onChange={(e) => handleFilterChange("price", e.target.value)}
          className="p-2 border border-black rounded-sm w-full"
        >
          <option value="">Any</option>
          {priceOptions.map((price) => (
            <option key={price} value={price}>
              £{price.toLocaleString()}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={resetFilters}
        className="bg-purple-800 rounded-md px-4 py-2 text-background"
      >
        Reset
      </button>
    </div>
  );
};

export default Filters;
