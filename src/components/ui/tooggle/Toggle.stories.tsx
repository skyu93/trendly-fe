import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from '@/components/ui/tooggle/Toggle';
import { Check } from 'lucide-react';

const meta: Meta<typeof Toggle> = {
  title: 'ui/Toggle',
  component: Toggle,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;

export const Default: StoryObj<typeof Toggle> = {
  args: {
    children: <Check className="h-4 w-4" />,
  },
};
