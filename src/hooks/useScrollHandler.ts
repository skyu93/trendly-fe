'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface ScrollHandlerOptions {
  bottomThreshold?: number;
  scrollUpThreshold?: number;
  onIntersecting?: () => void; // 외부에서 받을 콜백 함수
}

export const useScrollHandler = (options?: ScrollHandlerOptions) => {
  const defaultOptions = {
    bottomThreshold: 10, // 스크롤이 맨 아래인지 판단하는 여유 공간 (픽셀)
    scrollUpThreshold: 300, // 스크롤 버튼 표시 임계값 (픽셀)
    onIntersecting: () => {}, // 기본 빈 함수
  };

  const { bottomThreshold, scrollUpThreshold, onIntersecting } = { ...defaultOptions, ...options };

  const containerRef = useRef<HTMLDivElement>(null);
  const topObserverRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef<boolean>(false);
  const isLoadingPrevious = useRef<boolean>(false);
  const [showScrollButton, setShowScrollButton] = useState<boolean>(false);
  const [visibleScrollThumb, setVisibleScrollThumb] = useState<boolean>(false);

  const isAtBottom = useCallback((): boolean => {
    if (!containerRef.current) return true;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    return scrollHeight - scrollTop - clientHeight <= bottomThreshold;
  }, [bottomThreshold]);

  const scrollToBottom = useCallback((behavior: ScrollBehavior = 'smooth'): void => {
    if (!containerRef.current) return;

    containerRef.current.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior,
    });

    isScrolling.current = false;
    setShowScrollButton(false);
  }, []);

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const isScrolledUp = scrollHeight - scrollTop - clientHeight > scrollUpThreshold;

    setShowScrollButton(isScrolledUp);
    isScrolling.current = !isAtBottom();
  }, [isAtBottom, scrollUpThreshold]);

  // 상단 관찰자 설정 (무한 스크롤)
  useEffect(() => {
    if (!topObserverRef.current) return;

    const topObserverOptions = {
      root: containerRef.current,
      threshold: 0.1,
      rootMargin: '400px',
    };

    const observedElement = topObserverRef.current;
    const observer = new IntersectionObserver(entries => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        onIntersecting();
      }
    }, topObserverOptions);

    observer.observe(observedElement);
    return () => observer.unobserve(observedElement);
  }, [onIntersecting]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return {
    containerRef,
    topObserverRef,
    isScrolling,
    isLoadingPrevious,
    showScrollButton,
    visibleScrollThumb,
    setVisibleScrollThumb,
    isAtBottom,
    scrollToBottom,
    handleScroll,
  };
};
