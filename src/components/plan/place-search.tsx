"use client";

import { extractError } from "@/lib/error";
import { httpClient } from "@/lib/fetch";
import {
  PlaceResult,
  PlaceTextSearchResponse,
} from "@/service/google/places-dto";
import { XIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import PlaceSearchResultItem from "./place-search-result-item";

interface PlaceSearchProps {
  region: string;
  selectPlace: PlaceResult[];
  defaultPlaces: PlaceResult[];
  onClose: () => void;
  onSelectPlace: (place: PlaceResult) => void;
}

export default function PlaceSearch({
  region,
  selectPlace,
  defaultPlaces,
  onClose,
  onSelectPlace,
}: PlaceSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] =
    useState<PlaceResult[]>(defaultPlaces);
  const [isLoading, setIsLoading] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleChangeSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === "") {
      setSearchResults(defaultPlaces);
    }
    setSearchQuery(value);
  };

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      const response = await httpClient()
        .url(`/api/google/places/find?region=${region}&search=${searchQuery}`)
        .call<PlaceTextSearchResponse>();

      setSearchResults(response.results);
    } catch (e) {
      const error = extractError(e);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // ESC 키로 placeSearch 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <>
      <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-2">
        <div className="flex justify-end p-2 mb-2">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <XIcon className="w-4 h-4" />
          </button>
        </div>
        <div className="p-4 pt-0 border-b border-gray-100">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={handleChangeSearchQuery}
                onKeyDown={handleKeyPress}
                placeholder="장소를 검색하세요"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {isLoading && (
                <div className="absolute right-3 top-2.5">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                </div>
              )}
            </div>
            <button
              onClick={handleSearch}
              disabled={isLoading || !searchQuery.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              검색
            </button>
          </div>
        </div>
        {searchResults.length > 0 && (
          <div className="max-h-64 overflow-y-auto">
            <div className="p-2">
              <div className="text-sm text-gray-600 mb-2">
                검색 결과 ({searchResults.length}개)
              </div>
              <div className="space-y-1">
                {searchResults.map((place, index) => (
                  <div
                    key={index}
                    onClick={() => onSelectPlace(place)}
                    className="p-2 hover:bg-gray-50 rounded cursor-pointer transition-colors"
                  >
                    <PlaceSearchResultItem
                      place={place}
                      selectedPlace={selectPlace.find(
                        (p) => p.place_id === place.place_id
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {searchQuery && !isLoading && searchResults.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            검색 결과가 없습니다.
          </div>
        )}
      </div>
    </>
  );
}
