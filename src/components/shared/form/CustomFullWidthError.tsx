import classNames from 'classnames';
import { useField } from 'formik';
import values from 'lodash/values';

export const CustomFullWidthError = ({
  name,
  message,
  className,
}: {
  className?: string;
  name: string;
  message: string;
}) => {
  const [{ value }, { error, touched }] = useField(name);

  return (
    <div
      className={classNames('custom-full-width-error', className, {
        'custom-full-width-error--active':
          (value === '' || values(error).length > 0) && touched,
      })}
    >
      {(!value || values(error).length > 0) && touched && <p>{message}</p>}
    </div>
  );
};
