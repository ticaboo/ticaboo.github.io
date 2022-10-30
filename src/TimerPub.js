import React, { useEffect, useState, useRef } from 'react';
import PubSub from 'pubsub-js';

const Timer = ({ timer }) => {
  const [timeNow, setTimeNow] = useState();
  const [alertAt, setAlertAt] = useState();
  const [active, setActive] = useState(false);
  const toggleActive = () => {
    setActive(!active);
  };

  var HeartBeatSubscriber = function (msg, data) {
    setTimeNow(data.data.now);
  };

  var token = PubSub.subscribe('HEARTBEAT', HeartBeatSubscriber);

  return (
    <div>
      Timer
      <button onClick={toggleActive}> {active ? 'Playing' : 'paused'}</button>
      <div>{active ? timeNow : ''}</div>
    </div>
  );
};

export default Timer;
