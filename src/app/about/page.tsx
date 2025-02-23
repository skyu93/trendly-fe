'use client';

import { Button } from '@/components/ui/button/Button';
import { Progress } from '@/components/ui/progress';
import FadeIn from '@/components/transition/FadeIn';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { ROUTE_PATH } from '@/constants/route';
import Image from 'next/image';
import Step1 from '@/assets/on-boarding/step-1.png';
import Step2 from '@/assets/on-boarding/step-2.png';
import Step3 from '@/assets/on-boarding/step-3.png';

const steps = [Step1, Step2, Step3];

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
}

// 실제 콘텐츠 컴포넌트
function PageContent() {
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

  const goToLogin = () => {
    router.push(ROUTE_PATH.LOGIN);
  };

  const getPercent = () => (step / steps.length) * 100;
  const currentStepImg = useMemo(() => steps[step - 1], [step]);

  return (
    <div className="w-full h-screen relative flex flex-col items-center justify-center">
      <FadeIn>
        <div className="m-4">
          <div className="absolute top-5 right-5 text-sm hover:cursor-pointer hover:font-bold" onClick={goToLogin}>
            SKIP
          </div>
          <div className="flex flex-col items-center text-center gap-6">
            <Image src={currentStepImg} alt="온보딩 이미지" />
            <Progress className="h-[2px]" value={getPercent()} />
            <Button className="w-full text-greyscale-90" onClick={nextStep}>
              {isFinished() ? '시작하기' : '계속'}
            </Button>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
