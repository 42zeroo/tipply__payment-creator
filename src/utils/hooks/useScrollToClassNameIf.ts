import { useCallback } from 'react';
import { useScrollIntoElement } from './useScrollIntoElement';

export const useScrollToClassNameIf = (
  ref: React.RefObject<HTMLDivElement>
) => {
  const { scrollIntoClassName } = useScrollIntoElement(ref);

  const scrollToClassNameIf = useCallback(
    (
      data: {
        className: string;
        condition: string | boolean | undefined;
      }[]
    ) => {
      if (ref.current) {
        for (const { className, condition } of data) {
          if (condition) {
            scrollIntoClassName(className);
            return;
          }
        }
      }
    },
    [ref.current, scrollIntoClassName]
  );

  return scrollToClassNameIf;
};
