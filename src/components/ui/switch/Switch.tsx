'use client';
import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import { cn } from '@/lib/utils';

// 사이즈 옵션 타입 정의
type SwitchSize = 'sm' | 'md' | 'lg';

// Props 인터페이스에 size 프로퍼티 추가
interface SwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
  size?: SwitchSize;
}

const Switch = React.forwardRef<React.ElementRef<typeof SwitchPrimitives.Root>, SwitchProps>(
  ({ className, size = 'md', ...props }, ref) => {
    // 사이즈별 스타일 정의
    const sizeStyles = {
      sm: {
        switch: 'h-4 w-7',
        thumb: 'h-3 w-3 data-[state=checked]:translate-x-3 data-[state=unchecked]:translate-x-0.5',
      },
      md: {
        switch: 'h-5 w-9',
        thumb: 'h-4 w-4 data-[state=checked]:translate-x-3.5 data-[state=unchecked]:translate-x-0.5',
      },
      lg: {
        switch: 'h-[28px] w-[46px]',
        thumb: 'h-[24px] w-[24px] data-[state=checked]:translate-x-[18px] data-[state=unchecked]:translate-x-[2px]',
      },
    };

    return (
      <SwitchPrimitives.Root
        className={cn(
          'peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:data-[state=checked]:bg-greyscale-40 data-[state=checked]:bg-primary data-[state=unchecked]:bg-greyscale-30 disabled:data-[state=unchecked]:bg-greyscale-40',
          sizeStyles[size].switch,
          className,
        )}
        {...props}
        ref={ref}
      >
        <SwitchPrimitives.Thumb
          className={cn(
            'pointer-events-none block rounded-full bg-white shadow-lg ring-0 transition-transform',
            sizeStyles[size].thumb,
          )}
        />
      </SwitchPrimitives.Root>
    );
  },
);
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
