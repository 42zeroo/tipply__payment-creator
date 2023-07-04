import { usePaymentCreatorContext } from 'src/utils/hooks/usePaymentCreatorContext';
import { SwitchTransition, CSSTransition } from 'react-transition-group';

export const PaymentCreator = () => {
  const { CurrentCreatorStepComponent, creatorStep, creatorStepTransition } =
    usePaymentCreatorContext();

  return (
    <div className="creator-box">
      <SwitchTransition>
        <CSSTransition
          key={creatorStep}
          timeout={300}
          addEndListener={(node, done) =>
            node.addEventListener('transitionend', done, false)
          }
          classNames={creatorStepTransition}
        >
          <CurrentCreatorStepComponent />
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
};
