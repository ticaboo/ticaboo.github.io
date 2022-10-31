import React, { useEffect, useState } from 'react';
//import UseScheduler from '../Use/useScheduler';
//import UseLocalStorage from '../Use/useLocalStorage';
import Schedule from './Schedule';

const hasHms = (obj) => {
  let res = false;
  if (obj.h && obj.h.length > 0) res = true;
  if (obj.m && obj.m.length > 0) res = true;
  // if (obj.s && obj.s.length >0) res = true //schedules just h,m for now.
  return res;
};

const ScheduleGroup = ({ timers }) => {
  //const { timers } = UseLocalStorage();
  const [schedules, setSchedules] = useState([]);
  //get timer that has changed.
  useEffect(() => {
    console.log('timers changed detected in schedule group');
    const filtered = timers.filter((timer) => hasHms(timer.schedule));
    setSchedules(() => filtered);
    //console.log(filtered);
  }, [timers]);

  return (
    <div>
      ScheduleGroup
      {schedules.map((timer) => (
        <div key={timer.id}>
          <Schedule timer={timer} />
          xxx
        </div>
      ))}
    </div>
  );
};

export default ScheduleGroup;
