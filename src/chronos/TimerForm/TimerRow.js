import React from 'react';
import TextInput from '../subcomponents/TextInput';
// import CheckedText from '../subcomponents/CheckedText';
// import CheckedSelect from '../subcomponents/CheckedSelect';
// import audioData from '../data/audio.json';
import HMSinput from '../subcomponents/HMSInput';
/*
contains elements of timer / interval: name hasAlert, alert, hasAnnounce, announce, h,m,s.

Differences timer vs audio creep:
interval activatable/disactivable. (timers when add events may be activatable/disactiv too)
For now - interval consider active if h.m.s !== 0.
(simlar to if timer hms=0 direction switch to +1 (stopwatch mode.))
help bubbles - with dont show again would be great).
*/
const TimerRow = ({ name }) => {
  return (
    <div className="flex flex-row flex-wrap ">
      <div className="flex flex-col flex-wrap">
        <TextInput name={name + 'name'} />
        <div className="flex flex-row flex-wrap  pt-2">
          <HMSinput name={name} />
        </div>
      </div>
    </div>
  );
};

export default TimerRow;
