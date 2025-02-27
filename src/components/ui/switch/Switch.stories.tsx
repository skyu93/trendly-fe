import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from '@/components/ui/switch/Switch';

const meta: Meta<typeof Switch> = {
  title: 'ui/Switch',
  component: Switch,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
