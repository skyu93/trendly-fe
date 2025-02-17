'use client';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import FadeIn from '@/components/transition/FadeIn';

export default function OnBoarding() {
  return (
    <div className="w-full h-screen relative flex flex-col items-center justify-center">
      <FadeIn>
        <div className="absolute top-5 right-5 text-sm cursor-pointer hover:font-bold">SKIP</div>
        <div className="flex flex-col items-center text-center">
          <div className="text-2xl font-bold mt-3">
            당신의 생각이 트렌드가 되는 순간
          </div>
          <Progress value={30} className="mt-4" />
          <Button className="w-full mt-5">계속</Button>
        </div>
      </FadeIn>

    </div>
  );
}
