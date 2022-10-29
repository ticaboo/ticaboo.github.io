export const latestStructure = {
  id: '',
  direction: -1,
  schedule: {
    hasScheduleAnnounce: false,
    scheduleAnnounce: '',
    h: '',
    m: '',
    s: ''
  },
  timer: {
    name: '',
    h: '',
    m: '',
    s: '',
    hasAlert: false,
    alert: '',
    hasAnnounce: false,
    announce: '',
    hasStartAlert: false,
    startAlert: '',
    hasStartAnnounce: false,
    startAnnounce: '',

    hasEndPlaylist: false,
    endPlaylist: '',

    hasStartPlaylist: false,
    startPlaylist: '',

    hasPlayDuringUrl: false,
    playDuringUrl: '',
    hasEndPlayUrl: false,
    endPlayUrl: ''
  },

  interval: {
    name: 'interval',
    h: '',
    m: '',
    s: '',
    hasAlert: false,
    alert: 1,
    hasAnnounce: false,
    announce: ''
  },
  chaining: {
    onend: {
      chainEnabled: false,
      chainId: ''
    }
  }
};

const decoration = { schedule: { h: '', m: '', s: '' } };
export const timerScheduled = { ...latestStructure, ...decoration };

export const defaultTimer = {
  id: '',
  direction: -1,
  //chainAction: '',
  //hasInterval: false,
  schedule: {
    hasScheduleAnnounce: false,
    scheduleAnnounce: 'wake up',
    h: '7',
    m: '30',
    s: ''
  },
  timer: {
    name: 'Default Timer',
    h: '',
    m: '',
    s: '',
    hasAlert: true,
    alert: '1',
    hasAnnounce: true,
    announce: 'timer done',
    hasStartAlert: false,
    startAlert: '2',
    hasStartAnnounce: false,
    startAnnounce: '',

    hasEndPlaylist: false,
    endPlaylist: '',

    hasStartPlaylist: false,
    startPlaylist: '',

    hasPlayDuringUrl: false,
    playDuringUrl: 'https://www.youtube.com/watch?v=NrUIJY_Xu2s',
    hasEndPlayUrl: false,
    endPlayUrl: 'https://www.youtube.com/watch?v=fjM1-kzMs8A'
  },

  interval: {
    name: 'interval',
    h: '',
    m: '',
    s: '',
    hasAlert: false,
    alert: 1,
    hasAnnounce: false,
    announce: ''
  },
  chaining: {
    onend: {
      chainEnabled: false,
      chainId: ''
    }
  }
};

export const videoOnStartTimer = {
  id: '',
  direction: -1,
  chainAction: '',
  hasInterval: false,
  timer: {
    name: 'video on start',
    h: '',
    m: '',
    s: '10',
    hasAlert: true,
    alert: '1',
    hasAnnounce: false,
    announce: 'say what?',

    hasEndPlaylist: false,
    endPlaylist: '',

    hasStartPlaylist: false,
    startPlaylist: '',

    hasPlayDuringUrl: true,
    playDuringUrl: 'https://www.youtube.com/watch?v=NrUIJY_Xu2s',
    hasEndPlayUrl: false,
    endPlayUrl: 'https://www.youtube.com/watch?v=fjM1-kzMs8A'
  },

  interval: {
    name: 'interval',
    h: '',
    m: '',
    s: '',
    hasAlert: false,
    alert: 1,
    hasAnnounce: false,
    announce: ''
  }
};

export const startDuringEndTimer = {
  id: '',
  direction: -1,
  playCount: 0,
  timer: {
    name: 'Default Timer',
    h: '',
    m: '',
    s: '10',
    hasAlert: true,
    alert: '1',
    hasAnnounce: false,
    announce: 'say what?',

    hasStartAlert: false,
    startAlert: '1',
    hasStartAnnounce: false,
    startAnnounce: 'say at start of timer',

    hasEndPlaylist: false,
    endPlaylist: '',

    hasStartPlaylist: false,
    startPlaylist: '',

    hasPlayDuringUrl: false,
    playDuringUrl: 'https://www.youtube.com/watch?v=NrUIJY_Xu2s',
    hasEndPlayUrl: false,
    endPlayUrl: 'https://www.youtube.com/watch?v=fjM1-kzMs8A'
  },

  interval: {
    name: 'interval',
    h: '',
    m: '',
    s: '',
    hasAlert: false,
    alert: 1,
    hasAnnounce: false,
    announce: ''
  },
  chaining: {
    onend: {
      chainEnabled: false,
      chainId: ''
    }
  }
};
