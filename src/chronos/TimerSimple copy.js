import React from 'react';
import { useState, useEffect } from 'react';
import PubSub from 'pubsub-js';
import topics from '../pub/topics';
import { getAudioSrc, timeToSeconds, dateTohms } from '../Utils';
import { Clock, OverClock } from './subcomponents/CounterClock';
/*
ok, code doesnt handle minutes, seconds, but it fucking works!
see if can replace interval with heart beat.
fix hms -> s.√
display h m s


NXT:
    get seconds from timer.√
    active (pause)
    */

const Timer = ({ timer }) => {
  const [remaining, setRemaining] = useState(
    timeToSeconds(timer.timer.h, timer.timer.m, timer.timer.s)
  );
  const [pause, setPause] = useState(false);

  const togglePause = () => {
    setPause(!pause);
  };

  useEffect(() => {
    console.log(timer);
    return () => {};
  });

  var HeartBeatSubscriber = function (msg, data) {
    if (!pause) {
      setRemaining(remaining - 1);
    }
  };

  PubSub.subscribe(topics.HEARTBEAT, HeartBeatSubscriber);

  return (
    <div>
      <Clock seconds={remaining} />
      <button onClick={togglePause}>{pause ? 'play' : 'pause'}</button>
    </div>
  );
};

export default Timer;
