import { useEffect, useRef } from "react";

export function useOutsideClick(handler, handleeventcapture = true) {
  const ref = useRef();
  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }
      document.addEventListener("click", handleClick, handleeventcapture);

      return () =>
        document.removeEventListener("click", handleClick, handleeventcapture);
    },

    [handler, handleeventcapture]
  );
  return { ref };
}
