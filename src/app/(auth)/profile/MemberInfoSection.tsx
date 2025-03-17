'use client';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button/Button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio/RadioGroup';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input/Input';
import { isEmpty, isNil, join } from 'es-toolkit/compat';
import { Gender, UserInfo } from '@/services/user/user.type';
import UserService from '@/services/user/userService';
import { useAuth } from '@/hooks/auth/useAuth';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import dayjs from 'dayjs';

interface Props {
  user: UserInfo;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
}

export function MemberInfoSection({ user, isEditing, setIsEditing }: Props) {
  const [gender, setGender] = useState<Gender | null>(user.gender);
  const [birthdate, setBirthdate] = useState<string>(user.birthDate ? join(user.birthDate.split('-'), '') : '');
  const userService = useMemo(() => new UserService(), []);
  const { setUser } = useAuth();
  const { handleError } = useErrorHandler();
  const toggleEdit = () => {
    const saveUser = async () => {
      try {
        const user = await userService.update({
          gender,
          birthdate: birthdate ? dayjs(birthdate, 'YYYYMMDD').format('YYYY-MM-DD') : birthdate,
        });
        if (user) {
          setUser(user);
        }
      } catch (error) {
        handleError(error);
      }
    };

    if (isEditing) {
      saveUser();
    }
    setIsEditing(!isEditing);
  };

  const birthdateLabel = useMemo(() => {
    if (isNil(birthdate) || isEmpty(birthdate)) {
      return '생년월일을 입력해주세요.';
    }
    return dayjs(birthdate, 'YYYYMMDD').format('YYYY년 MM월 DD일');
  }, [birthdate]);

  const handleBirthdateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBirthdate(event.target.value);
  };

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
                  defaultValue={gender as string}
                  className="flex items-center gap-x-4 text-greyscale-20"
                  onValueChange={(value: Gender) => setGender(value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="MALE" id="male" />
                    <Label htmlFor="MALE">남성</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="FEMALE" id="female" />
                    <Label htmlFor="FEMALE">여성</Label>
                  </div>
                </RadioGroup>
              ) : (
                <div className="text-greyscale-10">{gender ? (gender === 'MALE' ? '남성' : '여성') : '미선택'}</div>
              )}
            </div>
            <Separator className="bg-greyscale-80 my-3" />
            <div>
              <div className="text-greyscale-40 text-sm mb-1">생년월일</div>
              {isEditing ? (
                <Input
                  className="mt-4 mb-6"
                  maxLength={8}
                  type="number"
                  value={birthdate}
                  onChange={handleBirthdateInput}
                  placeholder="20000101"
                />
              ) : (
                <div className="text-greyscale-10">{birthdateLabel}</div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
