'use client';

import { Button } from '@/components/ui/button/Button';
import { Progress } from '@/components/ui/progress';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useCallback, useEffect, useState } from 'react';
import { ROUTE_PATH } from '@/constants/route';
import Image from 'next/image';
import Step1 from '@/assets/on-boarding/step-1.png';
import Step2 from '@/assets/on-boarding/step-2.png';
import Step3 from '@/assets/on-boarding/step-3.png';
import { Splash } from '@/components/Splash';
import { map } from 'es-toolkit/compat';

const STEPS = [
  { image: Step1, alt: '온보딩 1단계' },
  { image: Step2, alt: '온보딩 2단계' },
  { image: Step3, alt: '온보딩 3단계' },
];
const splashDelay = () => new Promise<void>(resolve => setTimeout(resolve, 3000));

export default function Page() {
  return (
    <Suspense fallback={<Splash />}>
      <PageContent />
    </Suspense>
  );
}

function PageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [imagesPreloaded, setImagesPreloaded] = useState<boolean>(false);

  useEffect(() => {
    const stepFromQuery = Number(searchParams.get('step')) || 1;
    setStep(stepFromQuery > STEPS.length ? STEPS.length : stepFromQuery);
  }, [searchParams]);

  useEffect(() => {
    // 모든 이미지 미리 로드
    const preloadImages = async () => {
      try {
        // 이미지 프리로드 처리
        await Promise.all([
          ...map(STEPS, step => {
            return new Promise<void>(resolve => {
              const img = new window.Image();
              img.src = step.image.src;
              img.onload = () => resolve();
              img.onerror = () => resolve(); // 에러 발생시에도 진행
            });
          }),
          splashDelay(),
        ]);
        setImagesPreloaded(true);
      } catch (error) {
        console.error(error);
        setImagesPreloaded(true); // 에러가 발생하더라도 계속 진행
      }
    };

    preloadImages();
  }, []);

  const isLastStep = step >= STEPS.length;

  const handleNextStep = useCallback(() => {
    if (isLastStep) {
      router.push(ROUTE_PATH.LOGIN);
      return;
    }
    router.push(`${ROUTE_PATH.ABOUT}?step=${step + 1}`);
  }, [isLastStep, router, step]);

  const handleSkip = useCallback(() => {
    router.push(ROUTE_PATH.LOGIN);
  }, [router]);

  const progressPercent = (step / STEPS.length) * 100;

  if (!imagesPreloaded) {
    return <Splash />;
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="absolute top-5 right-5 text-sm hover:cursor-pointer hover:font-bold" onClick={handleSkip}>
        건너뛰기
      </div>
      <div className="w-full flex flex-col items-center text-center gap-8">
        {STEPS.map((stepItem, index) => (
          <div key={`step-image-${index}`} className={`${index === step - 1 ? 'block w-full' : 'hidden'}`}>
            <Image src={stepItem.image} alt={stepItem.alt} priority={true} className="w-full h-auto object-contain" />
          </div>
        ))}

        <div className="w-full px-3">
          <Progress className="h-[2px] w-full" value={progressPercent} />
        </div>

        <div className="w-full px-3">
          <Button className="w-full text-greyscale-90" onClick={handleNextStep}>
            {isLastStep ? '시작하기' : '계속'}
          </Button>
        </div>
      </div>
    </div>
  );
}
