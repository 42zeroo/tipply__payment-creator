import entries from 'lodash/entries';
import map from 'lodash/map';
import values from 'lodash/values';
import { useMemo } from 'react';
import checkMarkWhite from 'src/assets/icons/check.svg';
import {
  StreamerProfile,
  StreamerProfileSocials,
} from 'src/utils/entity/StreamerProfile';
import SocialLink from './SocialLink';

export const StreamerProfileInfo = ({
  name,
  socials,
  avatarUrl,
  backgroundImageUrl,
  isVerified,
}: Omit<StreamerProfile, 'description'>) => {
  const streamerSocials = useMemo(
    () =>
      map(
        entries(socials),
        ([socialName, linkToSocial]: [
          keyof StreamerProfileSocials,
          string
        ]) => (
          <SocialLink
            key={`${socialName}:${linkToSocial}`}
            type={socialName}
            href={linkToSocial}
          />
        )
      ),
    [socials]
  );

  return (
    <div className="streamer-profile-info__container">
      {backgroundImageUrl ? (
        <img
          src={backgroundImageUrl}
          alt="custom-profile-background"
          className="streamer-profile-info__background-image"
        />
      ) : (
        <div className="streamer-profile-info__background-image" />
      )}

      <div className="streamer-profile-info__avatar">
        <div className="streamer-profile-info__avatar__image">
          {
            avatarUrl ? (
              <img
                src={avatarUrl}
                alt="streamer-avatar"
              />
            ) : (
              <p>?</p>
            )
          }
        </div>
        {isVerified && (
          <div className="streamer-profile-info__avatar--verified">
            <img src={checkMarkWhite} alt="check_mark-white" />
          </div>
        )}
      </div>

      <div className="streamer-profile-info__name">{name}</div>

      {isVerified && (
        <div className="streamer-profile-info__verified">
          Streamer zweryfikowany
        </div>
      )}

      {values(streamerSocials).length > 0 && (
        <div className="streamer-profile-info__socials">{streamerSocials}</div>
      )}
    </div>
  );
};
