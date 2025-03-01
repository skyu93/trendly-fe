import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select/Select';
import { useDate } from '@/hooks/useDate';
import { map } from 'es-toolkit/compat';

interface MonthSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const MonthSelector: React.FC<MonthSelectorProps> = ({ value, onChange }) => {
  const { months } = useDate();
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="bg-transparent border-greyscale-80">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {map(months, month => (
            <SelectItem key={month} value={month}>
              {`${month}월`}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default MonthSelector;
