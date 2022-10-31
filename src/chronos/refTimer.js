import { useEffect, useState, useRef } from 'react';
// import './App.css'; //notification animations?
import { formatTimerInfo } from '../Utils';
import { Clock, OverClock } from './subcomponents/CounterClock';
import ReplayButton from './subcomponents/buttons/ReplayButton';
import PlayButton from './subcomponents/buttons/PlayButton';
import PauseButton from './subcomponents/buttons/PauseButton ';
import EditButton from './subcomponents/buttons/EditButton';

//import notify from './notifiy';
import { getAudioSrc, timeToSeconds, dateTohms } from '../Utils';
import UseAlerts from '../Use/useAlerts';
import { useAudio } from '../Use/useAudio';
import { useAtom } from 'jotai';
import { videoPlayingAtom } from '../atoms/index';
import PubSub from 'pubsub-js';
import topics from '../pub/topics';

//import Stopwatch from './workers/Stopwatch';

function Timer({ timerData, setPlayerVisible, handleNextChainAction }) {
  const [startDate, setStartDate] = useState();

  const [originalDuration, setOriginalDuration] = useState();
  const [heartBeatDelta, setHeartBeatDelta] = useState();
  const [remaining, setRemaining] = useState();

  //const [isActive.current, isActive.current =] = useState(false);
  const isActive = useRef();
  const [direction, setDirection] = useState();
  const [, setVideoPlaying] = useAtom(videoPlayingAtom);
  // const [videoID, setVideoID] = useAtom(videoIDAtom);

  const {
    sayAloud,
    tabOpener,
    tabHoldingPageLoad,
    intervalActive,
    hasChainedAction,
    intervalDuration,
    getStartURL,
    getEndURL
  } = UseAlerts(timerData);

  const cycle = () => {
    const stopSecond = 1;
    const elapsed = originalDuration - remaining;

    if (direction === -1 && remaining === originalDuration) {
      console.log('AT START of cycle');
      const startURL = getStartURL();
      if (startURL) tabOpener(startURL, '_ticabooPlayDuringUrl2');

      if (timerData.timer.hasStartAnnounce) {
        //debounce( ()=>  {sayAloud(timerData.timer.startAnnounce)},100);
        sayAloud(timerData.timer.startAnnounce);
      }

      if (timerData.timer.hasStartAlert) {
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
      if (timerData.timer.hasAlert) {
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

      if (timerData.timer.hasAnnounce) {
        sayAloud(timerData.timer.announce); /* speak at end */
      }
      if (hasChainedAction() === true) {
        //start chained timer.-so that it starts playing is the trick!
        //console.log('chain ganging', timerData.chaining.onend.chainId)
        //TODO: kill current timer, Chronos starts next one. instead of:  clearInterval(countRef.current);
        handleNextChainAction(timerData.chaining.onend.chainId);
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
        if (timerData.interval.hasAlert) {
          intervalAudio.toggle();
        }
        if (timerData.interval.hasAnnounce)
          sayAloud(timerData.interval.announce);
        //CB halts block - never reaches return... (useCallBack?)/simpler? props/ref?
        //intervalCB();
      }
    }
  };

  const intervalAudio = useAudio({
    src: getAudioSrc(timerData.interval.alert, 'IntervalSounds'),
    loop: false
  });

  const endAudio = useAudio({
    src: getAudioSrc(timerData.timer.alert, 'AlarmSounds'),
    loop: hasChainedAction(timerData) ? false : true,
    amplificationMultiplier: 1
  });

  const startAudio = useAudio({
    src: getAudioSrc(timerData.timer.startAlert, 'AlarmSounds'),
    loop: false,
    amplificationMultiplier: 1
  });

  const start = () => {
    console.log('Timer.start()');
    const now = dateTohms();
    // synchronise with heartbeat:
    setHeartBeatDelta(now.ms + 1); //add 1ms for execution time
    //console.log('start heartBeatDelta ', heartBeatDelta);

    setStartDate(new Date()); //just for checking timer accurate when comparing to end date.

    const originalDurationEntry = timeToSeconds(
      timerData.timer.h,
      timerData.timer.m,
      timerData.timer.s
    );
    setOriginalDuration(originalDurationEntry);
    setRemaining(originalDurationEntry);
    setDirection(originalDurationEntry === 0 ? 1 : -1);
    isActive.current = true;
  };

  const pause = () => {
    if (startAudio.isPlaying) startAudio.toggle();
    if (endAudio.isPlaying) endAudio.toggle();
    setVideoPlaying(false);
    tabHoldingPageLoad();
    //console.log('pause()');
    setTimeout(() => (isActive.current = false), 100);
  };
  const resume = () => {
    isActive.current = true;
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

  /*
   kick off cycle. sync to heartbeat - offset to when timer started.
  */
  var heartBeatSubscriber = function (msg, data) {
    console.log('ba boom');
    //const now = data.data.now;

    // if (isActive.current) {
    //   setTimeout(() => {
    //     if (isActive.current) {
    //       setRemaining((remaining) => {
    //         return remaining + direction;
    //       });
    //       cycle();
    //     }
    //     //move this to cycle and add to options.
    //     if (remaining === 0) {
    //       // notify('started: ' + startDate + 'ended: ' + new Date());
    //       //note: remains active to display overtimer.
    //     }
    //   }, heartBeatDelta);
    // }
  };

  var token = PubSub.subscribe(topics.HEARTBEAT, heartBeatSubscriber); //cleanup on component destroy

  // useEffect(() => {
  //   console.log('active changed', isActive.current);
  // }, [isActive.current]);
  // bizzare - with start - no () works in dev, with start() works in prod
  useEffect(() => start(), []);

  return (
    <div className="">
      <div className="ml-1 mb-2 pl-2 h-10 ">
        <div className="trimmed">
          {' '}
          <span className="text-2xl max-w-fit">{timerData.timer.name}</span>
          {/* </span>{' '}
          <span className="text-2xl max-w-2xl">
            {formatTimerInfo(timerData.timer)}
          */}
        </div>

        <div className="text-xs -mt-1 trimmed">
          {formatTimerInfo(timerData.interval, 'interval: ')}
        </div>
      </div>
      <div className="">
        {remaining <= 0 && direction === -1 && (
          // overtime
          <>
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
          // stopwatch
          <div className="flex justify-center">
            <Clock seconds={remaining} />
          </div>
        )}
      </div>
      <div className="flex justify-between mr-2 mb-2 ">
        {/* {!isActive.current && <PlayButton title="Start" clickHandler={start} />} */}
        {isActive.current && (
          <div className="flex items-start text-green-500">
            <PauseButton className="" title="Pause" clickHandler={pause} />

            {/* <span className="text-xsm ml-2 mt-[10px]">
              {(direction === -1 && remaining > 0) || direction === 1
                ? 'Active'
                : 'Done'}
            </span> */}
          </div>
        )}
        {!isActive.current && (
          <div className="flex items-start">
            <PlayButton title="Start" clickHandler={resume} />
            <span className="text-xsm text-neutral-400 ml-2 ">
              {/* Paused */}
            </span>
          </div>
        )}
        {!isActive.current && (
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
  //   <div className="Timer">
  //     <header className="Timer-header">
  //       <button onClick={handleStart}>
  //         start timer {remaining}s.
  //         {/* <Stopwatch running={isActive.current} /> */}
  //       </button>
  //       <button onClick={handlePause}>pause .</button>
  //       <button onClick={handleResume}>resume .</button>
  //       <button onClick={handleReset}>reset .</button>

  //       {/* duration: {duration} */}
  //     </header>
  //   </div>
  // );
}

export default Timer;
