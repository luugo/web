import {useEffect, useState} from "react";

const useViewportSize = () => {
  const [size, setSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Para atualizar no primeiro render

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
};

export default useViewportSize;
