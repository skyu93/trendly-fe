'use client';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button/Button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio/RadioGroup';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input/Input';
import { join } from 'es-toolkit/compat';

type MemberInfo = {
  email: string;
  gender: string;
  birthdate: string;
  marketingConsent: boolean;
};

interface Props {
  memberInfo: MemberInfo;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
}

export function MemberInfoSection({ memberInfo, isEditing, setIsEditing }: Props) {
  const [gender, setGender] = useState(memberInfo.gender);
  const [birthdate] = useState(join(memberInfo.birthdate.split('-'), ''));

  const toggleEdit = () => {
    if (isEditing) {
      // 저장 로직 추가 가능
      // 예: saveUserInfo({ gender, birthdate })
    }
    setIsEditing(!isEditing);
  };

  const birthdateLabel = useMemo(() => {
    const [year, month, day] = memberInfo.birthdate.split('-');
    return `${year}년 ${month}월 ${day}일`;
  }, [memberInfo.birthdate]);

  // const handleDateInput = (date: string) => {
  //   setBirthdate(date);
  // };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-greyscale-10 font-bold text-sm">회원 정보</h2>
        <Button
          className={`text-xs p-0 h-auto ${isEditing ? 'text-primary-60' : 'text-greyscale-20'} bg-transparent hover:bg-transparent hover:text-primary-60`}
          onClick={toggleEdit}
        >
          {isEditing ? '저장' : '수정'}
        </Button>
      </div>
      <Card className="bg-[#1C1C1C] border-none rounded-xl">
        <CardContent className="p-4">
          <div className="space-y-4">
            <div>
              <div className="text-greyscale-40 text-sm mb-2">성별</div>
              {isEditing ? (
                <RadioGroup
                  defaultValue={gender}
                  className="flex items-center gap-x-4 text-greyscale-20"
                  onValueChange={value => setGender(value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">남성</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">여성</Label>
                  </div>
                </RadioGroup>
              ) : (
                <div className="text-greyscale-10">{gender === 'male' ? '남성' : '여성'}</div>
              )}
            </div>
            <Separator className="bg-greyscale-80 my-3" />
            <div>
              <div className="text-greyscale-40 text-sm mb-1">생년월일</div>
              {isEditing ? (
                <Input className="mt-4 mb-6" maxLength={8} type="number" value={birthdate} placeholder="20000101" />
              ) : (
                // <DateInput value={memberInfo.birthdate} onChange={handleDateInput} />
                <div className="text-greyscale-10">{birthdateLabel}</div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
