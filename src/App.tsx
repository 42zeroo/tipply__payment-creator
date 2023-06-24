import { Form, Formik, FormikValues } from 'formik';
import omit from 'lodash/omit';
import { useCallback, useEffect, useState } from 'react';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import { PageWrapper } from './components/layout/PageWrapper';
import { PaymentCreator } from './components/shared/PaymentCreator';
import { StreamerProfileInfo } from './components/shared/StreamerProfileInfo';
import { PaymentCreatorContextWrapper } from './utils/context/payment-creator-context';
import { useStreamerData } from './utils/hooks/useStreamerData';
import { PaymentCreatorSchema } from './utils/validation-schemas/payment-creator.schema';
import 'src/assets/styles/index.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-coverflow';

export const App = () => {
  const { streamerProfileData, isDataLoading } = useStreamerData();

  const handleSubmit = useCallback(async (formikValues: FormikValues) => {
    alert("Formularz wyslany! Dane z formularza w konsoli.")
    console.log('Wartości z formularza: ' + JSON.stringify(formikValues));
    
    return;
  }, []);


  return (
    <PageWrapper backgroundImageUrl={streamerProfileData?.backgroundImageUrl}>
      {isDataLoading ? (
        <div className="loader">[2 sec] Wczytywanie danych profilu streamera...</div>
      ) : (
        <>
          <StreamerProfileInfo
            {...omit(streamerProfileData, ['description'])}
          />

          <Formik
            validateOnMount
            validateOnChange
            validateOnBlur
            onSubmit={handleSubmit}
            validationSchema={toFormikValidationSchema(PaymentCreatorSchema)}
            initialValues={{
              message: 'mess',
              email: 'email@test.pl',
              nickname: 'test',

              price: '10.00',
              payment_method: '',
              where_tip_goes: streamerProfileData?.whereTipsGoes ? '' : 'UNAVAILABLE',
              
              setValue: null,

              all_agreements: false,
              agreement_message: false,
              agreement_main: false,
            }}
          >
            <Form >
              <PaymentCreatorContextWrapper
                streamerProfile={streamerProfileData}
              >
                <PaymentCreator />
              </PaymentCreatorContextWrapper>
            </Form>
          </Formik>
        </>
      )}
    </PageWrapper>
  );
};
