// pages/properties/[id].tsx
import { Property } from "@/app/common/types/types";
import { createClient } from "@/utils/supabase/server";

export default async function PropertyPage({
  params,
}: {
  params: { propertyId: number };
}) {
  const supabase = createClient();

  const response = await supabase
    .from("properties")
    .select("*")
    .eq("id", params.propertyId)
    .single();

  const property = response.data as Property;

  return (
    <div>
      <h1>{property.description}</h1>
    </div>
  );
}
