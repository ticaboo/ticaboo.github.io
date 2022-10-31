import React, { useEffect, useState, useRef } from 'react';
import { useAtom } from 'jotai';
import { heartBeatAtom } from './atoms/index';
/*
todo:
    pass in timer prop from list

*/

const Schedule = ({ timer }) => {
  const [beat] = useAtom(heartBeatAtom);
  const [timeNow, setTimeNow] = useState();
  const [alertAt, setAlertAt] = useState();
  const [active, setActive] = useState(); //so only fires once per day
  const activeLocal = useRef();

  useEffect(() => {
    console.log(beat);
    const now = beat.data.now;

    if (activeLocal.current) {
      setTimeNow(now);

      if (now >= alertAt) {
        if (now - alertAt <= 1000) {
          console.log('TRIG A');
          activeLocal.current = false;
          setActive(false);
        } else if (activeLocal.current) {
          console.log(
            'scheduled triggered',
            (now - alertAt) / 1000,
            'seconds late.'
          );
        }
      }
    }
  }, [beat]);

  useEffect(() => {
    //const inTenSeconds = timer.alertAt + 3000;
    setAlertAt(timer.schedule.alertAt);
    activeLocal.current = true;
    setActive(true);
  }, [timer]);

  return (
    <div>
      Atomic Schedule: {alertAt} Time now: {timeNow} active:{' '}
      {active ? 'active' : 'deactivated'}
      {timer.schedule.alertAt}
    </div>
  );
};

export default Schedule;