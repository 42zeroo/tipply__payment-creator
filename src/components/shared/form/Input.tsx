import { InputHTMLAttributes, useState } from 'react';
import { Field, FieldAttributes, useField } from 'formik';
import classNames from 'classnames';
import { Error } from './Error';
import values from 'lodash/values';
import { Popover } from 'react-tiny-popover';

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
        onChange={!onChange ? field.onChange : onChange}
      />
    </div>
  );
};
