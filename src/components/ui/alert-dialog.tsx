'use client';

import * as React from 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { createPortal } from 'react-dom';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button/Button';

// AlertDialog에 containerSelector prop 추가
interface AlertDialogProps extends AlertDialogPrimitive.AlertDialogProps {
  containerSelector?: string;
}

const AlertDialog = ({ containerSelector, ...props }: AlertDialogProps) => {
  return (
    <AlertDialogContext.Provider value={{ containerSelector }}>
      <AlertDialogPrimitive.Root {...props} />
    </AlertDialogContext.Provider>
  );
};
AlertDialog.displayName = 'AlertDialog';

// Context 설정
interface AlertDialogContextProps {
  containerSelector?: string;
}

const AlertDialogContext = React.createContext<AlertDialogContextProps>({});

// Context Hook
const useAlertDialogContext = () => React.useContext(AlertDialogContext);

const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

// 커스텀 포털 컴포넌트
const AlertDialogPortal = ({ children, ...props }: AlertDialogPrimitive.AlertDialogPortalProps) => {
  const { containerSelector } = useAlertDialogContext();
  const [container, setContainer] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    if (containerSelector) {
      const element = document.querySelector(containerSelector) as HTMLElement;
      if (element) {
        setContainer(element);
      }
    }
  }, [containerSelector]);

  // 컨테이너가 있으면 createPortal 사용, 없으면 기본 Portal 사용
  return container ? (
    createPortal(children, container)
  ) : (
    <AlertDialogPrimitive.Portal {...props}>{children}</AlertDialogPrimitive.Portal>
  );
};
AlertDialogPortal.displayName = 'AlertDialogPortal';

// 오버레이 컴포넌트
const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => {
  const { containerSelector } = useAlertDialogContext();

  // container가 있으면 fixed 대신 absolute 사용
  const positionClass = containerSelector ? 'absolute inset-0 z-50' : 'fixed inset-0 z-50';

  return (
    <AlertDialogPrimitive.Overlay
      className={cn(
        `${positionClass} bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0`,
        className,
      )}
      {...props}
      ref={ref}
    />
  );
});
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

// 컨텐츠 컴포넌트
const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => {
  const { containerSelector } = useAlertDialogContext();

  // container가 있으면 fixed 대신 absolute 사용
  const positionClass = containerSelector ? 'absolute left-[50%] top-[50%] z-50' : 'fixed left-[50%] top-[50%] z-50';

  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        ref={ref}
        className={cn(
          `${positionClass} grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg`,
          className,
        )}
        {...props}
      />
    </AlertDialogPortal>
  );
});
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

const AlertDialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-2 text-center sm:text-left', className)} {...props} />
);
AlertDialogHeader.displayName = 'AlertDialogHeader';

const AlertDialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col gap-2', className)} {...props} />
);
AlertDialogFooter.displayName = 'AlertDialogFooter';

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn('text-xl font-semibold text-greyscale-10 text-center', className)}
    {...props}
  />
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description ref={ref} className={cn('text-sm text-greyscale-10', className)} asChild {...props}>
    <div>{props.children}</div>
  </AlertDialogPrimitive.Description>
));
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(buttonVariants(), 'bg-white text-greyscale-90', className)}
    {...props}
  />
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel ref={ref} className={cn(buttonVariants({ variant: 'outline' }), className)} {...props} />
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
