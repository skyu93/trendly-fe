import * as React from 'react';

import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const inputVariants = cva(
  'flex rounded-[32px] text-white transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-greyscale-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:bg-greyscale-50 disabled:text-greyscale-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 placeholder:text-greyscale-50',
  {
    variants: {
      variant: {
        default: 'bg-greyscale-80 hover:bg-greyscale-70',
        error: 'border-[#E97979] text-red-900 focus-visible:ring-red-500',
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
        brith: 'rounded-[12px] border border-input text-center',
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
  dataType?: 'default' | 'brith' | 'count';
  maxLength?: number; // maxLength 지원
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, inputSize, inputWidth, dataType, maxLength = 10, ...props }, ref) => {
    const [value, setValue] = React.useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (maxLength) {
        setValue(e.target.value.slice(0, maxLength)); // maxLength 초과 방지
      } else {
        setValue(e.target.value);
      }
      if (props.onChange) props.onChange(e);
    };

    return (
      <div className="relative w-full">
        <input
          type={type}
          className={cn(inputVariants({ variant, inputSize, inputWidth, dataType }), className)}
          ref={ref}
          maxLength={maxLength}
          value={value}
          onChange={handleChange}
          {...props}
        />
        {dataType === 'count' && maxLength && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
            {value.length}/{maxLength}자
          </div>
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input, inputVariants };
