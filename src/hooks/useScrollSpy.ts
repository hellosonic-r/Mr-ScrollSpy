import { useEffect, useState } from 'react';
import { observeWithPool } from '../core/observerPool';

interface Options {
  sectionRefs: Record<string, React.RefObject<HTMLElement>>;
  offset?: number;
}

export function useScrollSpy({ sectionRefs, offset = 0 }: Options) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const cleanups: (() => void)[] = [];

    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: `-${offset}px 0px -40% 0px`,
      threshold: 0,
    };

    Object.entries(sectionRefs).forEach(([key, ref]) => {
      const element = ref.current;
      if (!element) return;

      element.id = key;

      const cleanup = observeWithPool(element, options, (entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });

      cleanups.push(cleanup);
    });

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, [offset]);

  return activeId;
}
