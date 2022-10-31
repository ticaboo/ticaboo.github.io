import { useState, useEffect } from 'react';
import uuid from 'uuid';
import { defaultTimer } from '../data/timers';

//import qs from 'qs';
// import Storage from './Storage';

/*
MultiTimers: uses all the state updates. was too much in here for sure. so refactoring out as a Use.
SingleTimer: uses duplicate (as save)
*/

const LOCAL_STORAGE_KEY = 'ticabootimerv2';

function useLocalStorage() {
  const [timers, setTimers] = useState([]); //list of all timers -syncd to local storage.

  useEffect(() => {
    // fires when app component mounts to the DOM
    // console.log('on page load fired.');

    // const qsTimer = qs.parse(window.location.hash);
    // const hasQsTimer = !isEmptyObj(qsTimer);
    // // console.log('qsTimer', hasQsTimer);
    const storageTimers = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

    if (storageTimers !== null && storageTimers.length > 0) {
      /* when Versions that change data structure with breaking changes, adapt
      data structure of old version here to maintain compatability. Todo: should save them back to local storage too.
      This is a poor mans hacky Migrations. todo: replace with data Migrations.
      */
      //const postAdaptedTimers = preAdaptedTimers
      // each one
      //add chaining (from default data if it doesnt have it.)
      //todo: should reference data/timers.default for single source of truth.
      // const postAdaptedTimers = []
      // storageTimers.forEach((timer) => {

      //   if(timer['chaining'] == null) {
      //     timer.chaining = {};
      //     timer.chaining.onend ={chainEnabled: false,
      //       chainId: ''}
      //   }
      //   postAdaptedTimers.push(timer)
      // })

      //console.log(adaptedTimers)
      setTimers(storageTimers); //postAdaptedTimers
    } else {
      /* if (!hasQsTimer) { */
      //// console.log('on page load 2,no qs: add tryme sample timer.');
      setTimers([{ ...defaultTimer, id: uuid.v4() }]);
    }
    // if (hasQsTimer) {
    //   // console.log('on page load 3,checking qsTimer already there...', qsTimer);
    //   if (
    //     //note: ignoring if found,could update but see no good usecase for now.
    //     storageTimers.filter((timer) => timer.id === qsTimer.id).length === 0
    //   ) {
    //     // console.log('on page load 4,add new qsTimer');
    //     setTimers([...storageTimers, qsTimer]);
    //   }
    // }
  }, []);

  useEffect(() => {
    // fires when timers array gets updated

    if (timers && timers.length > 0) {
      // // console.log('storing');
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(timers));
    } else {
      //// console.log('add new default timer');
      const timerNumber = timers.length + 1;
      let newTimer = defaultTimer;
      newTimer.timer.name = 'Timer ' + timerNumber;
    }
  }, [timers]);

  function duplicateTimer(newTimer) {
    //// console.log('dulicitous or what', newTimer);
    newTimer.id = uuid.v4();
    //setTimers([...timers, newTimer]);
    craddTimer(newTimer);
  }
  /* create/ add timer */
  function craddTimer(newTimer) {
    //for bookmarking/sharing:
    // const timerquery = qs.stringify(newTimer);
    // window.location.hash = timerquery;

    if (timers.filter((timer) => timer.id === newTimer.id).length !== 0) {
      setTimers(
        timers.map((timer) => {
          if (timer.id === newTimer.id) {
            return {
              ...newTimer
            };
          }
          return timer;
        })
      );

      //const t = timers.filter((timer) => timer.id !== newTimer.id);
      //setTimers({ ...t, newTimer });
    } else {
      // adds new timer to beginning of timers array
      setTimers([...timers, newTimer]);
    }
  }
  function addNewTimer() {
    const timerNumber = timers.length + 1;
    let newTimer = defaultTimer;
    newTimer.timer.name = 'Timer ' + timerNumber;
    craddTimer({
      ...newTimer,
      id: uuid.v4()
    });
  }

  // function editTimer(id) {
  //   const timer = timers.filter((timer) => timer.id === id);
  //   setTimerData(timer[0]);
  // }

  function removeTimer(id) {
    // // console.log('removing', id);
    setTimers(timers.filter((timer) => timer.id !== id));
  }

  return { timers, duplicateTimer, craddTimer, addNewTimer, removeTimer }; //TOD ? use just craddTimer used?
}

export default useLocalStorage;
