import { useState, useEffect, type RefObject } from "react";

interface ContainerSize {
  width: number;
  height: number;
}

/**
 * Hook to track container dimensions instead of viewport dimensions
 * This allows responsive behavior based on container size rather than screen size
 */
export function useContainerSize(
  containerRef: RefObject<HTMLElement>
): ContainerSize {
  const [size, setSize] = useState<ContainerSize>({ width: 0, height: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      setSize({
        width: rect.width,
        height: rect.height,
      });
    };

    // Initial measurement
    updateSize();

    // Use ResizeObserver to track container size changes
    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, [containerRef]);

  return size;
}

