'use client';

import * as React from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';

// Context 생성
interface DrawerContextProps {
  containerSelector?: string;
}

const DrawerContext = React.createContext<DrawerContextProps>({
  containerSelector: undefined,
});

// Context Hook
const useDrawerContext = () => React.useContext(DrawerContext);

// Drawer 루트 컴포넌트 수정 - fadeFromIndex 속성 추가 처리
type DrawerProps = React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Root> & {
  containerSelector?: string;
};

const Drawer = ({ shouldScaleBackground = true, containerSelector = '#main', ...props }: DrawerProps) => {
  return (
    <DrawerContext.Provider value={{ containerSelector }}>
      <DrawerPrimitive.Root shouldScaleBackground={shouldScaleBackground} {...props} />
    </DrawerContext.Provider>
  );
};
Drawer.displayName = 'Drawer';

const DrawerTrigger = DrawerPrimitive.Trigger;

// 포털 컴포넌트 수정
const DrawerPortal = (props: React.ComponentProps<typeof DrawerPrimitive.Portal>) => {
  const { containerSelector } = useDrawerContext();
  const [container, setContainer] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    if (containerSelector) {
      const element = document.querySelector(containerSelector) as HTMLElement;
      if (element) {
        setContainer(element);
      }
    }
  }, [containerSelector]);

  // 컨테이너가 있으면 createPortal 사용, 없으면 기본 Portal 사용
  return container ? createPortal(props.children, container) : <DrawerPrimitive.Portal {...props} />;
};
DrawerPortal.displayName = 'DrawerPortal';

const DrawerClose = DrawerPrimitive.Close;

// 오버레이 컴포넌트 수정
const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => {
  const { containerSelector } = useDrawerContext();

  // container가 있으면 fixed 대신 absolute 사용하고 위치 조정
  const overlayStyles = containerSelector ? 'absolute inset-0 z-40 bg-black/80' : 'fixed inset-0 z-40 bg-black/80';

  return <DrawerPrimitive.Overlay ref={ref} className={cn(overlayStyles, className)} {...props} />;
});
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

// 컨텐츠 컴포넌트 수정
const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  const { containerSelector } = useDrawerContext();

  // container가 있으면 fixed 대신 absolute 사용하고 위치 조정
  const contentStyles = containerSelector
    ? 'absolute bottom-0 left-0 right-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background'
    : 'fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background';

  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Content ref={ref} className={cn(contentStyles, className)} {...props}>
        {/*<div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />*/}
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
});
DrawerContent.displayName = 'DrawerContent';

const DrawerHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('grid gap-1.5 p-4 text-center sm:text-left', className)} {...props} />
);
DrawerHeader.displayName = 'DrawerHeader';

const DrawerFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('mt-auto flex flex-col gap-2 p-4', className)} {...props} />
);
DrawerFooter.displayName = 'DrawerFooter';

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold leading-none tracking-tight', className)}
    {...props}
  />
));
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
));
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
