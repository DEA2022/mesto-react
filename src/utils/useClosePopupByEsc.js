import { useEffect } from "react";

export function useClosePopupsByEsc(isOpen, onClose) {
  useEffect(() => {
    if (!isOpen) return;
    function handleEscapeClose(event) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscapeClose);

    return () => {
      document.removeEventListener("keydown", handleEscapeClose);
    };
  }, [isOpen, onClose]);
}