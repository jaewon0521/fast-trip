import { createContext, useContext, useEffect, useMemo, useState } from "react";

type GoogleMapAction = {
  initMap: (map: google.maps.Map | null) => void;
  clearMap: () => void;
};

const GoogleMapValueContext = createContext<google.maps.Map | null>(null);
const GoogleMapActionContext = createContext<GoogleMapAction | null>(null);

export default function GoogleMapProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const action: GoogleMapAction = useMemo(() => {
    return {
      initMap: (map: google.maps.Map | null) => {
        setMap(map);
      },
      clearMap: () => {
        setMap(null);
      },
    };
  }, [setMap]);

  useEffect(() => {
    return () => action.clearMap();
  }, [action]);

  return (
    <GoogleMapValueContext.Provider value={map}>
      <GoogleMapActionContext.Provider value={action}>
        {children}
      </GoogleMapActionContext.Provider>
    </GoogleMapValueContext.Provider>
  );
}

export const useGoogleMapValue = () => {
  const value = useContext(GoogleMapValueContext);

  return value;
};

export const useGoogleMapAction = () => {
  const action = useContext(GoogleMapActionContext);

  if (!action) {
    throw new Error("GoogleMapProvider 선언 후 사용해야 합니다.");
  }

  return action;
};
