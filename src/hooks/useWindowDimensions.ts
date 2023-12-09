import { useState, useEffect } from "react";

export default function useWindowDimensions() {
  const initialDimensions: { width?: number; height?: number } = {
    width: undefined,
    height: undefined
  };
  const [refDimensions, setWindowDimensions] = useState(initialDimensions);

  useEffect(() => {
    const handleResize = (): void => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return refDimensions;
}
