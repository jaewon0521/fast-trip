"use client";

import React, { useCallback, useMemo, useState } from "react";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";

interface GoogleMapComponentProps {
  center?: {
    lat: number;
    lng: number;
  };
  zoom?: number;
  containerStyle?: React.CSSProperties;
  options?: google.maps.MapOptions;
  children?: React.ReactNode;
  className?: string;
  markers: MarkerData[];
}

const defaultContainerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {
  lat: 37.555946,
  lng: 126.972317,
};

const defaultOptions = {
  minZoom: 4,
  maxZoom: 18,
  cameraControl: false,
  zoomControl: false,
  mapTypeControl: false,
  streetViewControl: false,
};

interface MarkerData {
  id: string;
  lat: number;
  lng: number;
  type: "restaurant" | "place"; // 장소 타입 구분
  name: string;
}

export default function GoogleMapComponent({
  center = defaultCenter,
  zoom = 13,
  containerStyle = defaultContainerStyle,
  options = defaultOptions,
  children,
  markers = [],
}: GoogleMapComponentProps) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!,
    language: "ko",
  });
  const [map, setMap] = useState<google.maps.Map | null>(null);

  // 지도가 로드되었을 때 호출되는 콜백
  const onLoad = useCallback(
    function callback(mapInstance: google.maps.Map) {
      // 지도 초기 중심 설정
      if (markers.length !== 0) {
        const bounds = new google.maps.LatLngBounds();
        markers.forEach((marker) =>
          bounds.extend({ lat: marker.lat, lng: marker.lng })
        );
        mapInstance.fitBounds(bounds); // 모든 마커가 보이도록 지도 줌/중심 조정
      }
      setMap(mapInstance);
    },
    [markers]
  );

  // 지도가 언로드되었을 때 호출되는 콜백
  const onUnmount = useCallback(function callback(
    mapInstance: google.maps.Map
  ) {
    setMap(null);
  },
  []);

  // 마커 아이콘 설정 함수
  const getMarkerIcon = useCallback((type: "restaurant" | "place") => {
    const restaurantColor = "#FF0000"; // 빨간색 (식당)
    const placeColor = "#0000FF"; // 파란색 (장소)

    const fillColor = type === "restaurant" ? restaurantColor : placeColor;

    // SVG로 동그라미 마커 정의 (커스텀 아이콘)
    return {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: fillColor,
      fillOpacity: 1,
      strokeWeight: 0, // 테두리 없음
      scale: 14,
    };
  }, []);

  if (loadError) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        지도를 불러오는 중 오류가 발생했습니다.
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        지도를 불러오는 중...
      </div>
    );
  }

  console.log(center);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center} // 초기 중심점, 마커 없으면 후쿠오카
      zoom={zoom} // 초기 줌 레벨
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={options}
    >
      {children}
      {markers.map((marker, index) => (
        <MarkerF
          key={marker.id}
          label={{
            text: (index + 1).toString(),
            color: "white",
            fontSize: "12px",
            fontWeight: "bold",
          }}
          position={{ lat: marker.lat, lng: marker.lng }}
          icon={getMarkerIcon(marker.type)} // 커스텀 아이콘 적용
          title={marker.name} // 마우스 오버 시 표시될 이름
          onClick={() => {
            // 여기에 마커 클릭 시 동작할 로직 추가 (예: 상세 정보 표시)
          }}
        />
      ))}
    </GoogleMap>
  );
}
