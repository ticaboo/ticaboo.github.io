import logo from './logo.svg';
import './App.css';
import HeartBeat from './pub/HeartBeat';
import Schedule from './Schedule';
import { timerScheduled } from './data/timers';

function App() {
  timerScheduled.schedule.alertAt = Date.now() + 3000;
  return (
    <div className="App">
      <HeartBeat />
      <Schedule timer={timerScheduled} />
    </div>
  );
}

export default App;
