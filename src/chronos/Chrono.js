import React, { useState } from 'react';
import FormChronos from './subcomponents/FormChronos';
import Timer from './Timer';
//import useScheduler from '../Use/useScheduler';
import CardAnimation from './subcomponents/buttons/CardAnimation';

import l from '../logging';

/*
  Chrono: Sole Responsibility: coordinates state between Editing: Form and Player.
  from Upstream differentiates single/list of timers.
*/

const Chrono = ({
  timer,
  singleTimerFlag,
  duplicateTimer,
  craddTimer,
  removeTimer,
  timers
}) => {
  //state between Form and Player
  const [timeWatch, setTimeWatch] = useState(); // saved current timer state. set by Form-submiter, passed to Player.
  const [playerVisible, setPlayerVisible] = useState(false);

  /*
      save. double purposing as play.
    */

  const submitter = (timer) => {
    // l('warn', 'Chronos.submitter.', { timer, timeWatch, playerVisible });
    l('info', 'Chronos.submitter', { timer, timeWatch, playerVisible });
    // l('info',
    //   'submitter',
    //   timer
    // );
    if (!singleTimerFlag) {
      /* only for multi Timers */
      craddTimer(timer); /* save timer on Form Play action. */
    }
    //fires up player:
    setTimeWatch(timer);
    setPlayerVisible(() => true);
    //l('info','end of sumbintter, playerVisible', playerVisible);
  };

  const handleNextChainAction = (chainNextTimerId) => {
    // l('info','handleNextChainAction', chainNextTimerId);
    const nextTimer = timers.find((timer) => timer.id === chainNextTimerId);
    nextTimer.playCount = nextTimer.playCount ? nextTimer.playCount + 1 : 0;
    // l('info','next timer', nextTimer);
    setTimeWatch(nextTimer);
    setPlayerVisible(() => true);
  };

  const hasSchedule = () => {
    l('info', 'chrono.hasSchedule()', {
      schedule: timer.schedule,
      logictest:
        timer.schedule &&
        (timer.schedule.h !== '' ||
          timer.schedule.m !== '' ||
          timer.schedule.s !== '')
    });
    const hasSched =
      timer.schedule &&
      (timer.schedule.h !== '' ||
        timer.schedule.m !== '' ||
        timer.schedule.s !== '');
    l('info', 'hasSchedule', hasSched);
    return hasSched;
  };

  const handleSchedule = () => {
    // l('info','schedule triggered');
    setTimeWatch(timer);
    setTimeout(() => {
      setPlayerVisible(true);
    }, 100);
  };

  return (
    <>
      <CardAnimation>
        <div className="baseBlack baseWhite baseCell  baseCard  w-[200px] rounded-3xl furniture-border chronos">
          {!playerVisible && (
            <div>
              {/* {hasSchedule() && (
                <ScheduleNub timer={timer} handleSchedule={handleSchedule} />
              )} */}
              <FormChronos
                timer={timer}
                singleTimerFlag={singleTimerFlag}
                submitter={submitter}
                duplicateTimer={duplicateTimer}
                removeTimer={removeTimer}
                timers={timers}
              />
            </div>
          )}
          {playerVisible && (
            <div>
              <Timer
                key={timeWatch.id}
                timerData={timeWatch}
                setPlayerVisible={setPlayerVisible}
                handleNextChainAction={handleNextChainAction}
              />
              {/* <Timer
                key={timeWatch.id}
                timerData={timeWatch}
                setPlayerVisible={setPlayerVisible}
                autoPlay={autoPlay}
                handleNextChainAction={handleNextChainAction}
              /> */}
            </div>
          )}
        </div>
      </CardAnimation>
    </>
  );
};

export default Chrono;
