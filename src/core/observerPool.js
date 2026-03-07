const observerMap = new Map();
function getKey(options) {
    return JSON.stringify({
        root: options.root ? 'root' : null,
        rootMargin: options.rootMargin,
        threshold: options.threshold,
    });
}
export function observeWithPool(element, options, callback) {
    if (typeof IntersectionObserver === 'undefined') {
        return () => { };
    }
    const key = getKey(options);
    if (!observerMap.has(key)) {
        const elements = new Map();
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const cb = elements.get(entry.target);
                if (cb)
                    cb(entry);
            });
        }, options);
        observerMap.set(key, { observer, elements });
    }
    const pool = observerMap.get(key);
    pool.elements.set(element, callback);
    pool.observer.observe(element);
    return () => {
        pool.observer.unobserve(element);
        pool.elements.delete(element);
        if (pool.elements.size === 0) {
            pool.observer.disconnect();
            observerMap.delete(key);
        }
    };
}
