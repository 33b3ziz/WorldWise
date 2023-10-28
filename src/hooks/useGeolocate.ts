import { useState } from "react";

export function useGeolocation(defaultPosition?: { lat: number; lng: number }) {
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [position, setPosition] = useState(defaultPosition);
  const [error, setError] = useState<string | null>(null);

  function getPosition() {
    if (count !== null) setCount((count) => count + 1);

    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }

  return { isLoading, count, error, getPosition, position };
}
