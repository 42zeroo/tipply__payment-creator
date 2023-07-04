import { useCallback, useRef, useState } from 'react';
import { ArrowContainer, Popover } from 'react-tiny-popover';
import { CSSTransition } from 'react-transition-group';
import arrowRight from 'src/assets/icons/arrow-right.svg';
import emojiIcon from 'src/assets/icons/emoji.svg';
import mailIcon from 'src/assets/icons/mail.svg';
import { Button } from 'src/components/shared/Button';
import { FieldWrapper } from 'src/components/shared/form/FieldWrapper';
import { Input } from 'src/components/shared/form/Input';
import { Textarea } from 'src/components/shared/form/Textarea';
import { usePaymentCreatorContext } from 'src/utils/hooks/usePaymentCreatorContext';
import { useScrollIntoElement } from 'src/utils/hooks/useScrollIntoElement';

export const CreatorMessageView = () => {
  const { streamerProfile, changeCreatorStep, creatorStep, setCreatorStepTransition } =
    usePaymentCreatorContext();

  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollIntoRef } = useScrollIntoElement(containerRef);

  const goToCreatorPaymentView = useCallback(async () => {
    await setCreatorStepTransition('slide-left')
    const canSwitchCreatorStep = changeCreatorStep('CreatorPaymentView');

    if (!canSwitchCreatorStep) {
      scrollIntoRef();
    }
  }, [changeCreatorStep, creatorStep, setCreatorStepTransition]);

  const goToCreatorStreamerTips = useCallback(async () => {
    await setCreatorStepTransition('fade')
    changeCreatorStep('CreatorStreamerTips', false);
  }, [changeCreatorStep, setCreatorStepTransition]);

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const nodeRef = useRef(null);

  return (
    <div className="creator-message-view__container" ref={containerRef}>
      {streamerProfile?.hasTips && (
        <div className="creator-message-view__streamer-tips">
          <Button
            small
            semiTransparent
            iconLeft={mailIcon}
            showIconOnlyOnHover={false}
            type="button"
            onClick={goToCreatorStreamerTips}
          >
            SPRAWDŹ LISTĘ WIADOMOŚCI
          </Button>
        </div>
      )}

      {streamerProfile?.description && (
        <p className="creator-message-view__streamer-profile-info-description">
          {streamerProfile.description}
        </p>
      )}
      <div className="xd"></div>

      <FieldWrapper label="TWÓJ NICKNAME" name="nickname">
        <Input name="nickname" placeholder="Wpisz swój nick" />
      </FieldWrapper>

      <FieldWrapper label="TWÓJ ADRES E-MAIL" name="email">
        <Input name="email" type="email" placeholder="Wpisz adres email" />
      </FieldWrapper>

      <FieldWrapper
        onMouseLeave={() => setIsPopoverOpen(false)}
        label="TREŚĆ WIADOMOŚCI DO STREAMERA"
        name="message"
        textarea
      >
        <Textarea
          maxLength={255}
          name="message"
          placeholder="Wpisz wiadomość..."
        />

        <Popover
          isOpen={isPopoverOpen}
          containerClassName="field-wrapper__error-wrapper__container"
          positions={['top', 'left']} // if you'd like, you can limit the positions
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
              className="popover-arrow-container form-error__wrapper"
              arrowClassName="popover-arrow"
            >
              <CSSTransition
                nodeRef={nodeRef}
                in={isPopoverOpen}
                timeout={200}
                classNames="fade"
              >
                <div ref={nodeRef}>
                  <p>Tu będzie kiedyś menu emotek</p>{' '}
                </div>
              </CSSTransition>
            </ArrowContainer>
          )}
        >
          <button
            type="button"
            className="creator-message-view__textarea-emoji"
            onClick={() => setIsPopoverOpen(!isPopoverOpen)}
          >
            <img src={emojiIcon} alt="emoji-icon" />
          </button>
        </Popover>
      </FieldWrapper>

      <div className="creator-message-view__button-wrapper">
        <Button
          reverseButtonIconColor
          type="button"
          onClick={goToCreatorPaymentView}
          iconRight={arrowRight}
        >
          Przejdź dalej
        </Button>
      </div>
    </div>
  );
};
