import classNames from 'classnames';
import { ButtonHTMLAttributes } from 'react';

type CustomButtonProps = {
  transparent?: boolean;
  semiTransparent?: boolean;
  small?: boolean;
  reverseButtonIconColor?: boolean;
  iconRight?: string;
  iconLeft?: string;
};

export const Button = ({
  className,
  transparent,
  semiTransparent,
  small,
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
      })}
    >
      {iconLeft && (
        <img
          className="button--icon--left"
          src={iconLeft}
          alt="button-left-icon"
        />
      )}

      {children}

      {iconRight && (
        <img
          className={classNames('button--icon--right', {
            'button--icon--reverse-color-icon': reverseButtonIconColor,
          })}
          src={iconRight}
          alt="button-right-icon"
        />
      )}
    </button>
  );
};
