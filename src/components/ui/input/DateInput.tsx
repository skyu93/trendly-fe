import React, { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input/Input';

interface DateInputProps {
  value?: string; // 'YYYY-MM-DD' 형식의 문자열
  onChange?: (value: string) => void; // 'YYYY-MM-DD' 형식만 반환
  className?: string;
}

const DateInput: React.FC<DateInputProps> = ({ value = '2000-00-00', onChange, className = '' }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // 입력 형식 (마스크)
  const FORMAT = 'YYYY년 MM월 DD일';

  // 값을 형식에 맞게 변환
  const formatValue = (dateValue: string) => {
    const parts = dateValue.split('-');
    if (parts.length !== 3) {
      return FORMAT.replace('YYYY', '2000').replace('MM', '00').replace('DD', '00');
    }

    const [year, month, day] = parts;
    return FORMAT.replace('YYYY', year || '2000')
      .replace('MM', month || '00')
      .replace('DD', day || '00');
  };

  // 형식에서 날짜 추출
  const extractDateValue = (formattedValue: string) => {
    const yearPos = FORMAT.indexOf('YYYY');
    const monthPos = FORMAT.indexOf('MM');
    const dayPos = FORMAT.indexOf('DD');

    const year = formattedValue.substring(yearPos, yearPos + 4);
    const month = formattedValue.substring(monthPos, monthPos + 2);
    const day = formattedValue.substring(dayPos, dayPos + 2);

    return `${year}-${month}-${day}`;
  };

  // 기본 형식으로 변환된 값
  const [displayValue, setDisplayValue] = useState(formatValue(value));

  // 외부에서 값이 변경될 경우 업데이트
  useEffect(() => {
    setDisplayValue(formatValue(value));
  }, [value]);

  // 숫자 입력 위치 확인 함수들
  const isYearIndex = (idx: number) => {
    const yearStart = FORMAT.indexOf('YYYY');
    return idx >= yearStart && idx < yearStart + 4;
  };

  const isMonthIndex = (idx: number) => {
    const monthStart = FORMAT.indexOf('MM');
    return idx >= monthStart && idx < monthStart + 2;
  };

  const isDayIndex = (idx: number) => {
    const dayStart = FORMAT.indexOf('DD');
    return idx >= dayStart && idx < dayStart + 2;
  };

  const isDigitIndex = (idx: number) => {
    return isYearIndex(idx) || isMonthIndex(idx) || isDayIndex(idx);
  };

  // 입력 처리 - 완전히 새로운 접근 방식
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const oldValue = displayValue;

    // 아무것도 변경되지 않았다면 무시
    if (newValue === oldValue) return;

    // 어떤 위치에서 변경이 발생했는지 찾기
    let index = 0;
    while (index < Math.min(newValue.length, oldValue.length) && newValue[index] === oldValue[index]) {
      index++;
    }

    // 새 문자 추가
    if (newValue.length > oldValue.length && isDigitIndex(index)) {
      const char = newValue[index];

      if (/^\d$/.test(char)) {
        // 숫자만 추가
        const chars = oldValue.split('');
        chars[index] = char;
        const updatedValue = chars.join('');

        setDisplayValue(updatedValue);

        if (onChange) {
          onChange(extractDateValue(updatedValue));
        }

        // 다음 입력 위치 계산
        let nextPos = index + 1;

        // 연도, 월, 일의 마지막 자리인 경우 다음 필드로 이동
        if (isYearIndex(index) && nextPos === FORMAT.indexOf('YYYY') + 4) {
          nextPos = FORMAT.indexOf('MM');
        } else if (isMonthIndex(index) && nextPos === FORMAT.indexOf('MM') + 2) {
          nextPos = FORMAT.indexOf('DD');
        }

        // 다음 위치가 입력 가능한 위치가 아니면 조정
        while (nextPos < updatedValue.length && !isDigitIndex(nextPos)) {
          nextPos++;
        }

        // 커서 위치 설정
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.setSelectionRange(nextPos, nextPos);
          }
        }, 0);
      } else {
        // 숫자가 아닌 경우 원래 값으로 복원
        setDisplayValue(oldValue);

        // 원래 커서 위치 복원
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.setSelectionRange(index, index);
          }
        }, 0);
      }
      return;
    }

    // 삭제 처리
    if (newValue.length < oldValue.length) {
      // 선택 범위 삭제인 경우 처리가 복잡해지므로 일단 기본 동작 유지
      if (Math.abs(newValue.length - oldValue.length) > 1) {
        setDisplayValue(oldValue);
        return;
      }

      // 백스페이스/Delete로 한 글자 삭제한 경우
      // 삭제된 위치가 숫자 입력 위치인지 확인
      const deletePos = index;

      if (isDigitIndex(deletePos)) {
        const chars = oldValue.split('');
        chars[deletePos] = '0'; // 삭제된 위치에 0 설정
        const updatedValue = chars.join('');

        setDisplayValue(updatedValue);

        if (onChange) {
          onChange(extractDateValue(updatedValue));
        }

        // 삭제 위치에 커서 유지
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.setSelectionRange(deletePos, deletePos);
          }
        }, 0);
      } else {
        // 입력 가능한 위치가 아니면 원래 값으로 복원
        setDisplayValue(oldValue);

        // 삭제한 경우 이전 위치로 커서 이동
        setTimeout(() => {
          if (inputRef.current) {
            let newPos = deletePos - 1;
            while (newPos >= 0 && !isDigitIndex(newPos)) {
              newPos--;
            }
            if (newPos >= 0) {
              inputRef.current.setSelectionRange(newPos, newPos);
            }
          }
        }, 0);
      }
      return;
    }

    // 기타 변경(복사/붙여넣기 등)은 원래 값으로 복원
    setDisplayValue(oldValue);

    // 커서 위치 유지
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.setSelectionRange(index, index);
      }
    }, 0);
  };

  // 키 다운 이벤트 처리
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const pos = input.selectionStart || 0;

    // 화살표 키 처리
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();

      const direction = e.key === 'ArrowLeft' ? -1 : 1;
      let newPos = pos + direction;

      // 숫자 입력 위치를 찾을 때까지 이동
      while (newPos >= 0 && newPos < displayValue.length && !isDigitIndex(newPos)) {
        newPos += direction;
      }

      // 범위를 벗어나면 조정
      if (newPos < 0) newPos = 0;
      if (newPos > displayValue.length) newPos = displayValue.length;

      setTimeout(() => {
        input.setSelectionRange(newPos, newPos);
      }, 0);
    }

    // 숫자를 직접 입력한 경우 처리 (가장 자연스러운 입력 방식)
    if (/^\d$/.test(e.key) && !e.ctrlKey && !e.altKey && !e.metaKey) {
      e.preventDefault();

      if (isDigitIndex(pos)) {
        const chars = displayValue.split('');
        chars[pos] = e.key;
        const updatedValue = chars.join('');

        setDisplayValue(updatedValue);

        if (onChange) {
          onChange(extractDateValue(updatedValue));
        }

        // 다음 입력 위치 계산
        let nextPos = pos + 1;

        // 연도, 월, 일의 마지막 자리인 경우 다음 필드로 이동
        if (isYearIndex(pos) && nextPos === FORMAT.indexOf('YYYY') + 4) {
          nextPos = FORMAT.indexOf('MM');
        } else if (isMonthIndex(pos) && nextPos === FORMAT.indexOf('MM') + 2) {
          nextPos = FORMAT.indexOf('DD');
        }

        // 다음 위치가 입력 가능한 위치가 아니면 조정
        while (nextPos < updatedValue.length && !isDigitIndex(nextPos)) {
          nextPos++;
        }

        // 커서 위치 설정
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.setSelectionRange(nextPos, nextPos);
          }
        }, 0);
      }
    }

    // 백스페이스/Delete 키 처리
    if (e.key === 'Backspace' || e.key === 'Delete') {
      e.preventDefault();

      let deletePos;
      if (e.key === 'Backspace') {
        // 백스페이스는 커서 이전 위치를 지움
        deletePos = pos - 1;
        // 커서가 숫자 위치가 아니면 가장 가까운 이전 숫자 위치 찾기
        while (deletePos >= 0 && !isDigitIndex(deletePos)) {
          deletePos--;
        }
      } else {
        // Delete는 커서 위치를 지움
        deletePos = pos;
        // 커서가 숫자 위치가 아니면 가장 가까운 다음 숫자 위치 찾기
        while (deletePos < displayValue.length && !isDigitIndex(deletePos)) {
          deletePos++;
        }
      }

      // 삭제할 위치가 유효한지 확인
      if (deletePos >= 0 && deletePos < displayValue.length && isDigitIndex(deletePos)) {
        const chars = displayValue.split('');
        chars[deletePos] = '0'; // 삭제된 위치에 0 설정
        const updatedValue = chars.join('');

        setDisplayValue(updatedValue);

        if (onChange) {
          onChange(extractDateValue(updatedValue));
        }

        // 커서 위치 설정
        const newPos = e.key === 'Backspace' ? deletePos : pos;

        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.setSelectionRange(newPos, newPos);
          }
        }, 0);
      }
    }
  };

  // 포커스 처리
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    // 포커스 시 첫 번째 입력 위치(연도의 첫 자리)로 커서 이동
    const yearPos = FORMAT.indexOf('YYYY');
    setTimeout(() => {
      e.target.setSelectionRange(yearPos, yearPos);
    }, 0);
  };

  // 클릭 이벤트 처리
  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const pos = input.selectionStart || 0;

    // 클릭한 위치가 숫자 입력 위치가 아니면 가장 가까운 숫자 위치로 조정
    if (!isDigitIndex(pos)) {
      let nearestPos = pos;
      let leftDistance = Number.MAX_SAFE_INTEGER;
      let rightDistance = Number.MAX_SAFE_INTEGER;

      // 왼쪽에서 가장 가까운 숫자 위치 찾기
      let leftPos = pos - 1;
      while (leftPos >= 0) {
        if (isDigitIndex(leftPos)) {
          leftDistance = pos - leftPos;
          break;
        }
        leftPos--;
      }

      // 오른쪽에서 가장 가까운 숫자 위치 찾기
      let rightPos = pos;
      while (rightPos < displayValue.length) {
        if (isDigitIndex(rightPos)) {
          rightDistance = rightPos - pos;
          break;
        }
        rightPos++;
      }

      // 더 가까운 쪽 선택
      if (leftDistance <= rightDistance && leftPos >= 0) {
        nearestPos = leftPos;
      } else if (rightPos < displayValue.length) {
        nearestPos = rightPos;
      } else if (leftPos >= 0) {
        nearestPos = leftPos;
      }

      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.setSelectionRange(nearestPos, nearestPos);
        }
      }, 0);
    }
  };

  return (
    <Input
      ref={inputRef}
      className={`h-12 px-4 py-3 ${className}`}
      id="date-input"
      value={displayValue}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onClick={handleClick}
      data-unmasked-value={extractDateValue(displayValue)}
    />
  );
};

export default DateInput;
