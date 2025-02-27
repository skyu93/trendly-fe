import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio/RadioGroup';
import { Label } from '@/components/ui/label';

const meta: Meta<typeof RadioGroup> = {
  title: 'ui/Radio',
  component: RadioGroup,
  argTypes: {},
  args: {},
};

export default meta;

type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render() {
    return (
      <RadioGroup defaultValue="option-one" className="text-greyscale-20">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-one" id="option-one" />
          <Label htmlFor="option-one">Option One</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="option-two" id="option-two" />
          <Label htmlFor="option-two">Option Two</Label>
        </div>
      </RadioGroup>
    );
  },
};
