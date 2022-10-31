const { Logtail } = require('@logtail/browser');

/*
    issues:
    want intelligent batch logging transmission - @logtail browser should do this.
    want to be able to switch on / off for development. √ 
    want to limit / a/b log from production (so dont swamp free tier logs) ideally by ipaddress/random-
    % of users.
    big issue - reinventing the wheel - just dont build on this - its a quick hack.
    need level setting - info typically off in production - except for when investigating.

*/
// Create a Logtail client
const logtail = new Logtail('sGq9MvoMTwWABRyiefMkGJ36');
let enabled = true;
//console.log(process.env);

const getHost = () => {
  let host = 'non-browser';
  if (typeof window !== 'undefined') {
    host = window.location.host;
  }
  return host;
};

/*
@param level : 'info','warn','error' etc. - should be configurable  in logtail
@param message: string. usually module.function, more.
@param obj : object. data to log.

all three required. msg must be string, obj must be object type.

l0- logic no deps:
*/
let l0 = (level, message, obj) => {
  const host = getHost();
  if (typeof obj !== 'object') obj = { primative: obj };
  const decorate = {
    meta: {
      host,
      time: Date.now(),
      NODE_ENV: process.env.NODE_ENV
    }
  };
  const newObj = { ...decorate, ...obj };
  return { level, message, newObj };
};
// l1 - logtail
const l1 = (level, message, obj) => {
  if (!enabled) {
    return console.log;
  } else {
    const res = l0(level, message, obj);
    logtail[level](message, res.newObj);
  }
};

//noop
const lx = () => {};

/*
control which env / host has logging enabled.
envs: ['production', 'development', 'test']
hosts: ['localhost:3000', 'localhost:4000', 'timermachine.com']
eventually want to limit logs by user ip.
*/
let l = l1;
// if (process.env.NODE_ENV === 'development') l = l1; //lx/l1
// if (process.env.NODE_ENV === 'production') l = l1;

const host = getHost;
if (host === 'non-browser') l = lx;
if (host === 'localhost:3000') l = lx;
if (host === 'localhost:4000') l = l1;
if (host === 'timermachine.com') l = l1;

//example:
//l('info', 'msgtest', { data: 2 });
//replace console.log( : l('info',

export const setLogging = (isEnabled) => {
  enabled = isEnabled;
};

export default l;
