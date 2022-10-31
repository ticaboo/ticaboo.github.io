import React from 'react';
import { useFormContext } from 'react-hook-form';
import { DuplicateIcon } from '../../icons';
import ButtonAnimation from './ButtonAnimation';

/*

*/

const DuplicateTimerButton = ({ clickHandler }) => {
  const { watch } = useFormContext();
  //const watchID = watch('id');

  const duplicateTimerHandler = () => {
    clickHandler(watch());
  };
  return (
    <ButtonAnimation
      title="Copy timer -> Library."
      className="rounded-full  p-1 "
      clickHandler={duplicateTimerHandler}>
      <div
        title="Copy timer -> Library."
        className="border-neutral-300 border-2 rounded-full mx-1 p-1 ">
        <DuplicateIcon />
      </div>
    </ButtonAnimation>
  );
};

export default DuplicateTimerButton;
