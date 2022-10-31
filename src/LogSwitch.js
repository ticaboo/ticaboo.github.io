import React, { useState } from 'react';
import { setLogging } from './logging';
//let enabled = true;
let host = 'localhost:3000';

export const LogSwitch = () => {
  const [enabled, setEnabled] = useState(false);
  const toggleEnabled = () => {
    setEnabled(!enabled);
    setLogging(enabled);
  };
  return (
    <div className="baseWhite">
      <div>
        {host.match('localhost:3000') && (
          <div>
            logging:- {enabled ? 'on' : 'off'}-
            <button onClick={toggleEnabled}>toggle</button>
          </div>
        )}
      </div>
    </div>
  );
};
