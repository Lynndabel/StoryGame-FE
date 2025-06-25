// src/utils/hooks/useInfiniteScroll.ts
import { useState, useEffect, useCallback } from 'react';

interface UseInfiniteScrollOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useInfiniteScroll(
  callback: () => void,
  options: UseInfiniteScrollOptions = {}
) {
  const { threshold = 0.1, rootMargin = '0px' } = options;
  const [isFetching, setIsFetching] = useState(false);
  const [element, setElement] = useState<Element | null>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && !isFetching) {
        setIsFetching(true);
        callback();
      }
    },
    [callback, isFetching]
  );

  useEffect(() => {
    if (!element) return;

    const observer = new IntersectionObserver(handleObserver, {
      threshold,
      rootMargin,
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, [element, handleObserver, threshold, rootMargin]);

  const setRef = useCallback((node: Element | null) => {
    setElement(node);
  }, []);

  const resetFetching = useCallback(() => {
    setIsFetching(false);
  }, []);

  return { setRef, isFetching, resetFetching };
}

