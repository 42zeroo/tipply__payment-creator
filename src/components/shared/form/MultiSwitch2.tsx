import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { Button } from '../Button';
import classNames from 'classnames';
import { map } from 'lodash';

type MultiSwitchProps = {
  options: string[];
  activeIndex: number;
  onToggleCallback?: (id: number) => void;
};

export const MultiSwitch = ({
  options,
  activeIndex,
  onToggleCallback,
}: MultiSwitchProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offsetLeft, setOffsetLeft] = useState(0);
  const [switchWidth, setSwitchWidth] = useState(0);

  const onToggle = useCallback(
    (ev: React.MouseEvent<HTMLButtonElement>) => {
      const id = ev && parseInt(ev.currentTarget.id, 10);
      onToggleCallback && onToggleCallback(id);
      setOffsetLeft(ev.currentTarget.offsetLeft);
      setSwitchWidth(ev.currentTarget.clientWidth);
    },
    [setSwitchWidth, setOffsetLeft, onToggleCallback]
  );

  useLayoutEffect(() => {
    if (!containerRef.current || !containerRef.current.children[activeIndex]) {
      return;
    }

    const activeChild = containerRef.current.children[activeIndex] as HTMLElement;
    setOffsetLeft(activeChild.offsetLeft);
    setSwitchWidth(activeChild.clientWidth);
  }, [activeIndex]);

  return (
    <div className="multi-switch-container" ref={containerRef}>
      {map(options, (_, index) => (
        <Button
          key={index}
          id={index.toString()}
          onClick={(e) => {
            onToggle(e);
          }}
          small
          className={classNames('multi-switch__button', {
            'multi-switch__button--is-active': activeIndex === index,
          })}
          type="button"
        >
          {options[index]}
        </Button>
      ))}
      <span
        className="multi-switch-handle multi-switch-handle-move"
        style={{ left: `${offsetLeft}px`, width: `${switchWidth}px` }}
      ></span>
    </div>
  );
};
