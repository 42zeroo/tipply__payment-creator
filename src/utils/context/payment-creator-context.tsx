import React, { useCallback, useMemo, useState } from 'react';
import { CreatorMessageView } from 'src/views/creator/CreatorMessageView';
import { CreatorPaymentView } from 'src/views/creator/CreatorPaymentView';
import { StreamerProfile } from '../entity/StreamerProfile';
import some from 'lodash/some';
import entries from 'lodash/entries';
import { FormikValues, useFormikContext } from 'formik';
import { CreatorStreamerTips } from './../../views/creator/CreatorStreamerTips';

const CREATOR_STEPS_COMPONENTS = {
  CreatorMessageView,
  CreatorPaymentView,
  CreatorStreamerTips,
};

export const CREATOR_STEPS_FIELDS_FOR_VALIDATION: {
  [key in keyof typeof CREATOR_STEPS_COMPONENTS]: string[];
} = {
  CreatorMessageView: ['nickname', 'email', 'message'],
  CreatorPaymentView: [
    'payment_method',
    'price',
    'where_tip_goes',
    'agreement_main',
    'agreement_message',
  ],
  CreatorStreamerTips: [],
};

type PaymentCreatorContextProps = {
  creatorStep: keyof typeof CREATOR_STEPS_COMPONENTS;
  changeCreatorStep: (
    step: keyof typeof CREATOR_STEPS_COMPONENTS,
    validate?: boolean
  ) => void | false;
  CurrentCreatorStepComponent: () => JSX.Element;
  hasErrorsOnCurrentStep: () => boolean;
  streamerProfile: StreamerProfile | null;
  creatorStepTransition: 'slide-right' | 'slide-left' | 'fade';
  setCreatorStepTransition: React.Dispatch<React.SetStateAction<"fade" | "slide-right" | "slide-left">>;
};

export const PaymentCreatorContext =
  React.createContext<PaymentCreatorContextProps>({
    creatorStep: 'CreatorMessageView',
    hasErrorsOnCurrentStep: () => false,
    setCreatorStepTransition: () => false,
    changeCreatorStep: (
      _: keyof typeof CREATOR_STEPS_COMPONENTS,
      __?: boolean
    ) => false,
    CurrentCreatorStepComponent: CreatorMessageView,
    streamerProfile: null,
    creatorStepTransition: 'fade'
  });

export const PaymentCreatorContextWrapper = ({
  children,
  streamerProfile,
}: {
  children: JSX.Element | JSX.Element[];
  streamerProfile: StreamerProfile | null;
}) => {
  const [creatorStep, setCreatorStep] =
    useState<keyof typeof CREATOR_STEPS_COMPONENTS>('CreatorMessageView');
  const { validateField, setFieldTouched, errors, touched } =
    useFormikContext<FormikValues>();

  const validateCurrentStepFields = useCallback(() => {
    for (const fieldToValidate of CREATOR_STEPS_FIELDS_FOR_VALIDATION[
      creatorStep
    ]) {
      setFieldTouched(fieldToValidate, true, false);
      validateField(fieldToValidate);
    }
  }, [creatorStep, setFieldTouched, validateField]);

  const hasErrorsOnCurrentStep = useCallback(() => {
    validateCurrentStepFields();

    const hasErrors = some(entries(errors), ([key, value]) => {
      if (!value && typeof touched[key] !== 'undefined' && touched[key]) {
        return false;
      }

      return CREATOR_STEPS_FIELDS_FOR_VALIDATION[creatorStep].includes(key);
    });

    return hasErrors;
  }, [errors, touched, validateCurrentStepFields]);

  const changeCreatorStep = useCallback(
    (step: keyof typeof CREATOR_STEPS_COMPONENTS, validate = true) => {
      const isCurrentStepValidated = validate
        ? !hasErrorsOnCurrentStep()
        : true;

      if (isCurrentStepValidated) {
        setCreatorStep(step);
      }

      return false;
    },
    [hasErrorsOnCurrentStep, setCreatorStep]
  );

  const [creatorStepTransition, setCreatorStepTransition] = useState<'fade' | 'slide-right' | 'slide-left'>('slide-left')

  return (
    <PaymentCreatorContext.Provider
      value={{
        streamerProfile,
        creatorStep,
        changeCreatorStep,
        creatorStepTransition,
        hasErrorsOnCurrentStep,
        setCreatorStepTransition,
        CurrentCreatorStepComponent: CREATOR_STEPS_COMPONENTS[creatorStep],
      }}
    >
      {children}
    </PaymentCreatorContext.Provider>
  );
};
