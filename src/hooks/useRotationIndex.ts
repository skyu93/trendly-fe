import { useState, useRef, useEffect } from 'react';

interface UseRotatingIndexProps {
  listLength: number;
  intervalTime?: number;
  initialIndex?: number;
  pauseOnHover?: boolean;
}

const useRotatingIndex = ({
  listLength,
  intervalTime = 1500,
  initialIndex = 0,
  pauseOnHover = true,
}: UseRotatingIndexProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(initialIndex);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isHovered || !pauseOnHover) {
      // 이전 인터벌이 있다면 정리
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      // 새 인터벌 설정
      intervalRef.current = setInterval(() => {
        setActiveIndex(prevIndex => (prevIndex + 1) % listLength);
      }, intervalTime);
    } else if (intervalRef.current) {
      // 호버 상태이고 pauseOnHover가 true라면 인터벌 정지
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // 컴포넌트 언마운트 시 정리
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovered, listLength, intervalTime, pauseOnHover]);

  // 호버 핸들러
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return {
    activeIndex,
    handleMouseEnter,
    handleMouseLeave,
  };
};

export default useRotatingIndex;
