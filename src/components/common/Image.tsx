"use client";

import { SyntheticEvent } from "react";
import noImage from "../../../public/No_Image.png";

export default function ImageWithFallBack({
  src,
  alt,
  className
}: {
  src: string
  alt: string
  className?: string
}){
  const addImageFallback = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = noImage.src;
  };
  
  return (
    <img 
      src={src} 
      onError={addImageFallback}
      alt={alt} 
      className={className}
    />
  )
}