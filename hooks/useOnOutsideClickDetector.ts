import React, { useEffect } from "react";

const useOutsideClickDetector = <T extends HTMLElement | null>(
  ref: React.MutableRefObject<T>,
  onOutsideClick: () => void
): void => {
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        ref &&
        ref.current &&
        !ref.current.contains(event.target as Element)
      ) {
        onOutsideClick();
      }
    };

    document.addEventListener("click", handleOutsideClick, true);
    return () => {
      document.removeEventListener("click", handleOutsideClick, true);
    };
  }, []);

  return;
};

export default useOutsideClickDetector;
