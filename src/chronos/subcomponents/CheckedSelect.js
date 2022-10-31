import React from 'react';
import { useFormContext } from 'react-hook-form';
//import { ListenIcon } from '../icons';

/*
checkbox: off - shows label eg: alert: beep
          on - shows select dropdown.
props:
check eg: hasAlert (bool)
selectedor eg: alert (id: int)
selectOptions: the data to select from. eg: audioData.
*/

const CheckedSelect = ({ check, selector, selectOptions, label }) => {
  const { register, watch } = useFormContext();
  const watchChecked = watch(check);
  const watchsSelector = watch(selector);

  return (
    <div className="ml-2">
      <span className="ml-1 text-sm furniture">{label}</span>
      <div className="pr-2 h-8 w-[175px] rounded-md baseCell ">
        {/* cs: */}
        {/* <SwitchToggle /> */}
        <input className="ml-2" type="checkbox" {...register(check)} />

        <select
          {...register(selector)}
          value={watchsSelector}
          className={'ml-2  baseCell border-neutral-50  border-solid  border-2  rounded-md w-[138px] ' + (watchChecked ? '' : 'opacity-50' )}>
          {selectOptions.map((item) => (
            <option value={item.id} key={item.id}>
              {item.name}
              {/* {sound.name} : {sound.length}s */}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CheckedSelect;
