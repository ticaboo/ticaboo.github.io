//seconds.worker.js
// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  // eslint-disable-next-line no-restricted-globals

  /*
    does one thing well: heartbeat every second.
*/
  // const log = [];

  onmessage = (message) => {
    //tobifrost: let s = Number(message.data);
    var interval = 1000; // ms
    var expected = Date.now() + interval;
    setTimeout(step, interval);

    function step() {
      // console.log('.');
      var delta = Date.now() - expected;
      // console.log('.', delta);
      // log.push(delta);
      // if (delta > interval) {
      //   // something really bad happened. Maybe the browser (tab) was inactive? possibly special handling to avoid futile "catch up" run
      // let consumers handle it. they can inspect delta and decide.
      // eg might want different actions for timer/schedule etc.
      // }
      expected += interval;
      postMessage({ now: expected, at: new Date() }); //no known use for expected being sent, just ensures it is different every time.
      //postMessage(s--);
      //tobifrost: if (s >= 0) {
      setTimeout(step, Math.max(0, interval - delta)); // take into account drift
    }
  };
};
