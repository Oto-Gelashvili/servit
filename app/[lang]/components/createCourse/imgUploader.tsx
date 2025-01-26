'use client';
import { CirclePlus } from 'lucide-react';
import React, { useState } from 'react';

export default function ImageUploader() {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedImages(Array.from(e.target.files));
    }
  };
  return (
    <>
      <input
        type="file"
        id="course_images"
        name="course_images"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        style={{ display: 'none' }}
      />
      <div className=" img-container">
        <CirclePlus className="addIcon" />
        {selectedImages.map((image, index) => (
          <img
            key={index}
            src={URL.createObjectURL(image)}
            alt={`Preview ${index + 1}`}
            style={{
              width: '100%',
              objectFit: 'cover',
              zIndex: 1,
            }}
          />
        ))}
      </div>
    </>
  );
}
