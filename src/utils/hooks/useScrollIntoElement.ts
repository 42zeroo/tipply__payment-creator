import { useCallback } from "react";

export const useScrollIntoElement = (ref: React.RefObject<HTMLDivElement>) => {
  const scrollIntoClassName = useCallback((className: string) => {
    if (!ref.current) {
      throw Error('You have to pass ref!');
    }

    const element = ref.current.getElementsByClassName(
      className
    )[0] as HTMLDivElement;

    if (window) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth',
      });
    }
  }, []);

  const scrollIntoRef = useCallback(() => {
    if (!ref.current) {
      throw Error('You have to pass ref!');
    }

    const offsetTop = ref.current.offsetTop;

    if (window) {
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  }, [ref.current])

  return { scrollIntoClassName, scrollIntoRef };
};