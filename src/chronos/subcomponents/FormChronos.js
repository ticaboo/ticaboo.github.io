import React from 'react'; //state in parent-Chrono
import { useForm, FormProvider } from 'react-hook-form';

import PlayButton from './buttons/PlayButton';
import TimerRow from '../TimerForm/TimerRow';

import Collapse from './Collapse';
import DuplicateTimerButton from './buttons/DuplicateTimerButton';
import RemoveTimerButton from './buttons/RemoveTimerButton';
import BookmarkButton from './buttons/BookmarkButton';

import SettingsBar from '../SettingsBar';

/*
all Form stuff contained herein.
submit triggers state on parent Component: timeWatch, autoplay, playerVisible.
parent can determine actions such as jotai publish for distant components (like YTplayer to respond.)
*/

const FormChronos = ({
  timer,
  singleTimerFlag,
  submitter,
  duplicateTimer,
  removeTimer,
  timers,
  scheduleNub
}) => {
  const methods = useForm({
    defaultValues: timer,
    mode: 'onBlur' //required for control - for react-select
  });
  // console.log('FormChronos-timers', timers)

  return (
    <div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(submitter)}>
          <div className="flex justify-end">
            <RemoveTimerButton
              title="Delete"
              removeTimer={removeTimer}
              disabledFlag={singleTimerFlag}
            />
          </div>
          <div>
            <TimerRow name="timer." />
          </div>
          <div className="flex justify-between mb-2 mt-1">
            {/* save and play */}
            <PlayButton title="Play" type="submit" />
            <div className="flex justify-end">
              <BookmarkButton title="copies single timer to clipboard, and open in new tab." />
              <DuplicateTimerButton
                title="Duplicate to Time Collective"
                className=" mr-3"
                clickHandler={duplicateTimer}
              />
            </div>
          </div>

          <div className="-mt-4">
            <Collapse
              timer="timer"
              title="Settings"
              titleChildren={scheduleNub}>
              {/* {formatTimeShort(watchIntervalData)} */}
              <SettingsBar timer={timer} timers={timers} />
            </Collapse>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default FormChronos;
