export const MARKER_ICON_BASE: google.maps.Symbol | google.maps.Icon = {
  path: google.maps.SymbolPath.CIRCLE,
  fillOpacity: 1,
  strokeWeight: 0,
  scale: 14,
};

export const MARKER_LABEL_BASE: google.maps.MarkerLabel = {
  color: "white",
  fontSize: "12px",
  fontWeight: "bold",
  text: "",
};

export const POLYLINE_OPTIONS_BASE: google.maps.PolylineOptions = {
  strokeOpacity: 0,
  icons: [
    {
      icon: {
        path: "M 0,-1 0,1",
        strokeOpacity: 1,
        scale: 3,
      },
      offset: "0",
      repeat: "20px",
    },
  ],
};

export const DEFAULT_MAP_OPTIONS: google.maps.MapOptions = {
  minZoom: 4,
  maxZoom: 18,
  cameraControl: false,
  zoomControl: false,
  mapTypeControl: false,
  streetViewControl: false,
};

export const DEFAULT_CENTER: google.maps.LatLngLiteral = {
  lat: 37.555946,
  lng: 126.972317,
};

export const DEFAULT_CONTAINER_STYLE = {
  width: "100%",
  height: "100%",
};

export const MARKERS_DAY_COLORS = [
    "#ff6b6b",
    "#4ecdc4",
    "#ffad60",
    "#abc4ff",
    "#a389d4",
  ];