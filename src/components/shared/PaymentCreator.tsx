import { usePaymentCreatorContext } from 'src/utils/hooks/usePaymentCreatorContext';
import { SwitchTransition, CSSTransition } from 'react-transition-group';

export const PaymentCreator = () => {
  const { CurrentCreatorStepComponent, creatorStep } =
    usePaymentCreatorContext();

  return (
    <div className="creator-box">
      <SwitchTransition>
        <CSSTransition
          key={creatorStep}
          addEndListener={(node, done) =>
            node.addEventListener('transitionend', done, false)
          }
          classNames="fade"
        >
          <CurrentCreatorStepComponent />
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
};
