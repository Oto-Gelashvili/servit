'use client';
import { CirclePlus } from 'lucide-react';
import Image from 'next/image';
import React, { useRef, useState } from 'react';

interface ImageUploaderProps {
  currentImage: string;
}

export default function ImageUploader({ currentImage }: ImageUploaderProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="avatarCont">
      <div className="avatarBg">
        <CirclePlus />
      </div>
      <Image
        src={currentImage}
        alt="User's avatar"
        fill
        sizes="60px"
        unoptimized={true}
        className={`currentImage ${selectedImage ? 'opacity-0' : 'opacity-100'}`}
        onClick={handleImageClick}
      />
      <input
        type="file"
        id="avatar"
        name="avatar"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
        ref={fileInputRef}
      />
      {selectedImage && (
        <img
          src={URL.createObjectURL(selectedImage)}
          alt="Preview Avatar"
          className="selectedImage"
        />
      )}
    </div>
  );
}
