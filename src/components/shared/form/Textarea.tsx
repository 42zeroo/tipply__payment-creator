import { InputHTMLAttributes } from 'react';
import { Field, FieldAttributes, useField } from 'formik';
import classNames from 'classnames';
import { Error } from './Error';
import values from 'lodash/values';

export const Textarea = ({
  name,
  className,
  showError = true,
  showLengthCounter = true,
  ...props
}: { showError?: boolean; showLengthCounter?: boolean } & FieldAttributes<
  InputHTMLAttributes<HTMLInputElement>
>) => {
  const [field, meta] = useField<string>(name);

  return (
    <div
      className={classNames('input__textarea__wrapper', {
        'input__textarea__wrapper--long': field?.value?.length > 100,
        'input--filled': field?.value?.length > 0,
        'input--error': meta.touched && (values(meta.error).length > 0 || !field.value)

      })}
    >
      <Field
        type="text"
        as="textarea"
        className="input__textarea"
        {...props}
        {...field}
      />

      {showLengthCounter && (
        <div
          className={classNames('input__textarea__length-counter', {
            'input__textarea__length-counter--light':
              field?.value?.length >= 99,
            'input__textarea__length-counter--medium':
              field?.value?.length >= 156,
            'input__textarea__length-counter--hard':
              field?.value?.length == 255,
          })}
        >
          {field?.value?.length ?? 0} / 255
        </div>
      )}
    </div>
  );
};
