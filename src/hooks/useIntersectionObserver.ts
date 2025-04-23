import { RefObject, useEffect, useState } from 'react';

const useIntersectionObserver = (
  elementRef: RefObject<Element>, // 관찰할 DOM 요소의 ref
  { threshold = 0.1, root = null, rootMargin = '0%' },
) => {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry);
  };

  useEffect(() => {
    const node = elementRef?.current; // 현재 ref
    const isIOSupport = !!window.IntersectionObserver; // 호환성 검사

    if (!node || !isIOSupport) return;

    const observerParams = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(updateEntry, observerParams);

    observer.observe(node);

    return () => observer.disconnect();
  }, [elementRef?.current, JSON.stringify(threshold), root, rootMargin]);

  return entry; // isIntersecting, intersectionRatio, boundingClientRect 등의 정보를 얻을 수 있음
};

export default useIntersectionObserver;
