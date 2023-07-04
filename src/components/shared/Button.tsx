import classNames from 'classnames';
import { ButtonHTMLAttributes } from 'react';

type CustomButtonProps = {
  transparent?: boolean;
  semiTransparent?: boolean;
  small?: boolean;
  showIconOnlyOnHover?: boolean;
  reverseButtonIconColor?: boolean;
  iconRight?: string;
  iconLeft?: string;
};

export const Button = ({
  className,
  transparent,
  semiTransparent,
  small,
  showIconOnlyOnHover = true,
  children,
  reverseButtonIconColor,
  iconRight,
  iconLeft,
  ...props
}: CustomButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className={classNames('button', className, {
        'button--transparent': transparent,
        'button--semi-transparent': semiTransparent,
        'button--small': small,
        'button__icon-wrapper': iconLeft || iconRight,
        'button__icon-wrapper--left': iconLeft,
        'button__icon-wrapper--right': iconRight,
      })}
    >
      {iconLeft && (
        <img
          className={classNames('button--icon', 'button--icon--left', {
            'button--icon--always-visible': !showIconOnlyOnHover,
          })}
          src={iconLeft}
          alt="button-left-icon"
        />
      )}

      <span>{children}</span>

      {iconRight && (
        <img
          className={classNames('button--icon', 'button--icon--right', {
            'button--icon--reverse-color-icon': reverseButtonIconColor,
          })}
          src={iconRight}
          alt="button-right-icon"
        />
      )}
    </button>
  );
};
