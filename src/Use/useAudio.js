/**
 *
 * useAudio hook
 * ----
 * Optimized and Supercharged React hook to play audio without any DOM element 💪🎧
 * Created with love by Niloy Sikdar
 * https://github.com/niloysikdar/react-awesome-audio/blob/main/src/useAudio.ts
 *
 * example use - see PlayButton.js
 *
 *
 * todo: chain sounds together.
 *
 * Todo: add speech syntheis option. (need to handle isPlaying to prevent double taps unfortunatly)-due to my lack of understanding!
 *
 */

import { useMemo, useEffect, useState } from 'react';

// function amplifyMedia(mediaElem, multiplier) {
//   var context = new (window.AudioContext || window.webkitAudioContext)(),
//     result = {
//       context: context,
//       source: context.createMediaElementSource(mediaElem),
//       gain: context.createGain(),
//       media: mediaElem,
//       amplify: function (multiplier) {
//         result.gain.gain.value = multiplier;
//       },
//       getAmpLevel: function () {
//         return result.gain.gain.value;
//       }
//     };
//   result.source.connect(result.gain);
//   result.gain.connect(context.destination);
//   result.amplify(multiplier);
//   return result;
// }

/**
 * useAudio hook to play and control the audio
 *
 * @param {*} options
 */
export const useAudio = (options) => {
  // console.log('audio options.src', options.src)
  const audio = useMemo(() => new Audio(options.src), [options.src]);
  //Note: boost the volume (esp useful for end of timer alert, not so good for interval!)
  //range limit? too high can cause probs!
  //getting error: //Note: boost the volume (esp useful for end of timer alert, not so good for interval!)
  // if (options.amplificationMultiplier) {
  //   amplifyMedia(audio, options.amplificationMultiplier);
  // }
  //// console.log('options.src', options.src);

  // Managing the playing state
  const [isPlaying, setIsplaying] = useState(false);

  // play function to play the audio
  const play = (amplificationMultiplier) => {
    audio
      .play()
      .then(() => setIsplaying(true))
      .catch((error) => {
        setIsplaying(false);
        // console.log(error);
        options.onError(error);
      });
  };

  // pause the audio
  const pause = () => {
    setIsplaying(false);
    audio.pause();
  };

  // Toggle between play and pause
  const toggle = () => (isPlaying ? pause() : play());
  const reset = () => (audio.currentTime = 0);

  useEffect(() => {
    // Loop the audio if loop is true, default is false
    audio.loop = options.loop || false;

    // Adjust the volume of the audio, default is 1(max)
    audio.volume = options.volume || 1;

    // Mute the audio if muted is true, default is false
    audio.muted = options.muted || false;

    // Execute the onLoadedData function after finishing the loading of audio
    audio.onloadeddata = (e) => options.onLoadedData?.(e);

    // Execute after the ending of the audio
    audio.addEventListener('ended', (e) => {
      // Execute the onEnded function
      // options.onEnded?.(e);
      if (options.onEnded) options.onEnded(e);

      // Play again the audio after the end if loop is true
      options.loop ? audio.play() : setIsplaying(false);
    });

    // Cleanup
    return () => {
      !options.loop &&
        audio.removeEventListener('ended', () => setIsplaying(false));
    };
  }, [audio, options]);

  // Returning isPlaying, play, pause, toogle
  return { isPlaying, play, pause, toggle, reset };
};
