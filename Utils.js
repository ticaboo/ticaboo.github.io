import audioData from './data/audio.json';

export const secondsToTime = (seconds) => {
  return {
    h: Math.floor(seconds / 3600)
      .toString()
      .padStart(2, '0'),
    m: Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, '0'),
    s: Math.floor((seconds % 3600) % 60)
      .toString()
      .padStart(2, '0')
  };
};

export const timeToSeconds = (h, m, s) => {
  return Number(h) * 3600 + Number(m) * 60 + Number(s);
};

export const dateTohms = (d) => {
  const date = d || new Date();
  return {
    h: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds(),
    ms: date.getMilliseconds()
  };
};

/* 
for files stored in site/audio folder:
*/
export const getAudioSrc = (id, category) => {
  // // console.log('audioData:', audioData, category);
  // // console.log('audioData[category]', audioData[category]);

  const src =
    '/assets/audio/' +
    audioData[category].find((audio) => audio.id === Number(id)).src;
  //// console.log('audio id:', id, 'src', src);
  return src;
};

export const getPlaylistURL = (id) => {
  const playlist = audioData['Media'].find((audio) => audio.id === Number(id));
  //console.log('getPlaylistURL',playlist)
  //console.log('getPlaylistURL(id):', id, ', src:', playlist);
  return playlist.src;
};

export const getAudioName = (id, category) => {
  const name = audioData[category].find(
    (audio) => audio.id === Number(id)
  ).name;
  //// console.log('audio id:', id, 'src', src);
  return name;
};
/*
more than just format:
stowatch vs timer logic.
overtimer logic (+)
*/
export const formatTime = (seconds, direction) => {
  var label = '';
  //overtime:
  if (seconds < 0 && direction === -1) {
    seconds = seconds * -1;
    label = '+';
  }
  const s = `0${seconds % 60}`.slice(-2);
  const minutes = `${Math.floor(seconds / 60)}`;
  const m = `0${minutes % 60}`.slice(-2);
  const h = `0${Math.floor(seconds / 3600)}`.slice(-2);

  return `${label} ${h}:${m}:${s}`;
  //todo: change to obj, allow styling in JSX.
  //return { h, m, s, label };
};

/*
if just minutes: 5m.
if hrs and minutes: 1:30h
if mins and seconds: 5:30m
if all 3: 1:30:45
*/
export const formatSecondsShort = (seconds, direction) => {
  const getSeconds = `0${seconds % 60}`.slice(-2);
  const minutes = `${Math.floor(seconds / 60)}`;
  const getMinutes = `0${minutes % 60}`.slice(-2);
  const getHours = `0${Math.floor(seconds / 3600)}`.slice(-2);
  let res = '';
  if (getHours === '00' && getMinutes !== '00' && getSeconds === '00')
    res = getMinutes + 'm';
  if (getHours === '00' && getMinutes !== '00' && getSeconds !== '00')
    res = getMinutes + ':' + getSeconds + 'm';
  if (getHours !== '00' && getMinutes !== '00' && getSeconds === '00')
    res = getHours + ':' + getMinutes + 'h';
  if (getHours !== '00' && getMinutes !== '00' && getSeconds !== '00')
    res = `${getHours}:${getMinutes}:${getSeconds}`;
  if (getHours === '00' && getMinutes === '00' && getSeconds === '00')
    res = 'stopwatch';

  return res;
};

export const formatTimeShort = (timer, direction) => {
  const getHours = timer.h === '' ? '0' : timer.h;
  const getMinutes = timer.m === '' ? '0' : timer.m;
  const getSeconds = timer.s === '' ? '0' : timer.s;
  //// console.log(timer);
  let res = '';
  //minutes only
  if (getHours === '0' && getMinutes !== '0' && getSeconds === '0')
    res = getMinutes + 'm';
  //seconds only
  if (getHours === '0' && getMinutes === '0' && getSeconds !== '0')
    res = getSeconds + 's';
  //hours only
  if (getHours !== '0' && getMinutes === '0' && getSeconds === '0')
    res = getHours + 'h';

  //mins and seconds
  if (getHours === '0' && getMinutes !== '0' && getSeconds !== '0')
    res = getMinutes + 'm' + getSeconds + 's';
  //hrs and mins
  if (getHours !== '0' && getMinutes !== '0' && getSeconds === '0')
    res = getHours + 'h' + getMinutes + 'm';

  //all three
  if (getHours !== '0' && getMinutes !== '0' && getSeconds !== '0')
    res = `${getHours}:${getMinutes}:${getSeconds}`;
  //none
  if (getHours === '0' && getMinutes === '0' && getSeconds === '0') res = '';
  if (res !== '') res = '(' + res + ')';
  return res;
};

const trimAndElipse = (str, totalFieldsToTrimLength) => {
  //// console.log(totalFieldsToTrimLength);
  let trimmed = str.substring(0, totalFieldsToTrimLength);
  if (str.length > trimmed.length) trimmed += '..';
  return trimmed;
};
/*
label not used?
*/
export const formatTimerInfo = (timer, label = '', category) => {
  let res = '';
  if (formatTimeShort(timer) !== '') {
    if (timer.hasAnnounce || timer.hasAlert) {
      res = label + ' ' + formatTimeShort(timer) + '. ';

      if (timer.hasAlert)
        if (timer.hasAnnounce)
          // todo: fix (switched data/audio / Audio to AlarmSounds and IntervalSounds + Media for external links)
          // res +=
          //   trimAndElipse(getAudioName(timer.alert, 'AlarmSounds'), 35) + '. ';
          res += '`' + trimAndElipse(timer.announce, 35) + '`.';
    }
  }
  return res;
};

export const encodeObjToURI = (timer) => {
  const encodedTimer = encodeURIComponent(JSON.stringify(timer));
  return encodedTimer;
};

export const decodeObjFromURI = (timerURIComponentString) => {
  const decodedTimer = JSON.parse(decodeURIComponent(timerURIComponentString));
  return decodedTimer;
};

export const debounce = (callback, wait) => {
  let timeout;
  return (...args) => {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => callback.apply(context, args), wait);
  };
};
