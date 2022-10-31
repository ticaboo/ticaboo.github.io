import React from 'react';
import CheckedText from '../../chronos/subcomponents/CheckedText';
import CheckedSelect from '../../chronos/subcomponents/CheckedSelect';
import audioData from '../../data/audio.json';

const OnStartForm = ({ name }) => {
  return (
    <div className="">
      <div className="">
        {/* ALARM */}
        <CheckedSelect
          check={name + 'hasStartAlert'}
          selector={name + 'startAlert'}
          label="alert"
          selectOptions={audioData.AlarmSounds}
        />

        {/* TTS */}
        <CheckedText
          name={name + 'startAnnounce'}
          check={name + 'hasStartAnnounce'}
          label="voice"
        />

        {/* PLAYLIST */}
        <CheckedSelect
          check={name + 'hasStartPlaylist'}
          selector={name + 'startPlaylist'}
          label="playlist"
          selectOptions={audioData.Media}
        />

        {/* HYPERLINK */}
        <CheckedText
          name={'timer.startPlayUrl'}
          check={'timer.hasStartPlayUrl'}
          type="url"
          label="link"
        />
      </div>
      <span className="ml-2 text-sm furniture">start-</span>
    </div>
  );
};

export default OnStartForm;
