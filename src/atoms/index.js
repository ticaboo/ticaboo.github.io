import { atom } from 'jotai';

export const heartBeatAtom = atom(Date.now());
//set-timer-id, listen timer-id: decouple worker->useEffect->date operations.
//like a circuit breaker / relay / zender diode!
export const scheduleFiredRelayAtom = atom('');

export const videoPlayingAtom = atom(false);
export const videoIDAtom = atom('');
