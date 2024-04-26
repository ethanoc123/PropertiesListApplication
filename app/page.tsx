import { createClient } from "@/utils/supabase/server";
import PropertyListingCard from "./common/components/PropertyListingCard";
import { Property } from "./common/types/types";

export default async function Index() {
  const supabase = createClient();
  const response = await supabase
    .from("properties")
    .select("*")
    .order("listed_at", { ascending: false })
    .limit(3);

  const properties = response.data as Property[];

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Recent listings</h1>
      {properties && properties.length > 0 ? (
        <div className="flex flex-col items-center md:items-start md:flex-row gap-4">
          {properties.map((property, index) => (
            <PropertyListingCard key={index} property={property} />
          ))}
        </div>
      ) : (
        <p>No properties found.</p>
      )}
    </div>
  );
}
