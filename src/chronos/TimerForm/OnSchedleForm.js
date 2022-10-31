import React from 'react';
import CheckedText from '../subcomponents/CheckedText';
import HMSinput from '../subcomponents/HMSInput';

const OnSchedleForm = ({ name }) => {
  return (
    <div>
      <CheckedText
        name={name + 'scheduleAnnounce'}
        check={name + 'hasScheduleAnnounce'}
        label=""
      />
      <HMSinput name={name} />
      <span className="ml-2 text-sm furniture">schedule-</span>
    </div>
  );
};

export default OnSchedleForm;
