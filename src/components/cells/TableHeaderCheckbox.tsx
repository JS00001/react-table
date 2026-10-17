import { MouseEvent } from "react";

import { styles } from "@/lib/util";
import CheckIcon from "@/components/icons/CheckIcon";
import MinusIcon from "@/components/icons/MinusIcon";

type TableHeaderCheckboxProps = {
  value?: boolean;
  indeterminate?: boolean;
  onClick?: (event: MouseEvent) => void;
  onChange?: (checked: boolean) => void;
};

export default function TableHeaderCheckbox({ value, indeterminate, onChange, onClick }: TableHeaderCheckboxProps) {
  const isIndeterminate = indeterminate;
  const isChecked = value && !indeterminate;
  const isUnchecked = !value && !indeterminate;

  const containerStyles = styles();

  const handleClick = (event: MouseEvent) => {
    onClick?.(event);
    event.stopPropagation();
    event.preventDefault();
    onChange?.(isIndeterminate ? true : !value);
  };

  return (
    <button
      type="button"
      role="checkbox"
      style={containerStyles.style}
      className={containerStyles.className}
      aria-checked={isIndeterminate ? "mixed" : value}
      onClick={handleClick}
    >
      {isChecked && <CheckIcon size={12} />}
      {isIndeterminate && <MinusIcon size={12} />}
    </button>
  );
}
