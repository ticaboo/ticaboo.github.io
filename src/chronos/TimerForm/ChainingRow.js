import React from 'react';
//import CheckedSelect from '../subcomponents/CheckedSelect';
import { useFormContext } from 'react-hook-form';

const CheckedSelect = ({ check, selector, selectOptions, label }) => {
  const { register, watch } = useFormContext();
  const watchChecked = watch(check);
  const watchsSelector = watch(selector);
  //console.log('ChainingRow', { check, selector, selectOptions, label });

  return (
    <div className="ml-2">
      <span className="ml-1 text-sm furniture">{label}</span>
      <div className="pr-2 pt-1 h-8 w-[175px] rounded-md baseCell ">
        <input className="ml-2" type="checkbox" {...register(check)} />

        <select
          {...register(selector)}
          value={watchsSelector}
          className={
            'ml-2  baseCell border-neutral-50  border-solid  border-2  rounded-md w-[138px] ' +
            (watchChecked ? '' : 'opacity-50')
          }>
          {selectOptions.map((item) => (
            <option value={item.id} key={item.id}>
              {item.timer.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

/*
//name: chaining.onend.
*/
const ChainingRow = ({ name, timers }) => {
  return (
    <div className="flex flex-row flex-wrap ">
      <div className="flex flex-col w-[200px]">
        <CheckedSelect
          check={name + 'chainEnabled'}
          selector={name + 'chainId'}
          label="next action"
          selectOptions={timers}
        />
      </div>
    </div>
  );
};

export default ChainingRow;
