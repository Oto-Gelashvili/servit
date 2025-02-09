'use client';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import React from 'react';

type ImageSliderProps = {
  images: string[];
};

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [imageIndex, setImageIndex] = useState<number>(0);

  const ShowNextImg = () => {
    setImageIndex((index) => (index === images.length - 1 ? 0 : index + 1));
  };

  const ShowPrevImg = () => {
    setImageIndex((index) => (index === 0 ? images.length - 1 : index - 1));
  };

  const imageUrl = images[imageIndex].includes('undefined')
    ? '/images/noImage.png'
    : images[imageIndex];

  return (
    <div className="slider ">
      <div className="w-full h-full absolute">
        <Image
          src={imageUrl}
          fill
          alt="product image"
          className="image object-cover"
          priority={imageIndex === 0}
        />
      </div>

      {images.length > 1 && (
        <>
          <div className="sliderSide">
            <ArrowLeft onClick={ShowPrevImg} className="imageSliderBtn" />
          </div>
          <div className="sliderSide">
            <ArrowRight onClick={ShowNextImg} className="imageSliderBtn" />
          </div>
        </>
      )}
      <div className="hidden">
        {images.map((img, idx) => {
          const preloadUrl = img.includes('undefined')
            ? '/images/noImage.png'
            : img;
          return (
            <Image
              key={idx}
              src={preloadUrl}
              alt={`Preloaded image ${idx}`}
              width={1}
              height={1}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ImageSlider;
