import React from 'react';
import { useState, useEffect } from 'react';
import PubSub from 'pubsub-js';
import topics from '../pub/topics';
import { getAudioSrc, timeToSeconds, dateTohms } from '../Utils';
/*
ok, code doesnt handle minutes, seconds, but it fucking works!
see if can replace interval with heart beat.
fix hms -> s.
display h m s
    
NXT:
    get seconds from timer.√
*/

const Timer = ({ timer }) => {
  //   const { startingMinutes = 111, startingSeconds = 0 } = props;

  const [secs, setSeconds] = useState(
    timeToSeconds(timer.timer.h, timer.timer.m, timer.timer.s)
  );

  useEffect(() => {
    console.log(timer);
    return () => {};
  });

  var HeartBeatSubscriber = function (msg, data) {
    setSeconds(secs - 1);
  };

  PubSub.subscribe(topics.HEARTBEAT, HeartBeatSubscriber);

  return <div>{secs < 10 ? `0${secs}` : secs}</div>;
};

export default Timer;
