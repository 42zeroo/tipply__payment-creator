import classNames from 'classnames';
import { ErrorMessage, Field, useField } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { ArrowContainer, Popover } from 'react-tiny-popover';
import { CSSTransition } from 'react-transition-group';
import warningTriangle from 'src/assets/icons/warning-triangle.svg';

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
  const [, { error, touched }] = useField(name);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  useEffect(() => {
    if (!(!!error && touched)) {
      setIsPopoverOpen(false);
    }
  }, [error, touched]);
  const nodeRef = useRef(null);

  return (
    <div
      className={classNames('checkbox', {
        checkbox__error:
          typeof showError !== 'undefined' ? showError : touched && error,
      })}
    >
      {showError && (
        <Popover
          isOpen={isPopoverOpen}
          containerClassName="field-wrapper__error-wrapper__container"
          positions={['top', 'right']} // if you'd like, you can limit the positions
          padding={10} // adjust padding here!
          onClickOutside={() => setIsPopoverOpen(false)} // handle click events outside of the popover/target here!
          content={(
            { position, childRect, popoverRect } // you can also provide a render function that injects some useful stuff!
          ) => (
            <ArrowContainer // if you'd like an arrow, you can import the ArrowContainer!
              position={position}
              childRect={childRect}
              popoverRect={popoverRect}
              arrowColor={'blue'}
              arrowSize={10}
              arrowStyle={{ opacity: 0.7 }}
              className="popover-arrow-container popover-arrow-container--checkbox form-error__wrapper"
              arrowClassName="popover-arrow"
            >
              <CSSTransition
                nodeRef={nodeRef}
                in={isPopoverOpen}
                timeout={200}
                classNames="fade"
              >
                <div ref={nodeRef}>
                  {error}
                </div>
              </CSSTransition>
            </ArrowContainer>
          )}
        >
          <div
            className={classNames(
              'form-error__triangle',
              'form-error__triangle--checkbox',
              {
                'form-error__triangle--show': typeof showError !== 'undefined' ? showError : touched && error,
              }
            )}
            onMouseEnter={() => !!error && setIsPopoverOpen(true)}
            onMouseLeave={() => setIsPopoverOpen(false)}
            onClick={() =>
              typeof showError !== 'undefined' ? showError : touched && error && setIsPopoverOpen(!isPopoverOpen)
            }
          >
            <img src={warningTriangle} alt="warning-triangle" />
          </div>
        </Popover>
      )}

      <label>
        <Field name={name} validateOnChange={true} type="checkbox" {...rest} />
        <span className="checkmark"></span>
        <span className="label">{label}</span>
      </label>
    </div>
  );
};
