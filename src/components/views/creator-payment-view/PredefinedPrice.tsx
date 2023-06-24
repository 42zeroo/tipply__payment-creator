import React from 'react';
import classNames from 'classnames';
import { Button } from 'src/components/shared/Button';
export interface PredefinedPriceButtonProps {
  price: number;
  isActive: boolean;
  onClick: () => void;
}

export const PredefinedPriceButton: React.FC<PredefinedPriceButtonProps> = ({
  price,
  isActive,
  onClick,
}) => {
  return (
    <Button
      small
      className={classNames('creator-payment-view__predefined-price__button', {
        'creator-payment-view__predefined-price__button--active': isActive,
      })}
      semiTransparent
      type="button"
      onClick={onClick}
    >
      {price.toFixed(2)} PLN
    </Button>
  );
};
