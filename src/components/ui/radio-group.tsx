'use client';

import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { Circle } from 'lucide-react';

import { cn } from '@/lib/utils';

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return <RadioGroupPrimitive.Root className={cn('grid gap-2', className)} {...props} ref={ref} />;
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & { children?: React.ReactNode }
>(({ className, children, disabled, ...props }, ref) => {
  return (
    <div className="flex items-center space-x-2">
      <RadioGroupPrimitive.Item
        ref={ref}
        className={cn(
          'aspect-square h-4 w-4 rounded-full border border-greyscale-20 text-greyscale-20 transition-colors',
          'hover:border-greyscale-30 hover:text-greyscale-30',
          'data-[state=checked]:border-red-500 data-[state=checked]:text-red-500',
          'focus:outline-none focus-visible:ring-1 focus-visible:ring-ring',
          'disabled:cursor-not-allowed disabled:opacity-50 disabled:border-gray-200 disabled:text-gray-200 disabled:hover:border-gray-200 disabled:hover:text-gray-200',
          'disabled:data-[state=checked]:border-gray-200 disabled:data-[state=checked]:text-gray-200',
          className,
        )}
        disabled={disabled}
        {...props}
      >
        <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
          <Circle className="h-3.5 w-3.5 fill-current" />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
      {children && (
        <label
          htmlFor={props.id}
          className={cn(
            'text-red-600 cursor-pointer transition-colors',
            'hover:text-gray-300',
            { 'text-red-500': props.value === props.id },
            { 'text-gray-200 cursor-not-allowed': disabled },
          )}
        >
          {children}
        </label>
      )}
    </div>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
