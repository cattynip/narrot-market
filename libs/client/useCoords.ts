import { useEffect, useState } from 'react';

export interface UseCoordState {
  latitude: number | null;
  longitude: number | null;
}

function useCoords() {
  const [coords, setCoords] = useState<UseCoordState>({
    latitude: null,
    longitude: null
  });

  const onSuccess = ({
    coords: { latitude, longitude }
  }: GeolocationPosition) => {
    setCoords({ latitude, longitude });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess);
  }, []);

  return coords;
}

export default useCoords;
