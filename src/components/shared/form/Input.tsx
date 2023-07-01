import classNames from 'classnames';
import { Field, FieldAttributes, useField } from 'formik';
import values from 'lodash/values';
import { InputHTMLAttributes, useCallback, useState } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement>;
type InputWithFieldProps = FieldAttributes<
  InputHTMLAttributes<HTMLInputElement>
> & {
  showError?: boolean;
  name: string;
};

export const InputWithoutField = ({ className, ...rest }: InputProps) => {
  return <input className={classNames('input', className)} {...rest} />;
};

export const Input = ({
  name,
  type = 'text',
  className,
  showError = true,
  onChange,
  ...rest
}: InputWithFieldProps) => {
  const [field, meta] = useField(name);
  const [valueWasChangedByUser, setValueWasChangedByUser] = useState(false)

  const handleOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);

      return;
    }

    setValueWasChangedByUser(true);
    field.onChange(e)
  }, [])

  return (
    <div className="input__wrapper">
      <Field
        as={InputWithoutField}
        type={type}
        {...rest}
        {...field}
        className={classNames(className, {
          'input--filled': field?.value?.length > 0,
          'input--error':
            meta.touched && (values(meta.error).length > 0 || !field.value),
        })}
        onBlur={(valueWasChangedByUser || meta.touched) && field.onBlur}
        onChange={handleOnChange}
      />
      <div className="input__hover" />
    </div>
  );
};
