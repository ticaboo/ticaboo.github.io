import React from 'react';
import { useState, useEffect } from 'react';

/*
ok, code doesnt handle minutes, seconds, but it fucking works!
see if can replace interval with heart beat.
fix hms -> s.
display h m s
*/

const Timer = ({ timer }) => {
  //   const { startingMinutes = 111, startingSeconds = 0 } = props;
  console.log(timer);
  const [mins, setMinutes] = useState(1); //timer.timer.m  '' -
  const [secs, setSeconds] = useState(5);

  useEffect(() => {
    let sampleInterval = setInterval(() => {
      if (secs > 0) {
        setSeconds(secs - 1);
      }
      if (secs === 0) {
        if (mins === 0) {
          clearInterval(sampleInterval);
        } else {
          setMinutes(mins - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(sampleInterval);
    };
  });

  return (
    <div>
      {!(mins && secs) ? (
        ''
      ) : (
        <p>
          {' '}
          {mins}:{secs < 10 ? `0${secs}` : secs}
        </p>
      )}
    </div>
  );
};

export default Timer;
