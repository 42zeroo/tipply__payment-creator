import classNames from 'classnames';
import { useField } from 'formik';
import React, { useMemo } from 'react';
import CountUp from 'react-countup';

interface WhereTipGoesProps {
  name: string;
  limit: number;
  index: number;
  actualTipValue: number;
  isActive: boolean;
  onClick: () => void;
  priceFieldName?: string;
}

export const WhereTipGoes: React.FC<WhereTipGoesProps> = ({
  name,
  index,
  limit,
  actualTipValue,
  isActive,
  priceFieldName = 'price',
  onClick,
}) => {
  const [field] = useField(priceFieldName);
  const fillPercentFrom = useMemo(
    () => (actualTipValue / limit) * 100,
    [actualTipValue, limit]
  );
  const fillPercentTo = useMemo(
    () => fillPercentFrom + (parseFloat(field.value) / limit) * 100,
    [field.value, limit, fillPercentFrom]
  );
  const fillPercentToWithMaxLimit = useMemo(
    () => (fillPercentTo >= 100 ? 100 : fillPercentTo),
    [fillPercentTo]
  );

  return (
    <div
      className={classNames('where-payment-goes__wrapper', {
        'where-payment-goes__wrapper--is-active': isActive,
      })}
      style={
        {
          '--fill-percent': `${
            isActive && parseFloat(field.value) > 0
              ? fillPercentToWithMaxLimit
              : fillPercentFrom
          }%`,
        } as React.CSSProperties
      }
      onClick={onClick}
    >
      <p className="where-payment-goes__index">#{index + 1}</p>
      <div className="where-payment-goes__label-wrapper">
        <p>{name}</p>
        <p>
          <CountUp
            
            start={actualTipValue}
            end={
              isActive && parseFloat(field.value) > 0
                ? actualTipValue + parseFloat(field.value)
                : actualTipValue
            }
            decimals={2}
            separator='.'
            decimal=","
            suffix="zł"
          >
            {({ countUpRef }) => <span ref={countUpRef} />}
          </CountUp>
          <span> / {limit.toFixed(2).replace('.', ',')}zł</span>
        </p>
      </div>
      <p className="where-payment-goes__percent">
        <CountUp
        duration={4.5}
          start={fillPercentFrom}
          end={
            isActive && parseFloat(field.value) > 0
              ? fillPercentTo
              : fillPercentFrom
          }
          decimals={2}
          decimal="."
          suffix="%"
        >
          {({ countUpRef }) => <span ref={countUpRef} />}
        </CountUp>
        {fillPercentFrom >= 100 && (
          <p className="where-payment-goes__finish">ZAKOŃCZONO</p>
        )}
      </p>
      <div className="where-payment-goes__wrapper__filling-wrapper">
        <div className="where-payment-goes__wrapper__filling" />
      </div>
    </div>
  );
};
