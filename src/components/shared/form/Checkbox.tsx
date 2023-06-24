import classNames from 'classnames';
import { Field, useField } from 'formik';

export const Checkbox = ({
  name,
  children,
  label,
  showError,
  ...rest
}: {
  name: string;
  label: string | JSX.Element;
  showError?: boolean;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>) => {
  const [,meta] = useField(name);

  return (
    <div
      className={classNames('checkbox', {
        checkbox__error:
          typeof showError !== 'undefined'
            ? showError
            : meta.touched && meta.error,
      })}
    >
      <label>
        <Field name={name} validateOnChange={true} type="checkbox" {...rest}/>
        <span className="checkmark"></span>
        <span className="label">{label}</span>
      </label>
    </div>
  );
};
