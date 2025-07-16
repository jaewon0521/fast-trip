export interface PlaceTextSearchResponse {
  html_attributions: string[]; // 저작권 표시 (필요한 경우)
  next_page_token?: string; // 다음 페이지 결과가 있을 경우 토큰
  results: PlaceResult[];
  status: PlaceApiStatus;
}

interface PlaceResult {
  business_status?: BusinessStatus; // 영업 상태 (예: OPERATIONAL)
  formatted_address: string; // 사람이 읽기 쉬운 주소
  geometry: Geometry; // 지리적 정보 (위치, 뷰포트 등)
  icon: string; // 아이콘 URL
  icon_background_color?: string; // 아이콘 배경색 (선택 사항)
  icon_mask_base_uri?: string; // 아이콘 마스크 URI (선택 사항)
  name: string; // 장소 이름
  opening_hours?: OpeningHours; // 영업 시간 정보 (선택 사항)
  photos?: Photo[]; // 사진 정보 배열 (선택 사항)
  place_id: string; // 장소의 고유 식별자
  plus_code?: PlusCode; // Plus Code 정보 (선택 사항)
  price_level?: PriceLevel; // 가격대 (선택 사항)
  rating?: number; // 사용자 평점 (선택 사항)
  reference: string; // (deprecated) place_id와 동일한 값, 사용 자제 권장
  types: string[]; // 장소의 유형 (예: "restaurant", "point_of_interest")
  user_ratings_total?: number; // 총 사용자 평점 수 (선택 사항)
  vicinity?: string; // 근접한 주소 (formatted_address가 없는 경우 등, 선택 사항)
}

interface Geometry {
  location: LatLng; // 위도 및 경도
  viewport: LatLngBounds; // 지도 뷰포트 (결과를 표시하기 적합한 영역)
}

interface LatLng {
  lat: number;
  lng: number;
}

interface LatLngBounds {
  northeast: LatLng;
  southwest: LatLng;
}

type BusinessStatus =
  | "OPERATIONAL" // 영업 중
  | "CLOSED_TEMPORARILY" // 임시 휴업
  | "CLOSED_PERMANENTLY"; // 영구 휴업

interface OpeningHours {
  open_now?: boolean; // 현재 영업 중인지 여부 (요청 시점에 따라 다름)
  periods?: OpeningHoursPeriod[]; // 상세 영업 기간 (weekly schedule)
  weekday_text?: string[]; // 요일별 영업 시간 텍스트 (예: "월요일: 오전 9:00~오후 6:00")
}

interface OpeningHoursPeriod {
  open: {
    day: number; // 요일 (0=일요일, 1=월요일, ...)
    time: string; // 시간 (HHMM 형식, 예: "0900")
  };
  close?: {
    // 24시간 영업일 경우 없을 수 있음
    day: number;
    time: string;
  };
}

interface Photo {
  height: number; // 사진의 픽셀 높이
  html_attributions: string[]; // 사진 저작권 표시
  photo_reference: string; // 사진을 가져오는 데 사용되는 참조 ID
  width: number; // 사진의 픽셀 너비
}

interface PlusCode {
  compound_code?: string;
  global_code: string;
}

type PriceLevel = 0 | 1 | 2 | 3 | 4; // 0 (무료) ~ 4 (매우 비쌈)

type PlaceApiStatus =
  | "OK" // 성공
  | "ZERO_RESULTS" // 결과 없음
  | "OVER_QUERY_LIMIT" // 할당량 초과
  | "REQUEST_DENIED" // 요청 거부 (API 키 문제, 지불 계정 비활성화 등)
  | "INVALID_REQUEST" // 잘못된 요청 파라미터
  | "UNKNOWN_ERROR"; // 알 수 없는 오류
