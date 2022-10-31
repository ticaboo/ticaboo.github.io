import { timeToSeconds, getPlaylistURL } from '../Utils';
//import { useAtom } from 'jotai';
//import { videoIDAtom, videoPlayingAtom } from '../atoms';
import PubSub from 'pubsub-js';
import { VIDEO_ID, VIDEO_PLAY } from '../pub/topics';

//dont like this local global- timerData, need like this for now for UseAudio
const useAlerts = (timerData) => {
  // const [, setVideoPlaying] = useAtom(videoPlayingAtom);
  // const [, setVideoID] = useAtom(videoIDAtom);

  const sayAloud = (announce) => {
    speechSynthesis.cancel();
    if (speechSynthesis.pending === false) {
      var msg = new SpeechSynthesisUtterance(announce);
      speechSynthesis.speak(msg);
    }
  };
  const tabOpener = (url) => {
    // dirty diry render hack to prevent:
    // Cannot update a component (`YTPlayer`) while rendering a different component (`PlayChronos`).
    //setTimeout(() => {
    // setVideoID(url); //'NrUIJY_Xu2s'-led zep california
    // setVideoPlaying(true);
    PubSub.publish(VIDEO_PLAY, true);
    PubSub.publish(VIDEO_ID, url);
    //console.log(url);
    // }, 100);
  };

  const tabHoldingPageLoad = () => {
    //fire up YT player logic, placement?
    //console.log('tabHoldingPageLoad');
    //setVideoID('');
    PubSub.publish(VIDEO_PLAY, false);

    //console.log('tabHoldingPageLoad- STOP VDIEO!');
    //tabOpener(document.location.origin + '/assets/images/meditation.jpeg'); //todo - should e interstitial.
  };

  const intervalDuration = () => {
    return timeToSeconds(
      timerData.interval.h,
      timerData.interval.m,
      timerData.interval.s
    );
  };

  const intervalActive = () => {
    return intervalDuration(timerData) === 0 ? false : true;
  };

  const hasChainedAction = () => {
    //console.log('timerData.chaining',timerData.chaining)
    if (
      timerData.chaining &&
      timerData.chaining.onend &&
      timerData.chaining.onend.chainEnabled &&
      timerData.chaining.onend.chainId &&
      timerData.chaining.onend.chainId.length > 1
    ) {
      //console.log('timerData.chaining: true ',timerData.chaining)
      return true;
    } else return false;
  };

  const getStartURL = () => {
    let url;
    if (
      timerData.timer.hasStartPlaylist &&
      timerData.timer.startPlaylist !== null
    ) {
      url = getPlaylistURL(timerData.timer.startPlaylist);
    } else if (timerData.timer.hasPlayDuringUrl) {
      url = timerData.timer.playDuringUrl;
    }
    return url;
  };

  const getEndURL = () => {
    let url;
    if (
      timerData.timer.hasEndPlaylist &&
      timerData.timer.endPlaylist !== null
    ) {
      url = getPlaylistURL(timerData.timer.endPlaylist);
    } else if (timerData.timer.hasEndPlayUrl) {
      url = timerData.timer.endPlayUrl;
    }
    return url;
  };

  const pauseAlerts = () => {};

  return {
    sayAloud,
    tabOpener,
    tabHoldingPageLoad,
    intervalActive,
    hasChainedAction,
    intervalDuration,
    getStartURL,
    getEndURL,
    getPlaylistURL,
    pauseAlerts
  };
};

export default useAlerts;
