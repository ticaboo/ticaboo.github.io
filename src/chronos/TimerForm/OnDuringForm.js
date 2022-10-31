import React from 'react';
import CheckedText from '../../chronos/subcomponents/CheckedText';
import CheckedSelect from '../../chronos/subcomponents/CheckedSelect';
import audioData from '../../data/audio.json';
import HMSinput from '../../chronos/subcomponents/HMSInput';
/*
contains elements of timer / interval: name hasAlert, alert, hasAnnounce, announce, h,m,s.

Differences timer vs audio creep:
interval activatable/disactivable. (timers when add events may be activatable/disactiv too)
For now - interval consider active if h.m.s !== 0.
(simlar to if timer hms=0 direction switch to +1 (stopwatch mode.))
help bubbles - with dont show again would be great).
*/
const OnDuringForm = ({ name }) => {
  return (
    <div className="">
      <div className="">
        {/* <TextInput name={name + 'name'} label="name" /> */}
        <HMSinput name={name} />
      </div>

      <CheckedSelect
        check={name + 'hasAlert'}
        selector={name + 'alert'}
        label="alert"
        selectOptions={audioData.IntervalSounds}
      />
      <CheckedText
        name={name + 'announce'}
        check={name + 'hasAnnounce'}
        label="voice"
      />

      <span className="ml-16 text-sm furniture justify-end">-interval-</span>
    </div>
  );
};

export default OnDuringForm;
