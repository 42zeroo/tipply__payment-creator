import { Button } from 'src/components/shared/Button';
import map from 'lodash/map';
import classNames from 'classnames';

const SwitchButton = <T,>({
  disabled,
  valuesMap,
  onChange,
  value: fieldValue,
}: {
  disabled?: boolean;
  valuesMap: { label: string; value: T extends string ? T : keyof T }[];
  onChange: React.Dispatch<
    React.SetStateAction<T extends string ? T : keyof T>
  >;
  value: T extends string ? T : keyof T;
}) => {
  return (
    <div className="switch-button">
      {map(valuesMap, ({ label, value }) => (
        <Button
          key={`switch-button_${label}`}
          small
          disabled={disabled}
          className={classNames({
            'switch-button--is-active': fieldValue === value,
          })}
          type="button"
          onClick={() => onChange(value)}
        >
          {label}
        </Button>
      ))}
    </div>
  );
};

export default SwitchButton;
