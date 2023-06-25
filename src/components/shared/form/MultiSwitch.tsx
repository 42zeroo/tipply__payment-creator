import React, { useState } from 'react';
import { Button } from '../Button';
import classNames from 'classnames';

interface MultiSwitchProps {
  texts: string[];
  selectedSwitch?: number;
  bgColor?: string;
  borderColor?: string;
  borderWidth?: string;
  fontColor?: string;
  disabled?: boolean;
  selectedFontColor?: string;
  selectedSwitchColor?: string;
  fontSize?: string;
  fontWeight?: string;
  onToggleCallback?: (id: number) => void;
  eachSwitchWidth?: number;
  activeIndex?: number;
  height?: string;
}

export const MultiSwitch: React.FC<MultiSwitchProps> = ({
  texts,
  selectedSwitch = 0,
  disabled,
  activeIndex,
  fontWeight = 'bold',
  onToggleCallback,
  eachSwitchWidth = 98,
}) => {
  const [currentSwitch, setCurrentSwitch] = useState(selectedSwitch);

  const onToggle = (ev: React.MouseEvent<HTMLButtonElement>) => {
    const id = ev && parseInt(ev.currentTarget.id, 10);
    onToggleCallback && onToggleCallback(id);
    setCurrentSwitch(id);
  };

  const noOfSwitches = texts.length || 2;
  const switchWidth = noOfSwitches * eachSwitchWidth;
  const switchStyles = {
    width: `${switchWidth}px`,
  };
  const labelWidth = `${eachSwitchWidth || switchWidth / noOfSwitches}px`;

  const switches = texts.map((_, index) => {
    const labelStyles = {
      width: labelWidth,
      fontWeight,
    };
    let classSwitchContent = 'multi-switch-content';

    if (currentSwitch === index) {
      classSwitchContent = `${classSwitchContent} multi-switch-handle-color`;
    }
    return (
      <Button
        disabled={disabled}
        key={index}
        id={index.toString()}
        style={labelStyles}
        onClick={(e) => {
          onToggle(e);
        }}
        small
        className={classNames(classSwitchContent, 'multi-switch__button', {
          'multi-switch__button--is-active': activeIndex === index,
        })}
        type="button"
      >
        {texts[index]}
      </Button>
    );
  });

  const switchHandleStyles = {
    width: labelWidth,
    left: `${currentSwitch * eachSwitchWidth}px`,
  };

  const classNameHandle = 'multi-switch-handle multi-switch-handle-move';
  return (
    <div className="multi-switch-container" style={switchStyles}>
      {switches}
      <span className={classNameHandle} style={switchHandleStyles}></span>
    </div>
  );
};
