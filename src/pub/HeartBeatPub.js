import React from 'react';

import WorkerBuilder from '../workers/worker-builder';
import Worker from '../workers/seconds.worker';
import PubSub from 'pubsub-js';

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
    at App/Index level is good
*/
const HeartBeatPub = () => {
  instance.onmessage = (message) => {
    // publish a topic asynchronously
    //console.log(message);
    PubSub.publish('HEARTBEAT', message);
  };
  return <div className="heart-beat baseWhite">HeartBeat</div>;
};
export default HeartBeatPub;
