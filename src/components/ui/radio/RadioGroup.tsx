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
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, disabled, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        'group aspect-square h-4 w-4 rounded-full border border-greyscale-30 text-greyscale-20 focus:outline-none focus-visible:ring-1 focus-visible:ring-ring',
        'data-[state=checked]:border-primary-60 hover:data-[state=checked]:border-primary-70',
        'hover:border-greyscale-40',
        'disabled:cursor-not-allowed disabled:border-greyscale-50 disabled:text-greyscale-60',
        'disabled:data-[state=checked]:border-greyscale-50 disabled:data-[state=checked]:text-greyscale-60',
        className,
      )}
      disabled={disabled}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle
          className={cn(
            'h-2 w-2',
            disabled
              ? 'fill-greyscale-50 text-greyscale-50'
              : 'fill-primary-70 text-primary-60 group-hover:fill-primary-80 group-hover:text-primary-80',
          )}
        />
      </RadioGroupPrimitive.Indicator>
      <span className="text-white">{disabled}</span>
    </RadioGroupPrimitive.Item>
  );
});

RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
