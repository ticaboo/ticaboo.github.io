import React from 'react';
import ButtonAnimation from './ButtonAnimation';
import { PauseIcon } from '../../icons';

const PauseButton = ({ clickHandler }) => {
  return (
    <ButtonAnimation
      title="Stop/Pause"
      className=" mx-2 p-1 "
      clickHandler={clickHandler}>
      <PauseIcon />
    </ButtonAnimation>
  );
};

export default PauseButton;
