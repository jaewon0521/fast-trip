"use client";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface FeatureSectionProps {
  title: string;
  description: string;
  images: string[]; // 이미지 URL 배열
}

export default function FeatureDescriptionSection({
  title,
  description,
  images,
}: FeatureSectionProps) {
  return (
    <div className="flex justify-between items-center gap-5 max-md:flex-col max-md:gap-1">
      <div className="flex flex-col items-center gap-2 px-5">
        <span className="text-2xl text-blue-400 font-bold">{title}</span>
        <span className="text-sm text-gray-500">{description}</span>
      </div>
      <ImageCarousel images={images} />
    </div>
  );
}

function ImageCarousel({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const getImageStyle = (index: number) => {
    const isCurrent = index === currentIndex;
    const isPrev = index === currentIndex - 1;
    const isNext = index === currentIndex + 1;

    if (isCurrent) {
      return {
        transform: "translateX(0) scale(1)",
        opacity: 1,
        filter: "blur(0px)",
        zIndex: 10,
      };
    } else if (isPrev) {
      return {
        transform: "translateX(-125px) scale(0.8)",
        opacity: 0.9,
        filter: "blur(1px)",
        zIndex: 5,
      };
    } else if (isNext) {
      return {
        transform: "translateX(125px) scale(0.8)",
        opacity: 0.9,
        filter: "blur(1px)",
        zIndex: 5,
      };
    } else {
      return {
        transform: "translateX(0) scale(0.8)",
        opacity: 0,
        filter: "blur(4px)",
        zIndex: 1,
      };
    }
  };

  return (
    <div className={"relative flex items-center justify-center"}>
      <div className="relative w-[400px] h-[500px] overflow-x-hidden">
        <div className="w-full h-full flex items-center justify-center">
          {images.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`Carousel image ${index + 1}`}
              width={200}
              height={394}
              className="absolute object-contain rounded-lg transition-all duration-400 ease-carousel"
              style={getImageStyle(index)}
            />
          ))}
        </div>
        {images.length > 1 && (
          <>
            {currentIndex !== 0 && (
              <button
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 rounded-full border-1 border-gray-300 bg-gray-100 p-1 transition-all duration-200 cursor-pointer"
                onClick={goToPrevious}
              >
                <ChevronLeft size={14} />
              </button>
            )}
            {currentIndex !== images.length - 1 && (
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 rounded-full border-1 border-gray-300 bg-gray-100 p-1 transition-all duration-200 cursor-pointer"
                onClick={goToNext}
              >
                <ChevronRight size={14} />
              </button>
            )}
          </>
        )}
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-200",
              index === currentIndex
                ? "bg-blue-500 scale-125"
                : "bg-gray-400 hover:bg-gray-500"
            )}
            onClick={() => {
              if (index !== currentIndex) {
                setCurrentIndex(index);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}
