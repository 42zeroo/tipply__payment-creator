import classNames from 'classnames';
import { FieldHookConfig, useField, useFormikContext } from 'formik';
import { find, isNaN } from 'lodash';
import round from 'lodash/round';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import CurrencyInput, { CurrencyInputProps } from 'react-currency-input-field';
import { ArrowContainer, Popover } from 'react-tiny-popover';
import { CSSTransition } from 'react-transition-group';
import warningTriangle from 'src/assets/icons/warning-triangle.svg';
import { PAYMENT_METHODS } from 'src/utils/const/payment-methods';

type PriceFieldProps = FieldHookConfig<string> &
  CurrencyInputProps & {
    id: string;
    placeholder: string;
    showPriceWithTax?: boolean;
    showPriceWithTipplyCommission?: boolean;
    paymentMethodFieldName?: string;
    name: string;
  };

const PriceField: React.FC<PriceFieldProps> = ({
  id,
  placeholder,
  name,
  showPriceWithTax,
  showPriceWithTipplyCommission,
  paymentMethodFieldName = 'payment_method',
  ...props
}) => {
  const [field, meta, helpers] = useField(name);
  const [{ value: paymentMethodValue }] = useField(paymentMethodFieldName);

  const calculateSMSFullAmount = useCallback(
    (
      amount: number,
      tipplyCommission = 0.430359,
      vatCommission = 0.23
    ): number => {
      const totalAmount = round(
        (amount / (1 - tipplyCommission)) * (1 + vatCommission),
        2
      );

      return totalAmount;
    },
    []
  );

  const paymentMethod = useMemo(
    () =>
      find(
        PAYMENT_METHODS,
        (paymentMethod) => paymentMethod.name === paymentMethodValue
      ),
    [paymentMethodValue]
  );

  const [isPriceFieldMaxLength, setIsPriceFieldMaxLength] = useState(true);
  const { handleBlur, handleChange } = useFormikContext();

  const handleValueChange = useCallback(
    (value?: string) => {
      if (
        value &&
        value?.length > (paymentMethod?.maxDigitsLimit ?? 5) &&
        !value?.includes(',')
      ) {
        setIsPriceFieldMaxLength(true);
        return;
      }

      setIsPriceFieldMaxLength(false);

      handleChange(name);
      helpers.setValue(value, true);
      helpers.setTouched(true, true);
    },
    [helpers, paymentMethod]
  );

  const smsPlusAmountValue = useMemo(() => {
    const smsPlusAmount = calculateSMSFullAmount(parseFloat(field.value))
      .toFixed(2)
      .replace('.', ',');

    if (isNaN(parseFloat(smsPlusAmount))) {
      return '0,00';
    }

    return smsPlusAmount;
  }, [calculateSMSFullAmount, field.value]);

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  useEffect(() => {
    if (!(!!meta.error && meta.touched)) {
      setIsPopoverOpen(false);
    }
  }, [meta.error, meta.touched]);
  const nodeRef = useRef(null);

  return (
    <div
      className={classNames('field-price__wrapper', {
        'field-price__wrapper--additional-fee':
          showPriceWithTax || showPriceWithTipplyCommission,
      })}
    >
      <CurrencyInput
        id={id}
        name={name}
        className={classNames('form-control', props.className, {
          'input--filled':
            field?.value && field.value?.length && field.value.length > 0,
          'input--error': meta.touched && (!field.value || field.value === '0'),
        })}
        value={field.value}
        onValueChange={handleValueChange}
        onBlur={handleBlur}
        placeholder="0 PLN"
        onChangeCapture={handleChange}
        suffix=" PLN"
        decimalSeparator=","
        disableGroupSeparators
        allowNegativeValue={false}
        disabled={paymentMethod?.name === 'SMS'}
        maxLength={isPriceFieldMaxLength ? 6 : 8}
        max={99999.99}
        step={1}
        min={0}
      />
      {showPriceWithTax && (
        <span className="field-price__tax">
          {(parseFloat(field.value ?? '0') * 1.23).toFixed(2)} PLN (z VAT)
        </span>
      )}
      {showPriceWithTipplyCommission && (
        <span className="field-price__tax">
          {smsPlusAmountValue} PLN (z VAT i prowizją)
        </span>
      )}
      <div className="input__hover" />

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
              <div ref={nodeRef}>Kwota nie może być pusta!</div>
            </CSSTransition>
          </ArrowContainer>
        )}
      >
        <div
          className={classNames('form-error__triangle', {
            'form-error__triangle--show': meta.touched && (!field.value || field.value === '0'),
          })}
          onMouseEnter={() =>
            meta.touched && (!field.value || field.value === '0') && setIsPopoverOpen(true)
          }
          onMouseLeave={() => setIsPopoverOpen(false)}
          onClick={() =>
            meta.touched && (!field.value || field.value === '0') && setIsPopoverOpen(!isPopoverOpen)
          }
        >
          <img src={warningTriangle} alt="warning-triangle" />
        </div>
      </Popover>
    </div>
  );
};

export default PriceField;
