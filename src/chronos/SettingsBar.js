import React from 'react';
import Tabs from './subcomponents/Tabs';
import OnSchedleForm from './TimerForm/OnSchedleForm';
import OnStartForm from './TimerForm/OnStartForm';
import OnDuringForm from './TimerForm/OnDuringForm';
import OnEndForm from './TimerForm/OnEndForm';

/*
settings bar for nav of start,interval,finish. (default to finish tab open.)
icons
bar spacing, highlight effect/color. possibly tab dividers.
onClick - show matching panel

Tabs - Tab just giving impedence when its a one off not a reusable component.

Todo: Do basics - with Icon Styling - svg direct here.
*/

const SettingsBar = ({ timer, timers }) => {
  return (
    <div className="">
      <Tabs>
        <div className="" label="schedule" title="schedule">
          <OnSchedleForm name="schedule." timer={timer} timers={timers} />
        </div>
        <div className="" label="at start" title="at start">
          <OnStartForm name="timer." timer={timer} timers={timers} />
        </div>
        <div className="" label="interval" title="interval">
          <OnDuringForm name="interval." />
        </div>
        <div className="" label="at finish" title="at finish">
          {' '}
          <OnEndForm name="timer." timer={timer} timers={timers} />
        </div>
      </Tabs>
    </div>
  );
};

export default SettingsBar;
