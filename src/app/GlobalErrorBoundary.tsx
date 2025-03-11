'use client';

import React, { ReactNode } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useErrorHandler } from '@/hooks/useErrorHandler';

export default function GlobalErrorBoundary({ children }: { children: ReactNode }) {
  const { isError, setError } = useErrorHandler();
  return (
    <>
      <AlertDialog open={isError}>
        <AlertDialogContent className="w-[80%]">
          <AlertDialogHeader>
            <AlertDialogTitle>Oops!</AlertDialogTitle>
            <AlertDialogDescription className="flex flex-col items-center justify-center text-greyscale-30">
              <span className="text-xs">문제가 발생했어요...</span>
              <span className="text-xs">새로고침 하거나 다시 시도하면 괜찮아질 거예요!</span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className="h-12" onClick={() => setError(null)}>
              확인
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {children}
    </>
  );
}
