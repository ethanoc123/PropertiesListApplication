import { createClient } from '@/utils/supabase/server';
import PropertyListingCard from '../common/components/PropertyListingCard';
import { Property } from '../common/types/types';
import Filters from './components/filters';

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) {
  const supabase = createClient();
  let query = supabase
    .from('properties')
    .select('*')
    .order('listed_at', { ascending: false });

  if (searchParams?.min_bedrooms) {
    query = query.gte('bedrooms', parseInt(searchParams.min_bedrooms));
  }

  if (searchParams?.max_bedrooms) {
    query = query.lte('bedrooms', parseInt(searchParams.max_bedrooms));
  }

  if (searchParams?.min_bathrooms) {
    query = query.gte('bathrooms', parseInt(searchParams.min_bathrooms));
  }

  if (searchParams?.max_bathrooms) {
    query = query.lte('bathrooms', parseInt(searchParams.max_bathrooms));
  }

  if (searchParams?.min_price) {
    query = query.gte('price', parseInt(searchParams.min_price));
  }

  if (searchParams?.max_price) {
    query = query.lte('price', parseInt(searchParams.max_price));
  }

  if (searchParams?.city) {
    query = query.eq('city', searchParams.city);
  }

  const response = await query;

  if (response.error) {
    console.error('Error fetching properties:', response.error);
    return { properties: [] };
  }

  const properties = response.data as Property[];

  return (
    <div>
      <Filters />
      {properties && properties.length > 0 ? (
        <div className='flex flex-wrap -mx-2 md:mx-0'>
          {properties.map((property, index) => (
            <div className='p-2 w-full sm:w-1/2 md:w-1/3' key={index}>
              <PropertyListingCard property={property} />
            </div>
          ))}
        </div>
      ) : (
        <p>No properties found.</p>
      )}
    </div>
  );
}
