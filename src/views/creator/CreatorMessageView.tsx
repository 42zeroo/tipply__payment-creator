import { useFormikContext } from 'formik';
import { useCallback, useMemo, useRef, useState } from 'react';
import arrowRight from 'src/assets/icons/arrow-right.svg';
import mailIcon from 'src/assets/icons/mail.svg';
import { Button } from 'src/components/shared/Button';
import { FieldWrapper } from 'src/components/shared/form/FieldWrapper';
import { Input } from 'src/components/shared/form/Input';
import { Textarea } from 'src/components/shared/form/Textarea';
import { usePaymentCreatorContext } from 'src/utils/hooks/usePaymentCreatorContext';
import { useScrollIntoElement } from 'src/utils/hooks/useScrollIntoElement';
import { Popover, ArrowContainer } from 'react-tiny-popover';

export const CreatorMessageView = () => {
  const { streamerProfile, changeCreatorStep, creatorStep } =
    usePaymentCreatorContext();

  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollIntoRef } = useScrollIntoElement(containerRef);

  const goToCreatorPaymentView = useCallback(() => {
    const canSwitchCreatorStep = changeCreatorStep('CreatorPaymentView');

    if (!canSwitchCreatorStep) {
      scrollIntoRef()
    }
  }, [changeCreatorStep, creatorStep]);

  const goToCreatorStreamerTips = useCallback(() => {
    changeCreatorStep('CreatorStreamerTips', false);
  }, [changeCreatorStep]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);


  return (
    <div className="creator-message-view__container" ref={containerRef}>
      {streamerProfile?.hasTips && (
        <div className="creator-message-view__streamer-tips">
          <Button
            small
            semiTransparent
            iconLeft={mailIcon}
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
      <div className="xd">

      
      </div>

      <FieldWrapper label="TWÓJ NICKNAME" name='nickname'>
        <Input name="nickname" />
      </FieldWrapper>

      <FieldWrapper label="TWÓJ ADRES E-MAIL" name='email'>
        <Input name="email" type="email" />
      </FieldWrapper>

      <FieldWrapper label="TREŚĆ WIADOMOŚCI DO STREAMERA" name='message'>
        <Textarea maxLength={255} name="message" />
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
