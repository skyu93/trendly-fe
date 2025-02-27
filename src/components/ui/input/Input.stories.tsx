import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@/components/ui/input/Input';

const meta: Meta<typeof Input> = {
  title: 'ui/Input',
  component: Input,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error'],
    },
    inputSize: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
    },
    inputWidth: {
      control: 'select',
      options: ['default', 'auto'],
    },
    dataType: {
      control: 'select',
      options: ['default', 'brith', 'count'],
    },
    placeholder: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
  },
  args: {
    variant: 'default',
    inputSize: 'default',
    inputWidth: 'default',
    dataType: 'default',
    placeholder: '내용을 입력하세요.',
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const Large: Story = {
  args: {
    inputSize: 'lg',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    placeholder: 'Error state',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled input',
  },
};
