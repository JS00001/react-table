import { MouseEvent } from "react";

import { styles } from "@/lib/util";
import CheckIcon from "@/components/icons/CheckIcon";
import MinusIcon from "@/components/icons/MinusIcon";
import { useTableThemeContext } from "@/context/TableThemeContext";

export type TableSelectionCheckboxProps = {
  value?: boolean;
  indeterminate?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  onChange?: (checked: boolean) => void;
};

export default function TableSelectionCheckbox({ value, indeterminate, onChange, onClick }: TableSelectionCheckboxProps) {
  const theme = useTableThemeContext();

  const isIndeterminate = indeterminate;
  const isChecked = value && !indeterminate;
  const isUnchecked = !value && !indeterminate;

  const containerStyles = styles(
    { borderWidth: 1, borderStyle: "solid", borderRadius: theme.tableCheckboxBorderRadius },
    { width: 16, height: 16, display: "flex", flexShrink: 0, alignItems: "center", justifyContent: "center" },
    isUnchecked && { borderColor: `${theme.tableInactiveCheckboxColor}`, backgroundColor: "transparent" },
    isChecked && { borderColor: `${theme.tableActiveCheckboxColor}`, backgroundColor: theme.tableActiveCheckboxColor },
    isIndeterminate && { borderColor: `${theme.tableActiveCheckboxColor}`, backgroundColor: theme.tableActiveCheckboxColor },
  );

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    event.stopPropagation();
    event.preventDefault();
    onChange?.(isIndeterminate ? true : !value);
  };

  return (
    <button
      id="table-selection-checkbox"
      type="button"
      role="checkbox"
      style={containerStyles.style}
      className={containerStyles.className}
      aria-checked={isIndeterminate ? "mixed" : value}
      onClick={handleClick}
    >
      {isChecked && <CheckIcon size={12} color={theme.tableActiveCheckboxIconColor} />}
      {isIndeterminate && <MinusIcon size={12} color={theme.tableActiveCheckboxIconColor} />}
    </button>
  );
}
