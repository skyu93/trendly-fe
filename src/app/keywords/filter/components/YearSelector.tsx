import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select/Select';
import { map } from 'es-toolkit/compat';
import { useDate } from '@/hooks/useDate';

interface YearSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const YearSelector: React.FC<YearSelectorProps> = ({ value, onChange }) => {
  const { years } = useDate();
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="bg-transparent border-greyscale-80">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {map(years, year => (
            <SelectItem key={year} value={year}>
              {`${year}년`}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default YearSelector;
