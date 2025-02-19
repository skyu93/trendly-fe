'use client';

import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import FadeIn from '@/components/transition/FadeIn';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { ROUTE_PATH } from '@/constants/route';

const steps = ['기본 정보', '세부 정보', '완료'];

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);

  useEffect(() => {
    const stepFromQuery = Number(searchParams.get('step')) || 1;
    setStep(stepFromQuery);
  }, [searchParams]);

  const isFinished = () => step >= steps.length;

  const nextStep = () => {
    if (isFinished()) {
      goToLogin();
      return;
    }
    router.push(`${ROUTE_PATH.ABOUT}?step=${step + 1}`);
  };

  // const prevStep = () => {
  //   if (step <= 1) {
  //     return;
  //   }
  //   router.push(`${ROUTE_PATH.ABOUT}?step=${step - 1}`);
  // };

  const goToLogin = () => {
    router.push(ROUTE_PATH.LOGIN);
  };
  const getPercent = () => (step / steps.length) * 100;

  return (
    <div className="w-full h-screen relative flex flex-col items-center justify-center">
      <Suspense fallback={<div>Loading...</div>}>
        <FadeIn>
          <div className="m-4">
            <div className="absolute top-5 right-5 text-sm cursor-pointer hover:font-bold" onClick={goToLogin}>
              SKIP
            </div>
            <div className="flex flex-col items-center text-center gap-6">
              <div className="text-2xl font-bold mt-3">당신의 생각이 트렌드가 되는 순간</div>
              <Progress value={getPercent()} />
              <Button className="w-full" onClick={nextStep}>
                {isFinished() ? '시작하기' : '계속'}
              </Button>
            </div>
          </div>
        </FadeIn>
      </Suspense>
    </div>
  );
}
