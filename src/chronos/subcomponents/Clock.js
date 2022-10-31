import React, { useState } from 'react';
import { dateTohms } from '../../Utils';
import PubSub from 'pubsub-js';

const Clock = () => {
  //const [beat] = useState();
  const [hms, setHms] = useState({ h: '', m: '', s: '' });

  var HeartBeatSubscriber = function (msg, data) {
    setHms(dateTohms(new Date()));
  };

  // var token =  //todo: destroy on unmount.
  PubSub.subscribe('HEARTBEAT', HeartBeatSubscriber);

  return (
    <div>
      {hms.h}:{hms.m}:{hms.s}
    </div>
  );
};

export default Clock;
