import React from 'react';
import { useFormContext } from 'react-hook-form';
import ButtonAnimation from './ButtonAnimation';
import { ShareIcon } from '../../icons';
import { encodeObjToURI } from '../../../Utils';

/*

*/

const BookmarkButton = ({ clickHandler }) => {
  const { watch } = useFormContext();
  // const watchID = watch('id');

  /*
  timer -> string (Json serialse, HttpUtility.UrlEncode)
  timermachine.com/onetime?t=""
  -> clipboard and-or: open new tab with address
  https://encodedtimermachine.com/single?t=%7B%22id%22%3A%2273428511-f4d4-4d77-99bd-4d3b3bbb1070%22%2C%22direction%22%3A-1%2C%22chainAction%22%3A%22%22%2C%22hasInterval%22%3Afalse%2C%22timer%22%3A%7B%22name%22%3A%22Timer%201%22%2C%22h%22%3A%22%22%2C%22m%22%3A%22%22%2C%22s%22%3A%2230%22%2C%22hasAlert%22%3Atrue%2C%22alert%22%3A%221%22%2C%22hasAnnounce%22%3Afalse%2C%22announce%22%3A%22say%20what%3F%22%2C%22hasEndPlaylist%22%3Atrue%2C%22endPlaylist%22%3A%221%22%2C%22hasStartPlaylist%22%3Atrue%2C%22startPlaylist%22%3A%221%22%2C%22hasPlayDuringUrl%22%3Afalse%2C%22playDuringUrl%22%3A%22https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DfjM1-kzMs8A%22%2C%22hasEndPlayUrl%22%3Afalse%2C%22endPlayUrl%22%3A%22https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DfjM1-kzMs8A%22%7D%2C%22interval%22%3A%7B%22name%22%3A%22interval%22%2C%22h%22%3A%22%22%2C%22m%22%3A%22%22%2C%22s%22%3A%22%22%2C%22hasAlert%22%3Afalse%2C%22alert%22%3A1%2C%22hasAnnounce%22%3Afalse%2C%22announce%22%3A%22%22%7D%7D
  */

  const bookmarker = () => {
    const timer = watch();
    delete timer.id; /* not needed or desirable for single timer (saving later could overwrite original) */
    /*todo: all input needs to be security santizied eg: name: select(id=admin from User) */

    const encodedTimer = encodeObjToURI(timer);
    const url = window.location.origin + '/single?t=' + encodedTimer;
    //to clipbaord
    navigator.clipboard.writeText(url).then(
      function () {
        //console.log('Async: Copying to clipboard was successful!');
      },
      function (err) {
        console.error('Async: Could not copy text: ', err);
      }
    );
    //open url new tab
    window.open(url, '_self');
    //(in new tab: create timer from url)
  };

  return (
    <div className="flex justify-end m-1" title="pop to one timer">
      <ButtonAnimation clickHandler={bookmarker}>
        <div
          title="pop out timer"
          className="border-neutral-300 border-2 rounded-full mx-1 p-1 ">
          <ShareIcon />
        </div>
      </ButtonAnimation>
    </div>
  );
};

export default BookmarkButton;
