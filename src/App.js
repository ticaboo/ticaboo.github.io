import './App.css';
import HeartBeat from './pub/HeartBeat';
import Schedule from './Schedule';
import { timerScheduled } from './data/timers';

function App() {
  const t1 = { ...timerScheduled, schedule: { alertAt: Date.now() + 30000 } };
  const t2 = { ...timerScheduled, schedule: { alertAt: Date.now() + 20000 } };

  //const t2 = (timerScheduled.schedule.alertAt = Date.now() + 6000);
  return (
    <div className="App">
      <HeartBeat />
      <Schedule key="t1" timer={t1} />
      <Schedule key="t2" timer={t2} />
    </div>
  );
}

export default App;
