import React from 'react';
import Quotes from './data/quotes.json';

/*
qod (quote of day)
@return {singleQuote, lines [], attribution, link }
*/
const getQod = () => {
  var now = new Date();
  var start = new Date(now.getFullYear(), 0, 0);
  var diff =
    now -
    start +
    (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
  var oneDay = 1000 * 60 * 60 * 24;
  var dayOfYear = Math.floor(diff / oneDay);
  // // console.log(
  //   'Day of year: ' + dayOfYear,
  //   Quotes.length,
  //   (dayOfYear % Quotes.length) - 1
  // );

  var qodPick = Quotes[dayOfYear % Quotes.length];
  var author = qodPick.pop(); //qodPick[qodPick.length - 1];
  if (author === '') author = 'unattributed';
  const singleQuote = qodPick.join(' ');
  const lines = qodPick;
  var qod = {
    singleQuote,
    lines,
    author,
    link: 'https://en.wikipedia.org/wiki/' + author.split(' ').join('_')
  };
  // // console.log(qod);
  return qod;
};

const qod = getQod();

const Quote = () => {
  //const [qod, setQod] = useState(getQod());

  return (
    <div className=" text-sm m-2 h-[186px]">
      Time Quote of the day:
      <div className="inline-block">
        <a href={qod.link} target="_blank" rel="noreferrer">
          {qod.singleQuote}. {qod.author}
        </a>
      </div>
    </div>
  );
};

export default Quote;
