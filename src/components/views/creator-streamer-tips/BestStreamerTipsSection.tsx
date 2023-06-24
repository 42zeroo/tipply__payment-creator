import map from 'lodash/map';
import times from 'lodash/times';
import { useMemo } from 'react';
import { Header } from 'src/components/shared/header';
import { BestStreamerTip } from 'src/components/views/creator-streamer-tips/BestStreamerTip';
import { BestTipper } from 'src/utils/services/StreamerDataAPI';
import puchar from 'src/assets/icons/puchar.png';

interface BestTipperSectionProps {
  bestTippers: BestTipper[] | null;
  isBestTipperLoading: boolean;
}

export const BestStreamerTipsSection = ({
  bestTippers,
  isBestTipperLoading,
}: BestTipperSectionProps) => {
  const hasAnyBestStreamerTips = useMemo(
    () => bestTippers?.length && bestTippers.length > 0 && !isBestTipperLoading,
    [bestTippers, isBestTipperLoading]
  );

  const renderBestTippers = useMemo(
    () =>
      hasAnyBestStreamerTips ? (
        map(bestTippers, (bestTiper, index) => (
          <BestStreamerTip
            key={`streamer-tips__best-tip#${index}`}
            nickname={bestTiper.nickname}
            sumOfTips={bestTiper.sumOfTips}
            index={index}
          />
        ))
      ) : (
        <p>Nie było jeszcze wpłat :(</p>
      ),
    [bestTippers, isBestTipperLoading]
  );

  return (
    <>
      <div className='streamer-tips__header'>
        <img src={puchar} alt='puchar' />
        <Header title="RANKING WPŁAT WIDZÓW" subtitle="ZDOBYWAJ SZCZYTY U STREAMERA!" />
      </div>
      <div className="streamer-tips__tips-ranking">
        {isBestTipperLoading
          ? times(3, (index) => (
              <div
                className="streamer-tips__best-tip placeholder"
                key={`streamer-tips__best-tip--placeholder.${index}`}
              />
            ))
          : renderBestTippers}
      </div>
    </>
  );
};
