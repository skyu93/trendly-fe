'use client';

import * as React from 'react';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import { cva } from 'class-variance-authority';
import { createPortal } from 'react-dom';

import { cn } from '@/lib/utils';

const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetClose = SheetPrimitive.Close;

// 커스텀 포털 컴포넌트 (containerSelector를 지원)
interface SheetCustomPortalProps extends SheetPrimitive.DialogPortalProps {
  containerSelector?: string;
}

const SheetPortal = ({ containerSelector = '#main', children, ...props }: SheetCustomPortalProps) => {
  const [portalContainer, setPortalContainer] = React.useState<Element | null>(null);

  React.useEffect(() => {
    if (containerSelector && typeof window !== 'undefined') {
      const container = document.querySelector(containerSelector);
      setPortalContainer(container);
    } else {
      setPortalContainer(null);
    }
  }, [containerSelector]);

  // 컨테이너가 지정되었고 찾을 수 있으면 createPortal 사용
  if (containerSelector && portalContainer) {
    return createPortal(children, portalContainer);
  }

  // 기본 Radix 포털 사용
  return <SheetPrimitive.Portal {...props}>{children}</SheetPrimitive.Portal>;
};

interface SheetOverlayProps extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay> {
  containerSelector?: string;
}

const SheetOverlay = React.forwardRef<React.ElementRef<typeof SheetPrimitive.Overlay>, SheetOverlayProps>(
  ({ className, containerSelector, ...props }, ref) => {
    // 컨테이너가 있으면 absolute, 없으면 fixed 포지션 사용
    const position = containerSelector ? 'absolute' : 'fixed';
    // 배경 필터 효과 추가 (반투명 배경 + 블러 효과)
    const overlayStyles = `${position} inset-0 z-50 bg-black/30 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0`;

    return <SheetPrimitive.Overlay className={cn(overlayStyles, className)} {...props} ref={ref} />;
  },
);
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

// 기본 Sheet 스타일
const baseSheetStyles = 'z-50 bg-background p-6 shadow-lg transition ease-in-out duration-300';

// 컨테이너 기반 Sheet 변형
const containerSheetVariants = cva(baseSheetStyles, {
  variants: {
    side: {
      top: 'absolute top-0 inset-x-0 border-b translate-y-[-100%] data-[state=open]:translate-y-0',
      bottom: 'absolute bottom-0 inset-x-0 border-t translate-y-[100%] data-[state=open]:translate-y-0',
      left: 'absolute left-0 inset-y-0 h-full border-r translate-x-[-100%] data-[state=open]:translate-x-0 w-3/4 sm:max-w-sm',
      right:
        'absolute right-0 inset-y-0 h-full border-l translate-x-[100%] data-[state=open]:translate-x-0 w-3/4 sm:max-w-sm',
    },
  },
  defaultVariants: {
    side: 'right',
  },
});

// 뷰포트 기반 Sheet 변형
const viewportSheetVariants = cva(baseSheetStyles, {
  variants: {
    side: {
      top: 'fixed inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
      bottom:
        'fixed inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
      left: 'fixed inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm',
      right:
        'fixed inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm',
    },
  },
  defaultVariants: {
    side: 'right',
  },
});

interface SheetContentProps extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content> {
  side?: 'top' | 'right' | 'bottom' | 'left';
  containerSelector?: string;
}

const SheetContent = React.forwardRef<React.ElementRef<typeof SheetPrimitive.Content>, SheetContentProps>(
  ({ side = 'right', className, children, containerSelector, ...props }, ref) => {
    // 컨테이너 지정 여부에 따라 다른 스타일 적용
    const variants = containerSelector ? containerSheetVariants({ side }) : viewportSheetVariants({ side });

    return (
      <SheetPortal containerSelector={containerSelector}>
        <SheetOverlay containerSelector={containerSelector} />
        <SheetPrimitive.Content ref={ref} className={cn(variants, className)} {...props}>
          {children}
        </SheetPrimitive.Content>
      </SheetPortal>
    );
  },
);
SheetContent.displayName = SheetPrimitive.Content.displayName;

const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-2 text-center sm:text-left', className)} {...props} />
);
SheetHeader.displayName = 'SheetHeader';

const SheetFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('absolute bottom-0 flex', className)} {...props} />
);
SheetFooter.displayName = 'SheetFooter';

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title ref={ref} className={cn('text-lg font-semibold text-foreground', className)} {...props} />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
