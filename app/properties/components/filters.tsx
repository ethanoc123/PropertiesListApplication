'use client';
import { cities } from '@/app/cities';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

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
    if (value !== '') {
      newSearchParams.set(filterName, value);
    } else {
      newSearchParams.delete(filterName);
    }
    router.push(`${pathname}?${newSearchParams}`);
  };

  const resetFilters = () => {
    router.push(pathname);
  };

  const getFilteredOptions = (minValue: string, options: number[]) => {
    if (!minValue) {
      return options;
    }
    const min = parseInt(minValue);
    return options.filter((option) => option > min);
  };

  const minBedrooms = searchParams.get('min_bedrooms') || '';
  const minBathrooms = searchParams.get('min_bathrooms') || '';
  const minPrice = searchParams.get('min_price') || '';

  return (
    <div className='flex flex-col lg:flex-row items-end gap-3 lg:gap-6 p-2'>
      <div className='flex flex-col gap-1 w-full lg:w-auto'>
        <label htmlFor='bedrooms' className='font-bold'>
          Bedrooms
        </label>
        <div className='flex flex-col lg:flex-row gap-2'>
          <select
            id='min_bedrooms'
            name='min_bedrooms'
            value={minBedrooms}
            onChange={(e) => handleFilterChange('min_bedrooms', e.target.value)}
            className='p-1 lg:p-2 border border-black rounded-sm w-full'
          >
            <option value=''>Any</option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <span className='hidden lg:block text-xl font-bold self-center'>
            -
          </span>
          <select
            id='max_bedrooms'
            name='max_bedrooms'
            value={searchParams.get('max_bedrooms') || ''}
            onChange={(e) => handleFilterChange('max_bedrooms', e.target.value)}
            className='p-1 lg:p-2 border border-black rounded-sm w-full'
          >
            <option value=''>Any</option>
            {getFilteredOptions(
              minBedrooms,
              [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            ).map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className='flex flex-col gap-1 w-full lg:w-auto'>
        <label htmlFor='bathrooms' className='font-bold'>
          Bathrooms
        </label>
        <div className='flex flex-col lg:flex-row gap-2'>
          <select
            id='min_bathrooms'
            name='min_bathrooms'
            value={minBathrooms}
            onChange={(e) =>
              handleFilterChange('min_bathrooms', e.target.value)
            }
            className='p-1 lg:p-2 border border-black rounded-sm w-full'
          >
            <option value=''>Any</option>
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <span className='hidden lg:block text-xl font-bold self-center'>
            -
          </span>
          <select
            id='max_bathrooms'
            name='max_bathrooms'
            value={searchParams.get('max_bathrooms') || ''}
            onChange={(e) =>
              handleFilterChange('max_bathrooms', e.target.value)
            }
            className='p-1 lg:p-2 border border-black rounded-sm w-full'
          >
            <option value=''>Any</option>
            {getFilteredOptions(minBathrooms, [1, 2, 3, 4, 5, 6]).map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className='flex flex-col gap-1 w-full lg:w-auto'>
        <label htmlFor='price' className='font-bold'>
          Price
        </label>
        <div className='flex flex-col lg:flex-row gap-2'>
          <select
            id='min_price'
            name='min_price'
            value={minPrice}
            onChange={(e) => handleFilterChange('min_price', e.target.value)}
            className='p-1 lg:p-2 border border-black rounded-sm w-full'
          >
            <option value=''>Any</option>
            {priceOptions.map((price) => (
              <option key={price} value={price}>
                £{price.toLocaleString()}
              </option>
            ))}
          </select>
          <span className='hidden lg:block text-xl font-bold self-center'>
            -
          </span>
          <select
            id='max_price'
            name='max_price'
            value={searchParams.get('max_price') || ''}
            onChange={(e) => handleFilterChange('max_price', e.target.value)}
            className='p-1 lg:p-2 border border-black rounded-sm w-full'
          >
            <option value=''>Any</option>
            {getFilteredOptions(minPrice, priceOptions).map((price) => (
              <option key={price} value={price}>
                £{price.toLocaleString()}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className='flex flex-col gap-1 w-full lg:w-auto'>
        <label htmlFor='city' className='font-bold'>
          City
        </label>
        <select
          id='city'
          name='city'
          value={searchParams.get('city') || ''}
          onChange={(e) => handleFilterChange('city', e.target.value)}
          className='p-1 lg:p-2 border border-black rounded-sm w-full'
        >
          <option value=''>Select a city</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={resetFilters}
        className='bg-purple-800 rounded-md px-4 py-2 text-white w-full lg:w-auto'
      >
        Reset
      </button>
    </div>
  );
};

export default Filters;
