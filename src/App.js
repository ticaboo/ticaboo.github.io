import './App.css';
import HeartBeatPub from './pub/HeartBeatPub';
//import HeartBeat from './atoms/HeartBeatAtomic';
import SchedulePub from './SchedulePub';
//import Schedule from './Schedule';
import { timerScheduled } from './data/timers';
import Timer from './TimerPub';

function App() {
  const t1 = { ...timerScheduled, schedule: { alertAt: Date.now() + 5000 } };
  const t2 = { ...timerScheduled, schedule: { alertAt: Date.now() + 10000 } };

  //const t2 = (timerScheduled.schedule.alertAt = Date.now() + 6000);
  return (
    <div className="App">
      <HeartBeatPub />

      <SchedulePub key="t1" timer={t1} />
      <SchedulePub key="t2" timer={t2} />

      <Timer timer={t1} />
      {/* <HeartBeat />
      <Schedule key="t1" timer={t1} />
      <Schedule key="t1" timer={t2} /> */}
    </div>
  );
}

export default App;
