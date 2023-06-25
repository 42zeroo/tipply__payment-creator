import { useField } from 'formik';
import { chunk, find, findIndex } from 'lodash';
import { useSwiper } from 'swiper/react';
import {
  PredefinedPriceButton,
  PredefinedPriceButtonProps,
} from './PredefinedPrice';

export const PredefinedPriceSwiperComponent = ({
  predefinedPrices,
  price,
  isActive,
  priceFieldName,
  onClick,
}: {
  predefinedPrices: number[];
  priceFieldName: string;
  onClick?: () => void;
} & Omit<PredefinedPriceButtonProps, 'onClick'>) => {
  const [{ value: priceFieldValue }, , { setValue: setPriceFieldValue }] =
    useField(priceFieldName);

  const swiper = useSwiper();

  return (
    <PredefinedPriceButton
      key={price}
      price={price}
      isActive={isActive}
      onClick={() => {
        if (onClick) {
          onClick();
        }

        if (priceFieldValue !== price.toFixed(2).replace('.', ',')) {
          setPriceFieldValue(price.toFixed(2).replace('.', ','));
        }

        if (isActive) {
          setPriceFieldValue(price.toFixed(2).replace('.', ','));
        }

        const slideIndexOfClickedPredefinedPrice = findIndex(
          chunk(predefinedPrices, 4),
          (el) => !!find(el, (predefinedPrice) => price === predefinedPrice)
        );

        if (swiper.realIndex !== slideIndexOfClickedPredefinedPrice) {
          swiper.slideTo(slideIndexOfClickedPredefinedPrice);
        }
      }}
    />
  );
};
