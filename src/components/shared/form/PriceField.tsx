import classNames from 'classnames';
import { FieldHookConfig, useField } from 'formik';
import { values } from 'lodash';
import round from 'lodash/round';
import React, { useCallback, useMemo, useState } from 'react';
import CurrencyInput, { CurrencyInputProps } from 'react-currency-input-field';

type PriceFieldProps = FieldHookConfig<string> &
  CurrencyInputProps & {
    id: string;
    placeholder: string;
    showPriceWithTax?: boolean;
    showPriceWithTipplyCommission?: boolean;
    name: string;
  };

const PriceField: React.FC<PriceFieldProps> = ({
  id,
  placeholder,
  name,
  showPriceWithTax,
  showPriceWithTipplyCommission,
  ...props
}) => {
  const [field, meta, helpers] = useField(name);

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
  const [isPriceFieldMaxLength, setIsPriceFieldMaxLength] = useState(true);
  const handleValueChange = useCallback(
    (value?: string) => {
      if (value && value?.length > 5 && !value?.includes(',')) {
        setIsPriceFieldMaxLength(true);
        return;
      }

      setIsPriceFieldMaxLength(false);
      helpers.setValue(value, true);
      helpers.setTouched(true);
    },
    [helpers]
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
          'input--error':
            meta.touched && (values(meta.error).length > 0 || !field.value),
        })}
        value={field.value}
        onValueChange={handleValueChange}
        placeholder="0 PLN"
        suffix=" PLN"
        decimalSeparator=","
        groupSeparator="."
        allowNegativeValue={false}
        maxLength={isPriceFieldMaxLength ? 6 : 8}
        max={99999.99}
        step={1}
        min={0}
      />
      {showPriceWithTax && (
        <span className="field-price__tax">
          {(field.value * 1.23).toFixed(2).replace('.', ',')} PLN (z VAT)
        </span>
      )}
      {showPriceWithTipplyCommission && (
        <span className="field-price__tax">
          {smsPlusAmountValue} PLN (z VAT i prowizją)
        </span>
      )}
      <div className="input__hover" />
    </div>
  );
};

export default PriceField;
