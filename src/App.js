import './App.css';
import './tailwind.generated.css';
import HeartBeat from './pub/HeartBeat';
import { timerScheduled } from './data/timers';
//import ScheduleGroup from './ScheduleGroup';
import TimerGroup from './chronos/TimerGroup';

const t1 = { ...timerScheduled, schedule: { alertAt: Date.now() + 5000 } };
const t2 = { ...timerScheduled, schedule: { alertAt: Date.now() + 10000 } };
const timers = [t1, t2];

function App() {
  //const t2 = (timerScheduled.schedule.alertAt = Date.now() + 6000);
  return (
    <div className="App">
      <HeartBeat />
      <TimerGroup timers={timers} />
      {/* <Schedule key="t1" timer={t1} />
      <Schedule key="t2" timer={t2} />

      <Timer timer={t1} /> */}
      {/* <HeartBeat />
      <Schedule key="t1" timer={t1} />
      <Schedule key="t1" timer={t2} /> */}
    </div>
  );
}

export default App;
