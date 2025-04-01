'use client';

import React, { ReactNode, useEffect, useRef, useState, useCallback } from 'react';

interface VirtualScrollAreaProps<T> {
  items: T[];
  height: number;
  itemHeight: number;
  renderItem: (item: T, index: number) => ReactNode;
  className?: string;
  overscan?: number;
  onTopReached?: () => void;
  onBottomReached?: () => void;
  onScrollChange?: (scrollInfo: { scrollTop: number; isAtTop: boolean; isAtBottom: boolean }) => void;
  scrollRef?: React.RefObject<VirtualScrollRef | null>;
}

interface VirtualScrollRef {
  scrollToBottom: () => void;
  scrollToTop: () => void;
}

function VirtualScrollArea<T>({
  items,
  height,
  itemHeight,
  renderItem,
  className = '',
  overscan = 3,
  onTopReached,
  onBottomReached,
  onScrollChange,
  scrollRef: externalScrollRef,
}: VirtualScrollAreaProps<T>): React.ReactElement {
  const [scrollTop, setScrollTop] = useState(0);
  const internalScrollRef = useRef<HTMLDivElement>(null);

  const topSentinelRef = useRef<HTMLDivElement>(null);
  const bottomSentinelRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (internalScrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = internalScrollRef.current;
      setScrollTop(scrollTop);

      const isAtTop = scrollTop <= 0;
      const isAtBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

      if (onScrollChange) {
        onScrollChange({ scrollTop, isAtTop, isAtBottom });
      }
    }
  }, [onScrollChange]);

  useEffect(() => {
    if (!topSentinelRef.current || !bottomSentinelRef.current || !internalScrollRef.current) return;

    const topObserverOptions = {
      root: internalScrollRef.current,
      threshold: 0,
    };

    const bottomObserverOptions = {
      root: internalScrollRef.current,
      threshold: 0,
    };

    const topObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && onTopReached) {
          onTopReached();
        }
      });
    }, topObserverOptions);

    const bottomObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && onBottomReached) {
          onBottomReached();
        }
      });
    }, bottomObserverOptions);

    topObserver.observe(topSentinelRef.current);
    bottomObserver.observe(bottomSentinelRef.current);

    return () => {
      topObserver.disconnect();
      bottomObserver.disconnect();
    };
  }, [onTopReached, onBottomReached]);

  useEffect(() => {
    const scrollElement = internalScrollRef.current;
    if (!scrollElement) return;

    scrollElement.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      scrollElement.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    if (!externalScrollRef?.current) return;

    externalScrollRef.current.scrollToBottom = () => {
      if (internalScrollRef.current) {
        internalScrollRef.current.scrollTop = internalScrollRef.current.scrollHeight;
      }
    };

    externalScrollRef.current.scrollToTop = () => {
      if (internalScrollRef.current) {
        internalScrollRef.current.scrollTop = 0;
      }
    };
  }, [externalScrollRef]);

  const totalHeight = items.length * itemHeight;

  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(items.length - 1, Math.floor((scrollTop + height) / itemHeight) + overscan);

  const visibleItems = items.slice(startIndex, endIndex + 1).map((item, index) => {
    const actualIndex = startIndex + index;
    const itemStyle = {
      height: `${itemHeight}px`,
      position: 'absolute' as const,
      top: `${actualIndex * itemHeight}px`,
      left: 0,
      right: 0,
      overflow: 'hidden',
    };

    return (
      <div key={actualIndex} style={itemStyle}>
        {renderItem(item, actualIndex)}
      </div>
    );
  });

  if (items.length === 0) {
    return (
      <div
        ref={internalScrollRef}
        className={`virtual-scroll-area ${className}`}
        style={{
          height: `${height}px`,
          overflow: 'auto',
          position: 'relative',
        }}
      />
    );
  }

  return (
    <div
      ref={internalScrollRef}
      className={`virtual-scroll-area ${className}`}
      style={{
        height: `${height}px`,
        overflow: 'auto',
        position: 'relative',
      }}
    >
      <div
        ref={topSentinelRef}
        style={{
          position: 'absolute',
          top: 0,
          height: '1px',
          width: '100%',
        }}
      />

      <div
        className="virtual-scroll-content"
        style={{
          height: `${totalHeight}px`,
          position: 'relative',
        }}
      >
        {visibleItems}
      </div>

      <div
        ref={bottomSentinelRef}
        style={{
          position: 'absolute',
          bottom: 0,
          height: '1px',
          width: '100%',
        }}
      />
    </div>
  );
}

export { VirtualScrollArea, type VirtualScrollRef };
