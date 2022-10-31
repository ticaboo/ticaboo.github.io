import React, { useState, useRef, useEffect } from 'react';
import PubSub from 'pubsub-js';
import topics from '../pub/topics';

// import './App.css'; //notification animations?
import { formatTimerInfo } from '../Utils';
import { Clock, OverClock } from './subcomponents/CounterClock';
import ReplayButton from './subcomponents/buttons/ReplayButton';
import PlayButton from './subcomponents/buttons/PlayButton';
import PauseButton from './subcomponents/buttons/PauseButton ';
import EditButton from './subcomponents/buttons/EditButton';

//import notify from './notifiy';
import { getAudioSrc, timeToSeconds, dateTohms } from '../Utils';
import useAlerts from '../Use/useAlerts';
import { useAudio } from '../Use/useAudio';

const Timer = ({ timer, setPlayerVisible, handleNextChainAction }) => {
  // const [timeNow, setTimeNow] = useState();
  // const [alertAt, setAlertAt] = useState();

  const originalDuration = timeToSeconds(
    timer.timer.h,
    timer.timer.m,
    timer.timer.s
  );

  const [heartBeatDelta, setHeartBeatDelta] = useState();
  const [remaining, setRemaining] = useState();
  const direction =
    timeToSeconds(timer.timer.h, timer.timer.m, timer.timer.s) === 0 ? 1 : -1;

  //const [active, setActive] = useState(false);
  const active = useRef();
  const [renderActive, setRenderActive] = useState(); //bridge to active ref?

  // const toggleActive = () => {
  //   setActive(!active);
  // };

  const {
    sayAloud,
    tabOpener,
    tabHoldingPageLoad,
    intervalActive,
    hasChainedAction,
    intervalDuration,
    getStartURL,
    getEndURL
  } = useAlerts(timer);

  const pause = () => {
    if (startAudio.isPlaying) startAudio.toggle();
    if (endAudio.isPlaying) endAudio.toggle();
    //setVideoPlaying(false);
    PubSub.publish(topics.VIDEO_PLAY, false);
    tabHoldingPageLoad();
    //console.log('pause()');
    setTimeout(() => {
      active.current = false;
      setRenderActive(false);
    }, 100);
  };
  const resume = () => {
    active.current = true;
    setRenderActive(true);
  };
  const edit = () => {
    pause();
    setPlayerVisible(false);
  };

  const replay = () => {
    pause();
    setTimeout(() => {
      start();
    }, 100);
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

  const cycle = () => {
    const stopSecond = 1;
    const elapsed = originalDuration - remaining;

    if (direction === -1 && remaining === originalDuration) {
      console.log('AT START of cycle', direction);
      const startURL = getStartURL();
      if (startURL) tabOpener(startURL, '_ticabooPlayDuringUrl2');

      if (timer.timer.hasStartAnnounce) {
        //debounce( ()=>  {sayAloud(timer.timer.startAnnounce)},100);
        sayAloud(timer.timer.startAnnounce);
      }

      if (timer.timer.hasStartAlert) {
        /* play alert sound */
        startAudio.toggle();
        startAudio.reset();
      }
    }

    //when startUrl and endingURl- make 5 second sound gap before end.
    if (direction === -1 && remaining === 5) {
      const startURL = getStartURL();
      if (startURL) tabHoldingPageLoad();
    }

    //Timer done:
    if (direction === -1 && remaining === stopSecond) {
      if (timer.timer.hasAlert) {
        /* play alert sound */
        endAudio.toggle();
        endAudio.reset();
      }

      const atEndStartURL = getStartURL();
      const atEndEndURL = getEndURL();

      if (atEndEndURL) {
        /* end - play end */
        //setVideoPlaying(false);
        tabOpener(atEndEndURL, '_ticabooPlayDuringUrl2');
      }

      if (atEndStartURL && !atEndStartURL) {
        /* start + no end - halt. */
        //setVideoPlaying(()=> false);
        tabHoldingPageLoad();
      }

      if (timer.timer.hasAnnounce) {
        sayAloud(timer.timer.announce); /* speak at end */
      }
      if (hasChainedAction() === true) {
        //start chained timer.-so that it starts playing is the trick!
        //console.log('chain ganging', timer.chaining.onend.chainId)
        //TODO: kill current timer, Chronos starts next one. instead of:  clearInterval(countRef.current);
        handleNextChainAction(timer.chaining.onend.chainId);
      }

      // doneCB(chainActionId);
      //tick interval continues for overtiming unless timer has a next chained timer.
    }

    //Intervals
    if (
      intervalActive() &&
      remaining > 1 &&
      (elapsed + 1) % intervalDuration() === 0
    ) {
      if (direction === -1 && remaining !== originalDuration && remaining > 1) {
        if (timer.interval.hasAlert) {
          intervalAudio.toggle();
        }
        if (timer.interval.hasAnnounce) sayAloud(timer.interval.announce);
        //CB halts block - never reaches return... (useCallBack?)/simpler? props/ref?
        //intervalCB();
      }
    }
  };

  var HeartBeatSubscriber = function (msg, data) {
    //setTimeNow(data.data.now);

    if (active.current) {
      setTimeout(() => {
        if (active.current) {
          if (!remaining) {
            setRemaining(originalDuration);
          } else {
            setRemaining((remaining) => {
              return remaining + direction;
            });
          }
          // setRemaining(remaining - 1);
          console.log('remaining', remaining, heartBeatDelta);
          cycle();
        }
        //move this to cycle and add to options.
        if (remaining === 0) {
          // notify('started: ' + startDate + 'ended: ' + new Date());
          //note: remains active to display overtimer.
        }
      }, heartBeatDelta);
    }
  };

  /*
    Timer component on load fires start.
    which sets active.current = true.
    HeartBeatSubscriber activates. calls cycle()
  */
  const start = () => {
    console.log('Timer.start()');
    const now = dateTohms();
    // synchronise with heartbeat:
    setHeartBeatDelta(now.ms + 1); //add 1ms for execution time
    //console.log('start heartBeatDelta ', heartBeatDelta);

    //setStartDate(new Date()); //just for checking timer accurate when comparing to end date.

    // const originalDurationEntry = timeToSeconds(
    //   timer.timer.h,
    //   timer.timer.m,
    //   timer.timer.s
    // );
    // console.log('duration', originalDurationEntry);
    //setOriginalDuration(() => originalDurationEntry);

    //setDirection(() => (originalDurationEntry === 0 ? 1 : -1));
    // console.log(
    //   'onstart orig:',
    //   originalDuration,
    //   'remaining',
    //   remaining,
    //   ' direction: ',
    //   direction
    // );
    active.current = true;
    setRenderActive(true);
  };

  // var token = //todo: destroy in effect return []
  PubSub.subscribe(topics.HEARTBEAT, HeartBeatSubscriber);
  useEffect(() => {
    start();
    return () => {};
  });

  return (
    <div className="">
      <div className="ml-1 mb-2 pl-2 h-10 ">
        <div className="trimmed">
          <span className="text-2xl max-w-fit">{timer.timer.name}</span>
        </div>
        <div className="text-xs -mt-1 trimmed">
          {formatTimerInfo(timer.interval, 'interval: ')}
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
        {renderActive && (
          <div className="flex items-start text-green-500">
            <PauseButton className="" title="Pause" clickHandler={pause} />
            running-show pause
            {/* <span className="text-xsm ml-2 mt-[10px]">
              {(direction === -1 && remaining > 0) || direction === 1
                ? 'Active'
                : 'Done'}
            </span> */}
          </div>
        )}
        {!renderActive && (
          <div className="flex items-start">
            paused
            <PlayButton title="Start" clickHandler={resume} />
            <span className="text-xsm text-neutral-400 ml-2 ">
              {/* Paused */}
            </span>
          </div>
        )}
        {!renderActive && (
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

  // return (
  //   <div data-t-timer>
  //     Timer
  //     <button onClick={toggleActive}> {active ? 'Playing' : 'paused'}</button>
  //     <div>{active ? timeNow : ''}</div>
  //   </div>
  // );
};

export default Timer;
