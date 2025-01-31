'use client';
import { CirclePlus, X } from 'lucide-react';
import React, { useState } from 'react';

interface ImageUploaderProps {
  uploadedImages?: string[];
}

export default function ImageUploader({ uploadedImages }: ImageUploaderProps) {
  const [selectedImages, setSelectedImages] = useState<(string | File)[]>(
    uploadedImages || []
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const uniqueFiles = newFiles.filter(
        (newFile) =>
          !selectedImages.some(
            (existingFile) =>
              existingFile instanceof File &&
              existingFile.name === newFile.name &&
              existingFile.size === newFile.size
          )
      );
      setSelectedImages((prev) => [...prev, ...uniqueFiles]);
    }
  };

  const handleImageDelete = (indexToRemove: number) => {
    setSelectedImages((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  const renderImage = (image: string | File, index: number) => {
    const src = image instanceof File ? URL.createObjectURL(image) : image;

    return (
      <div key={index} className="relative">
        <img
          src={src}
          alt={`Preview ${index + 1}`}
          className="w-full object-cover"
        />
        <button
          type="button"
          onClick={() => handleImageDelete(index)}
          className="absolute top-1 right-1 p-1 bg-[var(--error)] text-white rounded-full"
        >
          <X size={16} />
        </button>
      </div>
    );
  };

  return (
    <>
      <input
        type="file"
        id="service_images"
        name="service_images"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        style={{ display: 'none' }}
      />
      <label htmlFor="service_images" className="img-container cursor-pointer">
        <CirclePlus className="addIcon" />
        {selectedImages.map(renderImage)}
      </label>
    </>
  );
}
