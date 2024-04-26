import { Property } from '@/app/common/types/types';
import { createClient } from '@/utils/supabase/server';
import ImageCarousel from './components/ImageCarousel';

export default async function PropertyPage({
  params,
}: {
  params: { propertyId: number };
}) {
  const supabase = createClient();

  const response = await supabase
    .from('properties')
    .select('*')
    .eq('id', params.propertyId)
    .single();

  const property = response.data as Property;

  return (
    <div className='flex flex-col gap-16 overflow-hidden'>
      <div>
        <ImageCarousel images={property.images} />
      </div>
      <p className='font-semibold'>{property.description}</p>
    </div>
  );
}
