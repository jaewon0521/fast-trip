export interface GeocodingResponse {
  results: GeocodingResult[];
  status: GeocodingStatus;
  error_message?: string;
}

export interface GeocodingResult {
  address_components: AddressComponent[];
  formatted_address: string;
  geometry: Geometry;
  place_id: string;
  plus_code?: PlusCode;
  types: string[];
  partial_match?: boolean;
}

interface AddressComponent {
  long_name: string; // 긴 이름 (예: "서울특별시")
  short_name: string; // 짧은 이름 (예: "서울")
  types: string[];
}

interface Geometry {
  location: LatLng; // 위도 및 경도
  location_type: LocationType; // 위치의 정확도
  viewport: LatLngBounds; // 지도 뷰포트 (결과를 표시하기 적합한 영역)
  bounds?: LatLngBounds; // 지리적 경계 (정치적 영역 등)
}

export interface LatLng {
  lat: number;
  lng: number;
}

// 위치 타입 (Geocoding 정확도)
type LocationType =
  | "ROOFTOP" // 가장 정확한 위치 (건물 옥상)
  | "RANGE_INTERPOLATED" // 두 지점 사이 보간된 위치
  | "GEOMETRIC_CENTER" // 지오메트리 중심
  | "APPROXIMATE"; // 대략적인 위치

interface LatLngBounds {
  northeast: LatLng;
  southwest: LatLng;
}

interface PlusCode {
  compound_code?: string;
  global_code: string;
}

type GeocodingStatus =
  | "OK" // 성공
  | "ZERO_RESULTS" // 결과 없음
  | "OVER_DAILY_LIMIT" // 일일 쿼터 초과
  | "OVER_QUERY_LIMIT" // 초당 쿼터 초과
  | "REQUEST_DENIED" // 요청 거부 (API 키 문제 등)
  | "INVALID_REQUEST" // 잘못된 요청 파라미터
  | "UNKNOWN_ERROR"; // 알 수 없는 오류
