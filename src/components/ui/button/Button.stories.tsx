import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/ui/button/Button';

const meta: Meta<typeof Button> = {
  title: 'ui/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'outline', 'tertiary'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'default',
    children: 'Button',
  },
};
