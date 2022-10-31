import React from 'react';
import { useFormContext } from 'react-hook-form';

const TextInput = ({ name, label }) => {
  const { register } = useFormContext();

  return (
    <div className="pt-1">
     <div className="ml-3 -mt-3 text-sm furniture">{label}</div>
      <input
        type="text"
        {...register(name)}
        autoCorrect="off" spellCheck="false" autoComplete="off"
        className="ml-2 pl-2 h-8 rounded-md  baseCell border-neutral-50  border-solid  border-2 w-[164px] "
      />
    </div>
  );
};

export default TextInput;
