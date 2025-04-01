import * as React from 'react';

import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const inputVariants = cva(
  'flex rounded-[32px] text-white transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-greyscale-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:bg-greyscale-50 disabled:text-greyscale-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 placeholder:text-greyscale-50',
  {
    variants: {
      variant: {
        default: 'bg-greyscale-80 hover:bg-greyscale-70',
        error: 'border border-[#DD5873] bg-greyscale-80',
      },
      inputSize: {
        default: 'h-10 p-3 text-sm',
        sm: 'h-8 p-3 text-sm',
        lg: 'h-[42px] p-3 text-sm',
      },
      inputWidth: {
        default: 'w-full',
        auto: 'w-auto',
      },
      dataType: {
        default: '',
        count: 'relative pr-12', // 글자 수 표시 공간 확보
      },
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'default',
      inputWidth: 'default',
      dataType: 'default',
    },
  },
);

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {
  dataType?: 'default' | 'count';
  maxLength?: number;
  errorMessage?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      variant,
      inputSize,
      inputWidth,
      onChange,
      dataType,
      maxLength = 10,
      errorMessage,
      autoFocus = false,
      ...props
    },
    ref,
  ) => {
    // 전달받은 value가 있으면 사용하고, 없으면 내부 상태 관리
    const isControlled = props.value !== undefined;
    const value = isControlled ? props.value?.toString() : props.defaultValue?.toString() || '';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!onChange) {
        return;
      }

      if (type === 'number') {
        // 숫자와 부호, 소수점만 남기고 모두 제거
        let newValue = e.target.value.replace(/[^\d.-]/g, '');

        // maxLength 적용
        if (maxLength && newValue.length > maxLength) {
          newValue = newValue.slice(0, maxLength);
        }

        e.target.value = newValue;
      } else if (maxLength && e.target.value.length > maxLength) {
        // number 타입이 아닌 경우에도 maxLength 확인
        e.target.value = e.target.value.slice(0, maxLength);
      }

      onChange(e);
    };

    return (
      <div className={`relative w-full ${className}`}>
        <input
          type={type}
          className={cn(inputVariants({ variant, inputSize, inputWidth, dataType }))}
          ref={ref}
          value={value}
          {...props}
          onChange={handleChange}
          autoFocus={autoFocus}
        />
        {dataType === 'count' && maxLength && (
          <div className="absolute right-3 top-3 text-xs text-muted-foreground">
            {value?.length || 0}/{maxLength}자
          </div>
        )}
        {errorMessage && <div className="w-full justify-start text-xs text-[#DD5873] pl-3 mt-3">{errorMessage}</div>}
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input, inputVariants };
