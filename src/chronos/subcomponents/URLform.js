import React from 'react';
import CheckedText from './CheckedText';
//import { useFormContext } from 'react-hook-form';
import CheckedSelect from './CheckedSelect';
import audioData from '../../data/audio.json';

// name:
const URLform = ({ name, label }) => {
  // const { register, watch } = useFormContext();

  return (
    <div className=" border-t furniture-border mb-2">
      <CheckedSelect
        check={name + 'hasStartPlaylist'}
        selector={name + 'startPlaylist'}
        label="On Start Playlist"
        selectOptions={audioData.Media}
      />
      <CheckedSelect
        check={name + 'hasEndPlaylist'}
        selector={name + 'endPlaylist'}
        label="On End Playlist"
        selectOptions={audioData.Media}
      />
      <CheckedText
        name={'timer.playDuringUrl'}
        check={'timer.hasPlayDuringUrl'}
        type="url"
        label="On Start Link"
      />
      <CheckedText
        name={'timer.endPlayUrl'}
        check={'timer.hasEndPlayUrl'}
        type="url"
        label="On End link"
      />
    </div>
  );
};

export default URLform;
