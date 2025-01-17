'use client';
import { useState } from 'react';
import React from 'react';

type ImageSliderProps = {
  images: string[];
};

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [imageIndex, setImageIndex] = useState<number>(0);

  function ShowNextImg(): void {
    setImageIndex((index) => {
      if (index === images.length - 1) {
        return 0;
      } else {
        return index + 1;
      }
    });
  }

  function ShowPrevImg(): void {
    setImageIndex((index) => {
      if (index === 0) {
        return images.length - 1;
      } else {
        return index - 1;
      }
    });
  }

  return (
    <div className="slider">
      <img src={images[imageIndex]} alt="product image" className="image" />
      {images.length > 1 && (
        <>
          <button onClick={ShowPrevImg} className="imageSliderBtn left">
            &larr;
          </button>
          <button onClick={ShowNextImg} className="imageSliderBtn right">
            &rarr;
          </button>
        </>
      )}
    </div>
  );
};

export default ImageSlider;
