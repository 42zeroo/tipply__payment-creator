import findIndex from 'lodash/findIndex';
import { useCallback, useContext, useState } from 'react';
import arrowLeft from 'src/assets/icons/arrow-left.svg';
import { Button } from 'src/components/shared/Button';
import { MultiSwitch } from 'src/components/shared/form/MultiSwitch2';
import { BestStreamerTipsSection } from 'src/components/views/creator-streamer-tips/BestStreamerTipsSection';
import { LastStreamerTipsSection } from 'src/components/views/creator-streamer-tips/LastStreamerTipsSection';
import { PaymentCreatorContext } from 'src/utils/context/payment-creator-context';
import { useFetch } from 'src/utils/hooks/useFetch';
import { usePaymentCreatorContext } from 'src/utils/hooks/usePaymentCreatorContext';
import {
  BestTiperTimeRange,
  StreamerDataAPI,
  StreamerTip,
} from 'src/utils/services/StreamerDataAPI';

export const CreatorStreamerTips = () => {
  const { changeCreatorStep } = usePaymentCreatorContext();
  const { streamerProfile } = useContext(PaymentCreatorContext);

  if (!streamerProfile) {
    throw new Error('No streamer profile data found!');
  }

  const goBackToCreatorMessageView = useCallback(
    () => changeCreatorStep('CreatorMessageView', false),
    [changeCreatorStep]
  );

  const [bestTipperSearchRange, setBestTipperSearchRange] =
    useState<BestTiperTimeRange>('week');

  const [lastStreamerTips, isLastStreamerTipsLoading] = useFetch<
    StreamerTip[],
    [string]
  >(
    useCallback(
      () => StreamerDataAPI.lastStreamerTips(streamerProfile.name),
      [streamerProfile.name]
    ),
    [streamerProfile.name]
  );

  const [bestTippers, isBestTipperLoading] = useFetch(
    useCallback(
      () =>
        StreamerDataAPI.getBestTipper(
          streamerProfile.name,
          bestTipperSearchRange
        ),
      [streamerProfile.name, bestTipperSearchRange]
    ),
    [streamerProfile.name, bestTipperSearchRange]
  );

  const switchButtonValues: { value: BestTiperTimeRange; label: string }[] = [
    { value: 'today', label: 'DZISIAJ' },
    { value: 'week', label: 'TYDZIEŃ' },
    { value: 'month', label: 'MIESIĄĆ' },
  ];

  return (
    <div className="creator-streamer-tips">
      <Button
        small
        semiTransparent
        iconLeft={arrowLeft}
        type="button"
        onClick={goBackToCreatorMessageView}
      >
        WRÓĆ DO WYSYŁANIA WIADOMOŚCI
      </Button>

      <div className="streamer-tips__time-range">
        <MultiSwitch
          // itemWidth={'auto'} 
          // disabled={isBestTipperLoading}
          options={['DZISIAJ', 'TYDZIEŃ', 'MIESIĄC']}
          activeIndex={findIndex(switchButtonValues, ({value}) => value === bestTipperSearchRange)}
          onToggleCallback={(index) =>
            setBestTipperSearchRange(switchButtonValues[index].value)
          }
        />
      </div>
      <BestStreamerTipsSection
        bestTippers={bestTippers}
        isBestTipperLoading={isBestTipperLoading}
      />

      <LastStreamerTipsSection
        lastStreamerTips={lastStreamerTips}
        isLastStreamerTipsLoading={isLastStreamerTipsLoading}
      />

      <Button
      reverseButtonIconColor
      iconLeft={arrowLeft}
      type="button" transparent onClick={goBackToCreatorMessageView}>
        Wstecz
      </Button>
    </div>
  );
};
