import React from 'react';

import WorkerBuilder from '../workers/worker-builder';
import Worker from '../workers/seconds.worker';
import { useAtom } from 'jotai';
import { heartBeatAtom } from './index';

//want one heartbeat webworker ticking away for any/all to listen to.
const instance = new WorkerBuilder(Worker);

/*
 on pump up heartbeat, get it as close as possilbe to zero milliseconds (seconds in sync, accurate)
 
*/
const syncSecond = () => {
  const now = new Date();
  const msOffset = now.getMilliseconds();
  const syncUpMs = 1000 - msOffset;
  //console.log('syncSecond', { msOffset, syncUpMs });
  setTimeout(() => {
    instance.postMessage({ now: Date.now(), at: new Date() }); //get it pumping. matches data shape {now, at}
  }, syncUpMs);
};

syncSecond();
/*
    include this hidden component once in application,
    at App level is good
*/

const HeartBeat = () => {
  const [, setBeat] = useAtom(heartBeatAtom);
  instance.onmessage = (message) => {
    setBeat(message);
  };
  // return <div className="heart-beat baseWhite">HeartBeat</div>;
};
export default HeartBeat;
