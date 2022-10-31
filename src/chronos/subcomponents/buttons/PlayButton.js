import React from 'react';
import ButtonAnimation from './ButtonAnimation';
import { PlayIcon } from '../../icons';

const PlayButton = ({ clickHandler, type }) => {
  return (
    <div title="Start">
      <ButtonAnimation
        className=" mx-2 p-1 "
        clickHandler={clickHandler}
        type={type}>
        <PlayIcon />
      </ButtonAnimation>
    </div>
  );
};

export default PlayButton;
