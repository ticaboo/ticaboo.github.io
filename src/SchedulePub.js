import React, { useEffect, useState, useRef } from 'react';
import PubSub from 'pubsub-js';

/*
todo:
    pass in timer prop from list

*/

const Schedule = ({ timer }) => {
  const [timeNow, setTimeNow] = useState();
  const [alertAt, setAlertAt] = useState();
  const [active, setActive] = useState(); //so only fires once per day
  const activeLocal = useRef();

  var HeartBeatSubscriber = function (msg, data) {
    //console.log(msg, data);
    const now = data.data.now;

    if (activeLocal.current) {
      setTimeNow(now);

      if (now >= alertAt) {
        if (now - alertAt <= 1000) {
          console.log('TRIG');
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
  };

  var token = PubSub.subscribe('HEARTBEAT', HeartBeatSubscriber); //cleanup on component destroy

  useEffect(() => {
    //const inTenSeconds = timer.alertAt + 3000;
    setAlertAt(timer.schedule.alertAt);
    activeLocal.current = true;
    setActive(true);
  }, [timer]);

  useEffect(() => {
    // const inTenSeconds = Date.now() + 3000;
    // setAlertAt(inTenSeconds);
    // setActive(true);
    //on unmount:
    return () => {
      PubSub.unsubscribe(token);
    };
  }, []);

  return (
    <div className="schedule" data-schedule>
      Schedule: {alertAt} Time now: {timeNow} active:{' '}
      {active ? 'active' : 'deactivated'}
      {timer.schedule.alertAt}
    </div>
  );
};

export default Schedule;