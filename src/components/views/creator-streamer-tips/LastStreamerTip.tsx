import React from 'react';
import classNames from 'classnames';

interface LastTipProps {
  nickname: string;
  tip: number;
  isHighest?: boolean;
}

export const LastStreamerTip: React.FC<LastTipProps> = ({
  nickname,
  tip,
  isHighest = false,
}) => {
  return (
    <div
      className={classNames('streamer-tips__last-tip', {
        'streamer-tips__last-tip--highest': isHighest,
      })}
    >
      <span>{nickname}</span>
      <span>{tip.toFixed(2)} PLN</span>
    </div>
  );
};
