'use client';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import React from 'react';

type ImageSliderProps = {
  images: string[];
};

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [imageIndex, setImageIndex] = useState<number>(0);

  useEffect(() => {
    images.forEach((image) => {
      const img = new window.Image();
      img.src = image;
    });
  }, [images]);

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
    </div>
  );
};

export default ImageSlider;
