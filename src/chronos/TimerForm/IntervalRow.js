import React from 'react';
import CheckedText from '../subcomponents/CheckedText';
import CheckedSelect from '../subcomponents/CheckedSelect';
import audioData from '../../data/audio.json';
import HMSinput from '../subcomponents/HMSInput';
/*
contains elements of timer / interval: name hasAlert, alert, hasAnnounce, announce, h,m,s.

Differences timer vs audio creep:
interval activatable/disactivable. (timers when add events may be activatable/disactiv too)
For now - interval consider active if h.m.s !== 0.
(simlar to if timer hms=0 direction switch to +1 (stopwatch mode.))
help bubbles - with dont show again would be great).
*/
const IntervalRow = ({ name }) => {
  return (
    <div className="flex flex-row flex-wrap border-t furniture-border ">
      <div className="flex flex-col flex-wrap">
        {/* <TextInput name={name + 'name'} label="name" /> */}

        <div className="ml-3 text-sm furniture">interval</div>

        <div className="flex flex-row flex-wrap ">
          <HMSinput name={name} />
        </div>
        <CheckedSelect
          check={name + 'hasAlert'}
          selector={name + 'alert'}
          label="interval sound"
          selectOptions={audioData.IntervalSounds}
        />
        <CheckedText
          name={name + 'announce'}
          check={name + 'hasAnnounce'}
          label="interval speak"
        />
      </div>

    

     
    </div>
  );
};

export default IntervalRow;
