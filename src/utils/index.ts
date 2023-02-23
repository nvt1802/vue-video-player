export const toHHMMSS = function (value: any) {
  const sec_num = parseInt(value);
  const hours = Math.floor(sec_num / 3600);
  const minutes = Math.floor((sec_num - hours * 3600) / 60);
  const seconds = sec_num - hours * 3600 - minutes * 60;
  const hoursDisplay = `${hours < 10 ? `0${hours}` : hours}`;
  const minutesDisplay = `${minutes < 10 ? `0${minutes}` : minutes}`;
  const secondsisplay = `${seconds < 10 ? `0${seconds}` : seconds}`;
  return `${
    hours > 0 ? `${hoursDisplay}:` : ""
  }${minutesDisplay}:${secondsisplay}`;
};
