import ReactPlayer from 'react-player/youtube';
import { useEffect, useState } from 'react';
import PubSub from 'pubsub-js';
import { VIDEO_ID, VIDEO_PLAY } from '../pub/topics';

const YTPlayer = () => {
  /*
  const PlayitFrame = () => {
    //incase given url:
    const id = getYouTubeID(videoID);
    console.log('yp player:', { videoID, id });

    const srcstring = 'https://www.youtube.com/embed/' + id + '?autoplay=1';
    return (
      <iframe
        width="435"
        height="320"
        src={srcstring}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen></iframe>
    );
  }; */

  const [videoPlaying, setVideoPlaying] = useState();
  const [videoID, setVideoID] = useState();

  const videoPlayingChange = (msg, data) => {
    setVideoPlaying(data);
  };
  const videoUrlChange = (msg, data) => {
    setVideoID(data);
    console.log('videoUrlChange', data);
  };

  //todo tokens = , destroy on dismount component.
  PubSub.subscribe(VIDEO_PLAY, videoPlayingChange);
  PubSub.subscribe(VIDEO_ID, videoUrlChange);

  useEffect(() => {
    //console.log('YTplayer, videoPlaying changed detected:', videoPlaying);
  }, [videoPlaying]);

  function Player() {
    const onPlayerReady = (event) => {
      // access to player in all event handlers via event.target
      //console.log('onPlayerReady');
      // event.target.pauseVideo();
      event.target.playVideo();
    };
    const opts = {
      width: '435',
      height: '320',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };
    // const id = getYouTubeID(videoID);
    // console.log('yp player:', { videoID, id });
    return (
      <ReactPlayer
        url={videoID}
        playervars={{ autoplay: 1, controls: 1 }}
        opts={opts}
        playing={true}
        onReady={onPlayerReady}
        width="425px"
        height="240px"
      />
    );
  }

  return (
    // scale-75
    <div className="m-2">
      {/* <h1> YT Player</h1>
      <div>Playing {videoPlaying ? 'true' : 'false'} </div>
      <div>id: {videoID}</div> */}
      {videoPlaying && <Player />}
      {!videoPlaying && (
        <div width="435" height="320" className="baseWhite">
          {/* Player */}
        </div>
      )}
    </div>
  );
};

export default YTPlayer;
