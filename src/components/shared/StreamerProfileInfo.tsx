import { ErrorMessage } from 'formik';
import entries from 'lodash/entries';
import map from 'lodash/map';
import values from 'lodash/values';
import { useMemo, useRef, useState } from 'react';
import { ArrowContainer, Popover } from 'react-tiny-popover';
import { CSSTransition } from 'react-transition-group';
import checkMarkWhite from 'src/assets/icons/check.svg';
import {
  StreamerProfile,
  StreamerProfileSocials,
} from 'src/utils/entity/StreamerProfile';
import SocialLink from './SocialLink';
import { Checkmark } from '../layout/Checkmark';

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

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const nodeRef = useRef(null);

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
          <Popover
          isOpen={isPopoverOpen}
          containerClassName="field-wrapper__error-wrapper__container"
          positions={['top', 'right']} // if you'd like, you can limit the positions
          padding={10} // adjust padding here!
          onClickOutside={() => setIsPopoverOpen(false)} // handle click events outside of the popover/target here!
          content={(
            { position, childRect, popoverRect } // you can also provide a render function that injects some useful stuff!
          ) => (
            <ArrowContainer // if you'd like an arrow, you can import the ArrowContainer!
              position={position}
              childRect={childRect}
              popoverRect={popoverRect}
              arrowColor={'blue'}
              arrowSize={10}
              arrowStyle={{ opacity: 0.7 }}
              className="popover-arrow-container popover-arrow-container--checkbox form-error__wrapper--grey"
              arrowClassName="popover-arrow"
            >
              <CSSTransition
                nodeRef={nodeRef}
                in={isPopoverOpen}
                timeout={200}
                classNames="fade"
              >
                <div ref={nodeRef}>
                  <p>Zweryfikowany</p>
                </div>
              </CSSTransition>
            </ArrowContainer>
          )}
        >
          
          <div 
          onMouseEnter={() => setIsPopoverOpen(true)}
          onMouseLeave={() => setIsPopoverOpen(false)}
          onClick={() =>
            setIsPopoverOpen(!isPopoverOpen)
          }
          className="streamer-profile-info__avatar--verified">
            <Checkmark />
          </div>
          
        </Popover>
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
