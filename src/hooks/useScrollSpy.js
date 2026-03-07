import { useEffect, useState } from 'react';
import { observeWithPool } from '../core/observerPool';
export function useScrollSpy({ sectionRefs, offset = 0 }) {
    const [activeId, setActiveId] = useState(null);
    useEffect(() => {
        const cleanups = [];
        const options = {
            root: null,
            rootMargin: `-${offset}px 0px -40% 0px`,
            threshold: 0,
        };
        Object.entries(sectionRefs).forEach(([key, ref]) => {
            const element = ref.current;
            if (!element)
                return;
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
