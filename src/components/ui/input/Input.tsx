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
    // 전달받은 value가 있으면 사용하고, 없으면 내부 상태 관리
    const isControlled = props.value !== undefined;
    const [internalValue, setInternalValue] = React.useState(props.defaultValue?.toString() || '');

    // 현재 표시할 값 (외부 제어 또는 내부 상태)
    const value = isControlled ? props.value?.toString() : internalValue;

    // number 타입 input의 화살표 UI 제거를 위한 스타일
    const numberInputStyle: React.CSSProperties =
      type === 'number'
        ? {
            WebkitAppearance: 'none',
            MozAppearance: 'textfield',
            appearance: 'textfield',
            margin: 0,
          }
        : {};

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = e.target.value;

      // number 타입인 경우 숫자만 입력 허용
      if (type === 'number') {
        newValue = newValue.replace(/[^0-9]/g, '');
      }

      // maxLength 적용
      if (maxLength) {
        newValue = newValue.slice(0, maxLength);
      }

      // 내부 상태 업데이트 (비제어 컴포넌트인 경우만)
      if (!isControlled) {
        setInternalValue(newValue);
      }

      // 원본 이벤트 객체의 값을 변경하여 상위 컴포넌트에 전달
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;

      if (nativeInputValueSetter) {
        nativeInputValueSetter.call(e.target, newValue);
        const event = new Event('input', { bubbles: true });
        e.target.dispatchEvent(event);
      }

      // onChange 콜백 호출
      if (props.onChange) {
        props.onChange(e);
      }
    };

    return (
      <div className="relative w-full">
        <input
          type={type === 'number' ? 'text' : type} // number 타입을 text로 변경하고 직접 제어
          className={cn(inputVariants({ variant, inputSize, inputWidth, dataType }), className)}
          ref={ref}
          value={value}
          onChange={handleChange}
          style={numberInputStyle}
          {...props}
          maxLength={undefined} // 직접 처리하므로 HTML maxLength 속성은 제거
        />
        {dataType === 'count' && maxLength && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
            {value?.length || 0}/{maxLength}자
          </div>
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input, inputVariants };
