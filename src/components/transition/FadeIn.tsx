import { ReactNode, useEffect, useState } from 'react';

interface Props {
  children: ReactNode;
}
export default function FadeIn({ children }: Props ) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className={`opacity-0 transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : ''
      }`}
    >
      {children}
    </div>
  );
}
