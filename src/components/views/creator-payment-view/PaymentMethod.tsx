import React from 'react';
import classNames from 'classnames';

type PaymentMethodProps = {
  name: string;
  image?: string | unknown;
  text?: string | unknown;
  isActive: boolean;
  isZen?: boolean;
  onClick: () => void;
};

export const PaymentMethod: React.FC<PaymentMethodProps> = ({
  name,
  image,
  text,
  isActive,
  isZen,
  onClick,
}) => {
  return (
    <button
      className={classNames('creator-payment-view__payment-method', {
        'creator-payment-view__payment-method--active': isActive,
        'creator-payment-view__payment-method--zen': isZen,
      })}
      type="button"
      onClick={onClick}
    >
      {typeof image === 'string' ? (
        <img src={image} alt={name} />
      ) : (
        typeof text === 'string' && <p>{text}</p>
      )}
    </button>
  );
};
