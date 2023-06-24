import map from 'lodash/map';
import maxBy from 'lodash/maxBy';
import times from 'lodash/times';
import { useMemo } from 'react';
import { Header } from 'src/components/shared/header';
import { LastStreamerTip } from 'src/components/views/creator-streamer-tips/LastStreamerTip';
import { StreamerTip } from 'src/utils/services/StreamerDataAPI';
import turnBack from 'src/assets/icons/turn_back.png';
interface LastStreamerTipsSectionProps {
  lastStreamerTips: StreamerTip[] | null;
  isLastStreamerTipsLoading: boolean;
}

export const LastStreamerTipsSection = ({
  lastStreamerTips,
  isLastStreamerTipsLoading,
}: LastStreamerTipsSectionProps) => {
  const hasAnyStreamerTips = useMemo(
    () =>
      lastStreamerTips?.length &&
      lastStreamerTips.length > 0 &&
      !isLastStreamerTipsLoading,
    [lastStreamerTips, isLastStreamerTipsLoading]
  );

  const renderLastStreamerTips = useMemo(
    () =>
      hasAnyStreamerTips ? (
        map(lastStreamerTips, (streamerTip, index) => (
          <LastStreamerTip
            key={`streamer-tips__last-tip#${index}`}
            nickname={streamerTip.nickname}
            tip={streamerTip.tip}
            isHighest={
              maxBy(lastStreamerTips, 'tip')?.nickname === streamerTip.nickname
            }
          />
        ))
      ) : (
        <p>Nie było jeszcze wpłat :(</p>
      ),
    [lastStreamerTips, isLastStreamerTipsLoading]
  );

  return (
    <>
      <div className="streamer-tips__header">
        <img src={turnBack} alt="puchar" />
        <Header
          title="OSTATNIE WPŁATY U TWÓRCY"
          subtitle={`WYŚWIETLISZ SIĘ TUTAJ WYSYŁAJĄC\n WIADOMOŚĆ DLA TEGO STREAMERA`}
        />
      </div>
      <div className="streamer-tips__last-tips">
        {isLastStreamerTipsLoading
          ? times(10, (index) => (
              <div
                className="streamer-tips__last-tip placeholder"
                key={`streamer-tips__last-tip--placeholder.${index}`}
              />
            ))
          : renderLastStreamerTips}
      </div>
    </>
  );
};
