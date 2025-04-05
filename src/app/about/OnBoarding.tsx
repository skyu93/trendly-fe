'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { map } from 'es-toolkit/compat';
import { ROUTE_PATH } from '@/constants/route';
import Image from 'next/image';
import Step1 from '@/assets/on-boarding/step-1.webp';
import Step2 from '@/assets/on-boarding/step-2.webp';
import Step3 from '@/assets/on-boarding/step-3.webp';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button/Button';
import { useUser } from '@/hooks/user/useUser';

const STEPS = [
  { image: Step1, alt: '온보딩 1단계' },
  { image: Step2, alt: '온보딩 2단계' },
  { image: Step3, alt: '온보딩 3단계' },
];

export default function OnBoarding() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const { isAuthenticated, refreshAuthState } = useUser();

  useEffect(() => {
    refreshAuthState();
  }, [refreshAuthState]);

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
        ]);
      } catch (error) {
        console.error(error);
      }
    };

    preloadImages();
  }, []);

  const isLastStep = step >= STEPS.length;

  const handleNextStep = () => {
    if (isLastStep) {
      if (isAuthenticated()) {
        router.push(ROUTE_PATH.KEYWORDS);
      } else {
        router.push(ROUTE_PATH.LOGIN);
      }
      return;
    }
    router.push(`${ROUTE_PATH.ABOUT}?step=${step + 1}`);
  };

  const handleSkip = () => {
    if (isAuthenticated()) {
      router.push(ROUTE_PATH.KEYWORDS);
    } else {
      router.push(ROUTE_PATH.LOGIN);
    }
  };
  const progressPercent = (step / STEPS.length) * 100;

  // 각 단계별 컨텐츠 렌더링
  const renderStepContent = () => {
    if (step === 1) {
      return (
        <div className="w-full">
          <Image src={Step1} alt="온보딩 1단계" priority={true} className="w-full h-[343px] object-contain" />
          <div className="flex flex-col font-bold my-14">
            <span className="text-primary-10">
              흩어져 있는 <span className="text-primary-70">트렌트 키워드!</span>
            </span>
            <span className="text-primary-10">한번에 확인하고 소통하고 싶다면</span>
          </div>
        </div>
      );
    } else if (step === 2) {
      return (
        <div className="w-full">
          <Image src={Step2} alt="온보딩 2단계" priority={true} className="w-full h-[343px] object-contain" />
          <div className="flex flex-col font-bold my-14">
            <span className="text-primary-10">다양한 플랫폼에서</span>
            <span className="text-primary-10">
              <span className="text-primary-70">가장 핫한 키워드</span>를 확인하고
            </span>
          </div>
        </div>
      );
    } else if (step === 3) {
      return (
        <div className="w-full">
          <Image src={Step3} alt="온보딩 3단계" priority={true} className="w-full h-[343px] object-contain" />
          <div className="flex flex-col font-bold my-14">
            <span className="text-primary-10">
              실시간으로 <span className="text-primary-60">대화, 공감</span>하고
            </span>
            <span className="text-primary-10">
              <span className="text-primary-60">댓글</span>을 남겨보세요
            </span>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div
        className="absolute top-0 w-full h-12 px-4 flex items-center justify-end text-sm hover:cursor-pointer hover:font-bold"
        onClick={handleSkip}
      >
        <span>건너뛰기</span>
      </div>
      <div className="w-full flex flex-col items-center text-center gap-8">
        {renderStepContent()}

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
