import { useState } from "react";
import "./Select.css";

export interface SelectInputProps {
  options: Array<Option>;
  defaultValue: Option["value"];
  onChange: (newState: string) => void;
}

export interface Option {
  label: string;
  value: string;
}

const Select = ({ options, defaultValue, onChange }: SelectInputProps) => {
  const [isOpen, setIsOpen] = useState<boolean>();
  function getLabel(value: string): string | undefined {
    const option = options.find((option) => option.value === value);
    return option ? option.label : undefined;
  }

  return (
    <div>
      <div className="select">
        <div className="select-input" onClick={() => setIsOpen(!isOpen)}>
          {getLabel(defaultValue)}
        </div>
        {isOpen && (
          <div className="options-box">
            {options.map((option) => {
              return (
                <div
                  key={option.value}
                  className={`option ${option.value}`}
                  onClick={() => onChange(option.value)}
                >
                  {option.label}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Select;
