import useLocalStorage from '../Use/useLocalStorage';
import AddNewTimer from './subcomponents/buttons/AddNewTimer';
import Chrono from './Chrono';
import ScheduleGroup from './ScheduleGroup';

function TimerGroup() {
  const { timers, duplicateTimer, craddTimer, addNewTimer, removeTimer } =
    useLocalStorage();

  return (
    <div className="flex flex-row flex-wrap list-timers">
      <ScheduleGroup timers={timers} />
      {timers.map((timer) => (
        <div key={timer.id} className=" flex flex-col m-2 ">
          <Chrono
            className=""
            key={timer.id} /* single Timer/new: no id (not stored yet)*/
            singleTimerFlag={false}
            timer={timer}
            removeTimer={removeTimer}
            craddTimer={craddTimer}
            duplicateTimer={duplicateTimer}
            timers={timers}
          />
        </div>
      ))}
      <AddNewTimer key="addnewcell010101" addNewTimer={addNewTimer} />
    </div>
  );
}

export default TimerGroup;
