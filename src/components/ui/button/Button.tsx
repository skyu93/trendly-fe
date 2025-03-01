import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:bg-greyscale-20 disabled:text-greyscale-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary-40 text-greyscale-90 hover:bg-primary-70',
        secondary: 'bg-greyscale-80 text-primary-60 hover:bg-greyscale-70',
        tertiary: 'bg-white text-greyscale-90 hover:bg-greyscale-30',
        outline: 'border border-greyscale-70 text-white hover:bg-greyscale-80 hover:bg-greyscale-10',
      },
      size: {
        default: 'h-20 px-3 py-1 text-sm font-bold',
        sm: 'h-8 px-3 py-1 text-xs',
        lg: 'h-[42px] px-3 py-1 px-3 font-bold',
        icon: 'h-8 w-8 px-3 py-1',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, ...props }, ref) => {
  return <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = 'Button';

export { Button, buttonVariants };
