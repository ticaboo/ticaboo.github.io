import React from 'react';
import ButtonAnimation from './ButtonAnimation';
import { EditIcon } from '../../icons';

const EditButton = ({ clickHandler }) => {
  return (
    <ButtonAnimation clickHandler={clickHandler}>
      <div
        title="Edit"
        className="border-neutral-300 border-2 rounded-full mx-1 p-1 ">
        <EditIcon />
      </div>
    </ButtonAnimation>
  );
};

export default EditButton;
