import React from 'react';
import { useState, useEffect } from 'react';
import PubSub from 'pubsub-js';
import topics from '../pub/topics';
import { getAudioSrc, timeToSeconds } from '../Utils';
import { Clock, OverClock } from './subcomponents/CounterClock';
import ReplayButton from './subcomponents/buttons/ReplayButton';
import PlayButton from './subcomponents/buttons/PlayButton';
import PauseButton from './subcomponents/buttons/PauseButton ';
import EditButton from './subcomponents/buttons/EditButton';

import useAlerts from '../Use/useAlerts';
import { useAudio } from '../Use/useAudio';
//import notify from './notifiy';
/*
ok, code doesnt handle minutes, seconds, but it fucking works!
see if can replace interval with heart beat.
fix hms -> s.√
display h m s
ALL that i can see is different is:
     not initialising state
     init returns, and has no []

NXT:
    get seconds from timer.√
    active (pause)√
   
    Build up:
        direction √
        overclock √
        buttons...
        cycle, alerts.


    parking lot:
     delta 
     timer jiggle on seconds change.
    */

const Timer = ({ timer, setPlayerVisible }) => {
  //const [heartBeatDeltaMS, setHeartBeatDeltaMS] = useState(dateTohms().ms + 1);

  const [remaining, setRemaining] = useState(
    timeToSeconds(timer.timer.h, timer.timer.m, timer.timer.s)
  );
  const [pause, setPause] = useState(false);
  const direction =
    timeToSeconds(timer.timer.h, timer.timer.m, timer.timer.s) === 0 ? 1 : -1;

  //   const togglePause = () => {
  //     setPause(!pause);
  //   };

  useEffect(() => {
    console.log(timer);
    return () => {
      PubSub.unsubscribe(pubTokenHeartBeat);
    };
  });

  var HeartBeatSubscriber = function (msg, data) {
    if (!pause) {
      setRemaining(remaining - 1);
    }
  };

  const pubTokenHeartBeat = PubSub.subscribe(
    topics.HEARTBEAT,
    HeartBeatSubscriber
  );
  const {
    hasChainedAction
    // intervalActive,
    // sayAloud,
    // tabOpener,
    // intervalDuration,
    // getStartURL,
    // getEndURL
  } = useAlerts(timer);

  const pauser = () => {
    setPause(true);
    console.log('pauser()');
    if (startAudio.isPlaying) startAudio.toggle();
    if (endAudio.isPlaying) endAudio.toggle();
    //setVideoPlaying(false);
    PubSub.publish(topics.VIDEO_PLAY, false);

    // setTimeout(() => {

    //}, 100);
  };
  const resume = () => {
    setPause(false);
  };
  const edit = () => {
    pauser();
    setPlayerVisible(false);
  };

  const replay = () => {
    setRemaining(timeToSeconds(timer.timer.h, timer.timer.m, timer.timer.s));
    setPause(false);
    //pauser();
    // setTimeout(() => {
    //   start();
    // }, 100);
  };
  const intervalAudio = useAudio({
    src: getAudioSrc(timer.interval.alert, 'IntervalSounds'),
    loop: false
  });

  const endAudio = useAudio({
    src: getAudioSrc(timer.timer.alert, 'AlarmSounds'),
    loop: hasChainedAction(timer) ? false : true,
    amplificationMultiplier: 1
  });

  const startAudio = useAudio({
    src: getAudioSrc(timer.timer.startAlert, 'AlarmSounds'),
    loop: false,
    amplificationMultiplier: 1
  });

  return (
    <div className="">
      <div className="ml-1 mb-2 pl-2 h-10 ">
        <div className="trimmed">
          <span className="text-2xl max-w-fit">{timer.timer.name}</span>
        </div>
        <div className="text-xs -mt-1 trimmed">
          {/* {formatTimerInfo(timer.interval, 'interval: ')} */}
        </div>
      </div>
      <div className="">
        {remaining <= 0 && direction === -1 && (
          <>
            overtime
            <p className="flex justify-center text-green-500">
              <span className="text-5xl">00:00</span>
              <span className="text-2xl">00</span>
            </p>
            {/* <p className="text-2xl ml-4">{formatTime(remaining, direction)}</p> */}
            <div className="flex justify-center mr-8">
              <OverClock seconds={remaining} />
            </div>
          </>
        )}
        {remaining > 0 && direction === -1 && (
          <div className="flex justify-center">
            <Clock seconds={remaining} />
          </div>
        )}
        {direction === 1 && (
          <div className="flex justify-center">
            'stopwatch'
            <Clock seconds={remaining} />
          </div>
        )}
      </div>
      <div className="flex justify-between mr-2 mb-2 ">
        {/* {!active.current && <PlayButton title="Start" clickHandler={start} />} */}
        {!pause && (
          <div className="flex items-start text-green-500">
            <PauseButton className="" title="Pause" clickHandler={pauser} />
            {/* <span className="text-xsm ml-2 mt-[10px]">
              {(direction === -1 && remaining > 0) || direction === 1
                ? 'Active'
                : 'Done'}
            </span> */}
          </div>
        )}
        {pause && (
          <div className="flex items-start">
            paused
            <PlayButton title="Start" clickHandler={resume} />
            <span className="text-xsm text-neutral-400 ml-2 ">
              {/* Paused */}
            </span>
          </div>
        )}
        {pause && (
          <div>
            <ReplayButton clickHandler={replay} />
            <EditButton title="Edit" clickHandler={edit} />
          </div>
        )}
      </div>
      {/* duration:{duration}
      remaining:{remaining}
      direction:{direction} */}
    </div>
  );
};

export default Timer;
