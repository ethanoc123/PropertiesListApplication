import { createClient } from "@/utils/supabase/server";
import PropertyListingCard from "../common/components/PropertyListingCard";
import { Property } from "../common/types/types";
import Filters from "./components/filters";

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) {
  const supabase = createClient();
  let query = supabase
    .from("properties")
    .select("*")
    .order("listed_at", { ascending: false });

  if (searchParams?.bedrooms) {
    query = query.eq("bedrooms", parseInt(searchParams.bedrooms));
  }

  if (searchParams?.bathrooms) {
    query = query.eq("bathrooms", parseInt(searchParams.bathrooms));
  }

  if (searchParams?.price) {
    query = query.lte("price", parseInt(searchParams.price));
  }

  const response = await query;

  if (response.error) {
    console.error("Error fetching properties:", response.error);
    return { properties: [] };
  }

  const properties = response.data as Property[];

  return (
    <div>
      <Filters />
      {properties && properties.length > 0 ? (
        <div className="flex flex-wrap -mx-2 md:mx-0">
          {properties.map((property, index) => (
            <div className="p-2 w-full sm:w-1/2 md:w-1/3" key={index}>
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
