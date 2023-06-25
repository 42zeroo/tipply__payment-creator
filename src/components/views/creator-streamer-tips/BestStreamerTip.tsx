import React from 'react';

interface BestTipProps {
  nickname: string;
  sumOfTips: number;
  index: number;
}

export const BestStreamerTip: React.FC<BestTipProps> = ({
  nickname,
  sumOfTips,
  index,
}) => {
  return (
    <div className="streamer-tips__best-tip__wrapper">
      <div
        className="streamer-tips__best-tip"
        key={`streamer-tips__best-tip#${index}`}
      >
        <div className="streamer-tips__index">{index + 1}</div>
        <div className="streamer-tips__star">
          <svg
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10.6246 0.729922L13.0031 5.87183L17.8741 6.4013C18.1207 6.42582 18.3545 6.52508 18.5458 6.68641C18.737 6.84774 18.877 7.06383 18.9479 7.30707C19.0188 7.55032 19.0173 7.8097 18.9437 8.05208C18.87 8.29447 18.7276 8.50887 18.5345 8.66791L14.6507 11.9407L15.8522 17.4425C15.9059 17.687 15.8882 17.9424 15.8013 18.1767C15.7144 18.411 15.5621 18.6139 15.3635 18.7601C15.1648 18.9064 14.9286 18.9895 14.6842 18.9991C14.4397 19.0087 14.198 18.9444 13.989 18.8141L9.49768 16.0139L5.00231 18.8128C4.79321 18.9427 4.55145 19.0068 4.30708 18.9971C4.06271 18.9874 3.82651 18.9044 3.62784 18.7582C3.42917 18.6121 3.2768 18.4093 3.18966 18.1751C3.10252 17.941 3.08446 17.6857 3.13772 17.4411L4.34462 11.9407L0.46084 8.66791C0.26912 8.50844 0.127951 8.29419 0.0552453 8.05235C-0.0174599 7.81052 -0.0184233 7.552 0.0524773 7.30961C0.123378 7.06721 0.262947 6.85186 0.453472 6.69089C0.643998 6.52992 0.876892 6.43058 1.1226 6.40547L5.99224 5.876L8.37079 0.729922C8.47204 0.511497 8.63166 0.326976 8.83112 0.197778C9.03059 0.0685791 9.26171 0 9.49768 0C9.73365 0 9.96477 0.0685791 10.1642 0.197778C10.3637 0.326976 10.5233 0.511497 10.6246 0.729922V0.729922Z" />
          </svg>
        </div>
        <div className="streamer-tips__details">
          <span>{nickname}</span>
          <p className="streamer-tips__details__tip">
            {sumOfTips.toFixed(2).replace('.', ',')} PLN
          </p>
        </div>
      </div>
    </div>
  );
};
