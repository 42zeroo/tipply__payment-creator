import classNames from 'classnames';
import { useField, useFormikContext } from 'formik';
import { find, findIndex } from 'lodash';
import map from 'lodash/map';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Slider from 'react-slick';
import arrowLeft from 'src/assets/icons/arrow-left.svg';
import arrowRight from 'src/assets/icons/arrow-right.svg';
import { Button } from 'src/components/shared/Button';
import { Recorder } from 'src/components/shared/Recorder';
import { Checkbox } from 'src/components/shared/form/Checkbox';
import { CustomFullWidthError } from 'src/components/shared/form/CustomFullWidthError';
import PriceField from 'src/components/shared/form/PriceField';
import { Header } from 'src/components/shared/header';
import { PaymentMethod } from 'src/components/views/creator-payment-view/PaymentMethod';
import { PredefinedPriceSwiperComponent } from 'src/components/views/creator-payment-view/PredefinedPriceSwiperComponent';
import { WhereTipGoes } from 'src/components/views/creator-payment-view/WhereTipsGoes';
import { PAYMENT_METHODS } from 'src/utils/const/payment-methods';
import { usePaymentCreatorContext } from 'src/utils/hooks/usePaymentCreatorContext';
import { useScrollToClassNameIf } from 'src/utils/hooks/useScrollToClassNameIf';

export const CreatorPaymentView = () => {
  const { changeCreatorStep, streamerProfile, hasErrorsOnCurrentStep, setCreatorStepTransition } =
    usePaymentCreatorContext();
  const { submitForm } = useFormikContext();

  const goBackToCreatorMessageView = useCallback(
    async () => {
      await setCreatorStepTransition('slide-right');
      changeCreatorStep('CreatorMessageView', false);
    },
    [changeCreatorStep, setCreatorStepTransition]
  );

  const containerRef = useRef<HTMLDivElement>(null);

  const [
    { value: priceFieldValue },
    { error: fieldPriceError, touched: fieldPriceTouched },
    {
      setValue: setPriceFieldValue,
      setTouched: setPriceFieldTouched,
      setError: setPriceFieldError,
    },
  ] = useField('price');
  const [
    { value: paymentMethodValue },
    { error: paymentMethodError, touched: paymentMethodTouched },
    { setValue: setPaymentMethodValue, setTouched: setPaymentMethodTouched },
  ] = useField('payment_method');

  const [
    { value: whereTipGoesValue },
    { error: whereTipGoesError, touched: whereTipGoesTouched },
    { setValue: setWhereTipGoesValue, setTouched: setWhereTipGoesTouched },
  ] = useField('where_tip_goes');

  const [
    ,
    { error: allAgreementsError, touched: allAgreementsTouched },
    { setValue: setAllAgreementsValue },
  ] = useField('all_agreements');
  const [
    { value: agreementMainValue },
    { error: agreementMainError, touched: agreementMainToched },
    {
      setValue: setAgreementMainValue,
      setTouched: setAgreementMainValueTouched,
    },
  ] = useField('agreement_main');
  const [
    { value: agreementMessageValue },
    { error: agreementMessageError, touched: agreementMessageToched },
    {
      setValue: setAgreementMessageValue,
      setTouched: setAgreementMessageValueTouched,
    },
  ] = useField('agreement_message');

  const toggleAllAgreements = useCallback(() => {
    if (!agreementMessageValue || !agreementMainValue) {
      setAllAgreementsValue(true);
      setAgreementMessageValue(true);
      setAgreementMainValue(true);
      setAgreementMessageValueTouched(true);
      setAgreementMainValueTouched(true);
    }

    if (agreementMessageValue && agreementMainValue) {
      setAllAgreementsValue(false);
      setAgreementMessageValue(false);
      setAgreementMainValue(false);
    }
  }, [
    agreementMainValue,
    agreementMessageValue,
    setAgreementMainValue,
    setAgreementMessageValue,
    setAllAgreementsValue,
    setAgreementMainValueTouched,
    setAgreementMessageValueTouched,
  ]);

  const shouldProceedToPayment = useMemo(
    () =>
      agreementMainValue &&
      agreementMessageValue &&
      paymentMethodValue &&
      parseFloat(priceFieldValue) > 0,
    [
      agreementMainValue,
      agreementMessageValue,
      priceFieldValue,
      paymentMethodValue,
    ]
  );

  const scrollToFieldWithErrorData = useMemo(
    () => [
      {
        className: 'creator-payment-view__price',
        condition:
          priceFieldValue?.length === 0 ||
          parseFloat(priceFieldValue) <= 0 ||
          (fieldPriceTouched && fieldPriceError) ||
          !priceFieldValue,
      },
      {
        className: 'creator-payment-view__payment-methods',
        condition:
          !paymentMethodTouched || (paymentMethodTouched && paymentMethodError),
      },
      {
        className: 'creator-payment-view__where-payment-goes',
        condition:
          !whereTipGoesTouched || (whereTipGoesTouched && whereTipGoesError),
      },
      {
        className: 'creator-payment-view__agreements',
        condition:
          (allAgreementsTouched && allAgreementsError) ||
          agreementMainError ||
          agreementMessageError ||
          !agreementMessageToched ||
          !agreementMainToched,
      },
    ],
    [
      fieldPriceError,
      paymentMethodError,
      whereTipGoesError,
      priceFieldValue,
      paymentMethodValue,
      allAgreementsError,
      allAgreementsTouched,
      agreementMessageToched,
      agreementMainToched,
      agreementMainError,
      agreementMessageError,
      fieldPriceTouched,
      paymentMethodTouched,
      whereTipGoesTouched,
    ]
  );

  const scrollToClassNameIf = useScrollToClassNameIf(containerRef);

  const submit = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();

      const hasErrors = hasErrorsOnCurrentStep();

      if (hasErrors) {
        scrollToClassNameIf(scrollToFieldWithErrorData);
      } else {
        submitForm();
      }
    },
    [
      submitForm,
      hasErrorsOnCurrentStep,
      scrollToClassNameIf,
      scrollToFieldWithErrorData,
    ]
  );

  const handlePaymentMethodChange = useCallback(
    (name: string) => {
      if (paymentMethodValue === name) {
        setPaymentMethodValue('', true);

        return;
      }

      setPaymentMethodValue(name, true);
      setPaymentMethodTouched(true, false);
    },
    [paymentMethodValue, setPaymentMethodValue, setPaymentMethodTouched]
  );

  const handleWhereTipGoesChange = useCallback(
    (name: string) => {
      if (whereTipGoesValue === name) {
        setWhereTipGoesValue('', true);

        return;
      }

      setWhereTipGoesValue(name, true);
      setWhereTipGoesTouched(true, false);
    },
    [whereTipGoesValue, setWhereTipGoesValue, setWhereTipGoesTouched]
  );

  const sliderRef = useRef<Slider>(null);

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (
      streamerProfile?.predefinedPrices &&
      streamerProfile.predefinedPrices.includes(
        parseFloat(priceFieldValue?.replace(',', '.') ?? '0')
      )
    ) {
      sliderRef.current?.slickGoTo(
        findIndex(
          streamerProfile.predefinedPrices,
          (price) =>
            price === parseFloat(priceFieldValue?.replace(',', '.') ?? '0')
        )
      );
    }
  }, [priceFieldValue, streamerProfile?.predefinedPrices]);

  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    if (window) {
      const handler = () => {
        setIsMobile(window.innerWidth < 768);
      };

      handler();

      window.addEventListener('resize', handler);

      return () => window.removeEventListener('resize', handler);
    }
  }, [setIsMobile]);

  const DEFAULT_PREDEFINED_PRICES = [3, 6, 10, 20, 30];
  const predefinedPrices = useMemo(() => {
    if (streamerProfile?.predefinedPrices) {
      return streamerProfile.predefinedPrices;
    }

    return DEFAULT_PREDEFINED_PRICES;
  }, [streamerProfile?.predefinedPrices]);

  
  useEffect(() => {
    const priceValue = parseFloat(
      typeof priceFieldValue === 'string'
        ? priceFieldValue.replace(',', '.')
        : priceFieldValue
    );

    const maxValueOfCurrentPaymentMethod =
      find(
        PAYMENT_METHODS,
        (paymentMethod) => paymentMethod.name === paymentMethodValue
      )?.max ?? 25000;

    if (!isNaN(priceValue) && priceValue > maxValueOfCurrentPaymentMethod) {
      setPriceFieldValue(maxValueOfCurrentPaymentMethod?.toFixed(2), false);
      setPriceFieldTouched(true, false);
      setPriceFieldError(undefined);
    }

    if (
      paymentMethodValue === 'SMS' &&
      (!priceFieldValue || !predefinedPrices.includes(priceValue))
    ) {
      if (Math.floor(predefinedPrices.length / 2) !== currentSlide) {
        sliderRef.current?.slickGoTo(Math.floor(predefinedPrices.length / 2));
      }

      setPriceFieldValue(
        predefinedPrices[Math.floor(predefinedPrices.length / 2)].toFixed(2).replace('.', ','),
        false
      );
      setPriceFieldTouched(true, false);
      setPriceFieldError(undefined);
    }
  }, [
    // streamerProfile?.predefinedPrices,
    setPriceFieldValue,
    currentSlide,
    priceFieldValue,
    predefinedPrices,
    paymentMethodValue,
    setPriceFieldTouched,
  ]);

  return (
    <div className="creator-payment-view__container" ref={containerRef}>
      <div className="creator-payment-view__price">
        <Header
          title="WYBIERZ KWOTĘ"
          subtitle="KWOTA ZMIENI WYGLĄD WIADOMOŚCI"
        />

        <div className="creator-payment-view__price-input">
          <PriceField
            name="price"
            id="price"
            placeholder="price"
            showPriceWithTax={paymentMethodValue === 'SMS_PLUS'}
            showPriceWithTipplyCommission={paymentMethodValue === 'SMS_FULL'}
          />
        </div>

        {(paymentMethodValue === 'SMS' ||
          streamerProfile?.predefinedPrices) && (
          <>
            <div className="creator-payment-view__predefined-price__header">
              <p>LUB WYBIERZ KWOTĘ</p>
            </div>

            <div
              className={classNames('creator-payment-view__predefined-price', {
                'creator-payment-view__predefined-price--no-slider':
                  predefinedPrices.length <= (isMobile ? 3 : 4),
              })}
            >
              {predefinedPrices.length > (isMobile ? 3 : 4) ? (
                <Slider
                  afterChange={(currentSlide) => setCurrentSlide(currentSlide)}
                  ref={sliderRef}
                  {...{
                    className: 'slider variable-width',
                    initialSlide:
                      predefinedPrices.length > 4
                        ? Math.floor(predefinedPrices.length / 2)
                        : 1,
                    infinite: false,
                    arrows: false,
                    dots: false,
                    centerMode: true,
                    slidesToScroll: 1,
                    variableWidth: true,
                    swipeToSlide: true,
                    slidesToShow: 1,
                  }}
                >
                  {map(predefinedPrices, (price) => (
                    <PredefinedPriceSwiperComponent
                      priceFieldName="price"
                      predefinedPrices={predefinedPrices}
                      key={price}
                      price={price}
                      isActive={
                        price.toFixed(2).replace('.', ',') ===
                          priceFieldValue ||
                        price.toFixed(1) === priceFieldValue ||
                        priceFieldValue?.toString() === price?.toString() ||
                        `${price}.` === priceFieldValue
                      }
                      onClick={() => {
                        if (
                          priceFieldValue !== price.toFixed(2).replace('.', ',')
                        ) {
                          setPriceFieldValue(
                            price.toFixed(2).replace('.', ',')
                          );
                        }

                        const slideIndexOfClickedPredefinedPrice = findIndex(
                          predefinedPrices,
                          (predefinedPrice) => price === predefinedPrice
                        );

                        if (
                          currentSlide !== slideIndexOfClickedPredefinedPrice
                        ) {
                          sliderRef.current?.slickGoTo(
                            slideIndexOfClickedPredefinedPrice
                          );
                        }
                      }}
                    />
                  ))}
                </Slider>
              ) : (
                <>
                  {map(predefinedPrices, (price) => (
                    <PredefinedPriceSwiperComponent
                      priceFieldName="price"
                      predefinedPrices={predefinedPrices}
                      key={price}
                      price={price}
                      isActive={
                        price.toFixed(2).replace('.', ',') ===
                          priceFieldValue ||
                        price.toFixed(1) === priceFieldValue ||
                        priceFieldValue?.toString() === price?.toString() ||
                        `${price}.` === priceFieldValue
                      }
                      onClick={() => {
                        if (
                          priceFieldValue !== price.toFixed(2).replace('.', ',')
                        ) {
                          setPriceFieldValue(
                            price.toFixed(2).replace('.', ',')
                          );
                        }

                        const slideIndexOfClickedPredefinedPrice = findIndex(
                          predefinedPrices,
                          (predefinedPrice) => price === predefinedPrice
                        );

                        if (
                          currentSlide !== slideIndexOfClickedPredefinedPrice
                        ) {
                          sliderRef.current?.slickGoTo(
                            slideIndexOfClickedPredefinedPrice
                          );
                        }
                      }}
                    />
                  ))}
                </>
              )}
            </div>
          </>
        )}
      </div>

      <Header
        title="WYBIERZ METODĘ PŁATNOŚCI"
        subtitle="JAKĄ DZIŚ ZAPŁACISZ?"
      />

      <div className="creator-payment-view__payment-methods">
        {map(PAYMENT_METHODS, ({ name, image, text }) => (
          <PaymentMethod
            key={name}
            isZen={name === 'ZEN'}
            name={name}
            image={image}
            text={text}
            isActive={paymentMethodValue === name}
            onClick={() => handlePaymentMethodChange(name)}
          />
        ))}
      </div>

      <CustomFullWidthError
        name="payment_method"
        message="Wybranie metody płatności jest wymagane"
      />

      {streamerProfile && streamerProfile.whereTipsGoes && (
        <>
          <Header
            title={`DOKONAJ WYBORU, \nGDZIE POWIĘDRUJE KWOTA`}
            subtitle="PRZEMYŚL TO DWA RAZY!"
          />
          <div className="creator-payment-view__where-payment-goes">
            {map(
              streamerProfile.whereTipsGoes,
              ({ name, limit, actualTipValue }, index) => (
                <WhereTipGoes
                  index={index}
                  key={name}
                  name={name}
                  limit={limit}
                  actualTipValue={actualTipValue}
                  isActive={whereTipGoesValue === name}
                  onClick={() => handleWhereTipGoesChange(name)}
                />
              )
            )}
          </div>

          <CustomFullWidthError
            name="where_tip_goes"
            message="Wybranie celu wpłaty jest wymagane"
            className="creator-payment-view__where-payment-goes__error"
          />
        </>
      )}

      {streamerProfile && streamerProfile.allowRecord && (
        <Recorder
          name="audio_record"
          disabled={
            !isFinite(parseFloat(priceFieldValue)) ||
            parseFloat(priceFieldValue) < 20
          }
        />
      )}
      <div
        className={classNames('creator-payment-view__agreements', {
          'creator-payment-view__agreements--extra-space-top':
            !(streamerProfile && streamerProfile.whereTipsGoes) ||
            streamerProfile.allowRecord,
        })}
      >
        <Checkbox
          showError={false}
          label="Zaznacz wszystkie zgody"
          name="all_agreements"
          checked={agreementMessageValue && agreementMainValue}
          onClick={toggleAllAgreements}
        />
        <Checkbox
          showError={
            (agreementMainToched || agreementMessageToched) &&
            !agreementMessageValue
          }
          checked={agreementMessageValue}
          label={
            <>
              Akceptuję{' '}
              <a href="#">
                Regulamin udostępniania komunikatu tekstowego podczas
                internetowej transmisji wideo
              </a>
              .
            </>
          }
          name="agreement_message"
        />
        <Checkbox
          showError={
            (agreementMainToched || agreementMessageToched) &&
            !agreementMainValue
          }
          label="Wyrażam zgodę na natychmiastowe rozpoczęcie świadczenia i rozumiem, że jeśli umowa zostanie w pełni wykonana to nie przysługuje mi prawo do odstąpienia od umowy zawartej na odległość."
          name="agreement_main"
          checked={agreementMainValue}
        />
      </div>

      <div className="creator-payment-view__buttons">
        <Button
          type={shouldProceedToPayment ? 'submit' : 'button'}
          onClick={submit}
          reverseButtonIconColor
          iconRight={arrowRight}
        >
          Przejdź do płatności
        </Button>

        <Button
          reverseButtonIconColor
          iconLeft={arrowLeft}
          type="button"
          transparent
          onClick={goBackToCreatorMessageView}
        >
          Wstecz
        </Button>
      </div>
    </div>
  );
};
