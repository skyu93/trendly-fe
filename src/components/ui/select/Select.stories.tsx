import type { Meta, StoryObj } from '@storybook/react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select/Select';

const meta: Meta<typeof Select> = {
  title: 'ui/Select',
  component: Select,
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 Select 컴포넌트 예시입니다.
 */
export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[180px]">
        {/*<SelectValue placeholder="테마 선택"/>*/}
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="light">라이트</SelectItem>
          <SelectItem value="dark">다크</SelectItem>
          <SelectItem value="system">시스템</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

/**
 * 비활성화된 Select 컴포넌트 예시입니다.
 */
export const Disabled: Story = {
  render: () => (
    <Select>
      <SelectTrigger disabled className="w-[180px]">
        <SelectValue placeholder="비활성화됨" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="option">옵션</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

/**
 * 비활성화된 옵션이 있는 Select 컴포넌트입니다.
 */
export const DisabledOption: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="옵션 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="option1">옵션 1</SelectItem>
          <SelectItem value="option2" disabled>
            옵션 2 (비활성화)
          </SelectItem>
          <SelectItem value="option3">옵션 3</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

/**
 * 다양한 크기의 Select 컴포넌트입니다.
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col space-y-4">
      <Select>
        <SelectTrigger className="w-[180px] h-8 text-xs">
          <SelectValue placeholder="작은 크기" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="small">작은 크기</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="기본 크기" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="default">기본 크기</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-[180px] h-11 text-base">
          <SelectValue placeholder="큰 크기" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="large">큰 크기</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

/**
 * 스크롤이 필요한 긴 목록의 Select 컴포넌트입니다.
 */
export const LongList: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="월 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="1">1월</SelectItem>
          <SelectItem value="2">2월</SelectItem>
          <SelectItem value="3">3월</SelectItem>
          <SelectItem value="4">4월</SelectItem>
          <SelectItem value="5">5월</SelectItem>
          <SelectItem value="6">6월</SelectItem>
          <SelectItem value="7">7월</SelectItem>
          <SelectItem value="8">8월</SelectItem>
          <SelectItem value="9">9월</SelectItem>
          <SelectItem value="10">10월</SelectItem>
          <SelectItem value="11">11월</SelectItem>
          <SelectItem value="12">12월</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};
