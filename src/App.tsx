import { Form, Formik, FormikValues } from 'formik';
import omit from 'lodash/omit';
import { useCallback } from 'react';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import 'src/assets/styles/index.scss';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { PageWrapper } from './components/layout/PageWrapper';
import { PaymentCreator } from './components/shared/PaymentCreator';
import { StreamerProfileInfo } from './components/shared/StreamerProfileInfo';
import { PaymentCreatorContextWrapper } from './utils/context/payment-creator-context';
import { useStreamerData } from './utils/hooks/useStreamerData';
import { PaymentCreatorSchema } from './utils/validation-schemas/payment-creator.schema';

export const App = () => {
  const { streamerProfileData, isDataLoading } = useStreamerData();

  const handleSubmit = useCallback(async (formikValues: FormikValues) => {
    formikValues = {...formikValues, price: parseFloat(formikValues.price.replace(',', '.'))}
    alert('Formularz wyslany! Dane z formularza w konsoli.');
    console.log('Wartości z formularza: ', formikValues);

    return;
  }, []);

  return (
    <>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </head>
      <PageWrapper backgroundImageUrl={streamerProfileData?.backgroundImageUrl}>
        {isDataLoading ? (
          <div className="loader">
            [2 sec] Wczytywanie danych profilu streamera...
          </div>
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
                message: 'asd',
                email: 'asd@asd.pl',
                nickname: 'asd',

                price: undefined,
                payment_method: '',
                where_tip_goes: streamerProfileData?.whereTipsGoes
                  ? ''
                  : 'UNAVAILABLE',

                all_agreements: false,
                agreement_message: false,
                agreement_main: false,
              }}
            >
              <Form>
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
    </>
  );
};
