'use client';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

interface ImageCarouselProps {
  images: string[];
}

function ImageCarousel({ images }: ImageCarouselProps) {
  const imageItems = images.map((url) => ({
    original: url,
    thumbnail: url,
  }));
  return (
    <div className='flex justify-center'>
      <div style={{ width: '80%', maxWidth: '62rem' }}>
        <ImageGallery items={imageItems} additionalClass='custom-gallery' />
      </div>
    </div>
  );
}

export default ImageCarousel;
