import Link from "next/link";
import { Property } from "../../common/types/types";
import { FaBed, FaBath } from "react-icons/fa";

interface PropertyListingCardProps {
  property: Property;
}

export default function PropertyListingCard({
  property,
}: PropertyListingCardProps) {
  const imageUrl =
    property.images.length > 0
      ? property.images[0]
      : "https://xlomnggvflmbkwvsqfhf.supabase.co/storage/v1/object/public/images/default.jpeg";

  return (
    <Link href={`/properties/${property.id}`} className="w-full md:w-1/3">
      <div className="flex flex-col gap-4 border shadow-lg rounded-lg overflow-hidden">
        <div className="relative w-full">
          <img
            src={imageUrl}
            alt="Property preview image"
            className="w-full object-cover min-h-56 max-h-72 md:h-40 xl:h-52 2xl:h-72"
          />
        </div>
        <div className="flex justify-around pb-4">
          <span className="flex items-center font-semibold gap-2 border border-neutral-950 rounded-xl px-3">
            <FaBed />
            {property.bedrooms}
          </span>
          <span className="flex items-center font-semibold gap-2 border border-neutral-950 rounded-xl px-3">
            <FaBath />
            {property.bathrooms}
          </span>
          <span className="border border-neutral-950 font-semibold rounded-xl px-3">
            £{property.price.toLocaleString()}
          </span>
        </div>
      </div>
    </Link>
  );
}
