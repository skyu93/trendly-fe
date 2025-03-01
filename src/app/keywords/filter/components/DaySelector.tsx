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

interface DaySelectorProps {
  value: string;
  onChange: (value: string) => void;
  year?: string;
  month?: string;
}

const DaySelector: React.FC<DaySelectorProps> = ({ value, onChange, year, month }) => {
  const { days } = useDate({ year, month });
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="bg-transparent border-greyscale-80">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {map(days, day => (
            <SelectItem key={day} value={day}>
              {`${day}일`}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default DaySelector;
