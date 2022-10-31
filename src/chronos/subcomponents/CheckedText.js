import React from 'react';
import { useFormContext } from 'react-hook-form';

/*

*/

const CheckedText = ({ name, check, label, type = 'text' }) => {
  const { register, watch } = useFormContext();
  const watchChecked = watch(check);

  // useEffect(() => {
  //   if (watchChecked) {
  //     setFocus(name);
  //   }
  // }, [watchChecked, setFocus]);

  return (
    <div className="ml-2">
      <span className="ml-1 text-sm furniture">{label}</span>
      <div className=" pr-2 h-8 w-[175px] rounded-md baseCell">
        <input type="checkbox" {...register(check)} className="ml-2" />

        <input
          type={type}
          {...register(name)}
          className={
            'ml-1 pl-2 mt-1 w-[138px]  border-neutral-50  border-solid  border-2 h-6 rounded-md  baseCell ' +
            (watchChecked ? '' : 'opacity-50')
          }
        />
      </div>
    </div>
  );
};

export default CheckedText;
