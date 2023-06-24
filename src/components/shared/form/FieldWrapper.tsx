import { useState } from 'react';
import { Error } from './Error';
import { ArrowContainer, Popover } from 'react-tiny-popover';
import classNames from 'classnames';
import warningTriangle from 'src/assets/icons/warning-triangle.svg';
import { ErrorMessage, useField } from 'formik';
import { values } from 'lodash';

interface FieldWrapperProps {
  children: JSX.Element | JSX.Element[];
  label: string;
  name: string;
  showError?: boolean;
}

export const FieldWrapper = ({
  label,
  children,
  name,
  showError = true,
}: FieldWrapperProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [, { error, touched }] = useField(name);

  return (
    <div className='field-wrapper__error-wrapper'>
      <label className="field-wrapper">
        <span className="field-wrapper__label">{label}</span>
        {children}
      </label>
      
      {showError && (
        <Popover
          isOpen={isPopoverOpen}
          containerClassName='field-wrapper__error-wrapper__container'
          positions={['top', 'left']} // if you'd like, you can limit the positions
          padding={10} // adjust padding here!
          reposition={false} // prevents automatic readjustment of content position that keeps your popover content within its parent's bounds
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

              <ErrorMessage name={name} />
            </ArrowContainer>
          )}
        >
          <div
            className={classNames('form-error__triangle', {
              'form-error__triangle--show': !!error && touched,
            })}
            onMouseEnter={() => setIsPopoverOpen(true)}
            onMouseLeave={() => setIsPopoverOpen(false)}
            onClick={() => setIsPopoverOpen(!isPopoverOpen)}
          >
            <img src={warningTriangle} alt="warning-triangle" />
          </div>
        </Popover>
      )}
    </div>
  );
};
