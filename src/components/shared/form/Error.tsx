import classNames from 'classnames';
import { ErrorMessage, useField } from 'formik';
import warningTriangle from 'src/assets/icons/warning-triangle.svg'

type ErrorProps = {
  name: string;
};

export const Error = ({ name, ...rest }: ErrorProps & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  const [, {error, touched}] = useField(name);

  return (
    <>
    <div className={classNames('form-error__triangle', {
      'form-error__triangle--show': !!error && touched
    })} >
      <img src={warningTriangle} alt='warning-triangle' />
    </div>
    <div className={classNames('form-error__wrapper', {
      'form-error__wrapper--show': !!error && touched
    })} {...rest}>
      <ErrorMessage name={name} />
    </div>
    </>
  );
};
