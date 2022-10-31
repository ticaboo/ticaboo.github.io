import React, { useState, useRef, useEffect } from 'react';
import PubSub from 'pubsub-js';
import topics from '../pub/topics';
import { getAudioSrc, timeToSeconds, dateTohms } from '../Utils';
import { startDuringEndTimer } from '../data/timers';

/* 
    ok, timer state is crazy - flicking, not setting originalDuration,direction right.
    closest i got it was remaining was updating ok, but not the above two.
    actually, remaining was flipping to undefined every beat, and then back to right value.
    trying to fix origDur, direction seems to have fucked remaining, and basicly send multiple renders insane -crashing browser.
    so build up logically, simply, little not complex bits.
    
    it should:

    start on load / a prop set. 
    it should tick and countdown, showing countdown.
    when at 0 it should...

*/
const TimerState = ({ timer }) => {
  const active = useRef();
  const [remaining, setRemaining] = useState();
  var r = timeToSeconds(timer.timer.h, timer.timer.m, timer.timer.s);
  var dir =
    timeToSeconds(timer.timer.h, timer.timer.m, timer.timer.s) === 0 ? 1 : -1;

  var HeartBeatSubscriber = function (msg, data) {
    //setTimeNow(data.data.now);
    r = r - 1;
    console.log('.', r, dir);
    if (active.current) {
      setRemaining(remaining - 1);
    }
  };

  const init = () => {
    active.current = true;
    setRemaining(timeToSeconds(timer.timer.h, timer.timer.m, timer.timer.s));
    console.log('init', active.current, remaining.current);
  };

  PubSub.subscribe(topics.HEARTBEAT, HeartBeatSubscriber);
  useEffect(() => {
    init();
  }, []);
  return (
    <div>
      TimerState
      <div>
        active: {active.current ? 'active' : 'inactive'}
        <div>remainring: {r} </div>
        <div>remaining: {remaining} </div>
      </div>
    </div>
  );
};

export default TimerState;
