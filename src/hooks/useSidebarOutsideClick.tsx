import { useEffect, useRef } from 'react';

export function useSidebarOutsideClick(
  isOpen: boolean,
  onClose: () => void
): React.RefObject<HTMLDivElement | null> {
  const ref = useRef<HTMLDivElement | null>(null);
  const onCloseRef = useRef(onClose);

  onCloseRef.current = onClose;

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent): void => {
      if (!(event.target instanceof Node)) {
        return;
      }

      if (!ref.current?.contains(event.target)) {
        onCloseRef.current();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return ref;
}
