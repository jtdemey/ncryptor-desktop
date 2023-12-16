import { useState, useEffect } from "react";

type Dimensions = {
  height?: number;
  width?: number;
};

export default function useWindowDimensions(): Dimensions {
  const initialDimensions: Dimensions = {
    width: undefined,
    height: undefined,
  };
  const [refDimensions, setWindowDimensions] = useState(initialDimensions);

  useEffect(() => {
    const handleResize = (): void => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return refDimensions;
}
