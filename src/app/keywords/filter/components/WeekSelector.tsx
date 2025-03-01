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

const WeekSelector: React.FC<DaySelectorProps> = ({ value, onChange, year, month }) => {
  const { weeklies } = useDate({ year, month });
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="bg-transparent border-greyscale-80">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {map(weeklies, week => (
            <SelectItem key={week} value={week}>
              {`${week}주차`}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default WeekSelector;
