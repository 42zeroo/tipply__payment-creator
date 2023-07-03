import classNames from 'classnames';
import { ErrorMessage, useField } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { ArrowContainer, Popover } from 'react-tiny-popover';
import { CSSTransition } from 'react-transition-group';
import warningTriangle from 'src/assets/icons/warning-triangle.svg';

interface FieldWrapperProps {
  children: JSX.Element | JSX.Element[];
  label: string;
  textarea?: boolean;
  name: string;
  showError?: boolean;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
}

export const FieldWrapper = ({
  label,
  children,
  textarea,
  name,
  showError = true,
  onMouseLeave
}: FieldWrapperProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [, { error, touched }] = useField(name);

  useEffect(() => {
    if (!(!!error && touched)) {
      setIsPopoverOpen(false);
    }
  }, [error, touched]);
  const nodeRef = useRef(null);

  return (
    <div className="field-wrapper__error-wrapper" onMouseLeave={onMouseLeave}>
      <label className="field-wrapper">
        <span className="field-wrapper__label">{label}</span>
        {children}
      </label>

      {showError && (
        <Popover
          isOpen={isPopoverOpen}
          containerClassName="field-wrapper__error-wrapper__container"
          positions={['top', 'left']} // if you'd like, you can limit the positions
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
              className="popover-arrow-container form-error__wrapper"
              arrowClassName="popover-arrow"
            >
              <CSSTransition
                nodeRef={nodeRef}
                in={isPopoverOpen}
                timeout={200}
                classNames="fade"
              >
                <div ref={nodeRef}>
                  <ErrorMessage name={name} />
                </div>
              </CSSTransition>
            </ArrowContainer>
          )}
        >
          <div
            className={classNames('form-error__triangle', {
              'form-error__triangle--show': !!error && touched,
              'form-error__triangle--textarea': textarea,
            })}
            onMouseEnter={() => !!error && touched && setIsPopoverOpen(true)}
            onMouseLeave={() => setIsPopoverOpen(false)}
            onClick={() =>
              !!error && touched && setIsPopoverOpen(!isPopoverOpen)
            }
          >
            <img src={warningTriangle} alt="warning-triangle" />
          </div>
        </Popover>
      )}
    </div>
  );
};
