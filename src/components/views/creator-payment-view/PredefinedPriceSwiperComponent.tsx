import {
  PredefinedPriceButton,
  PredefinedPriceButtonProps,
} from './PredefinedPrice';

export const PredefinedPriceSwiperComponent = ({
  price,
  isActive,
  onClick,
}: {
  predefinedPrices: number[];
  priceFieldName: string;
  onClick?: () => void;
} & Omit<PredefinedPriceButtonProps, 'onClick'>) => {
  return (
    <PredefinedPriceButton
      key={price}
      price={price}
      isActive={isActive}
      onClick={onClick}
      // onClick={() => {
      //   if (onClick) {
      //     onClick();
      //   }

      //   if (priceFieldValue !== price.toFixed(2).replace('.', ',')) {
      //     setPriceFieldValue(price.toFixed(2).replace('.', ','));
      //   }

      //   if (isActive) {
      //     setPriceFieldValue(price.toFixed(2).replace('.', ','));
      //   }

      //   const slideIndexOfClickedPredefinedPrice = findIndex(
      //     chunk(predefinedPrices, 4),
      //     (el) => !!find(el, (predefinedPrice) => price === predefinedPrice)
      //   );

      //   if (ref.current. !== slideIndexOfClickedPredefinedPrice) {
      //     ref.current?.slickGoTo(slideIndexOfClickedPredefinedPrice);
      //   }
      // }}
    />
  );
};
