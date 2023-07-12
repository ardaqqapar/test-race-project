import { Color } from './types';
import { names } from './userNamesList';
// Generate dummy user data
const usersData = [];

for (let i = 1; i <= 1000; i++) {
  const milliseconds = Math.floor(Math.random() * 1000); // Generate random milliseconds between 0 and 999
  const seconds = Math.floor(Math.random() * 60); // Generate random seconds between 0 and 59
  const minutes = Math.floor(Math.random() * 60); // Generate random minutes between 0 and 59

  const formattedMilliseconds = milliseconds.toString().padStart(3, '0'); // Pad milliseconds with leading zeros if necessary
  const formattedSeconds = seconds.toString().padStart(2, '0'); // Pad seconds with leading zeros if necessary
  const formattedMinutes = minutes.toString().padStart(2, '0'); // Pad minutes with leading zeros if necessary

  const time = `${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;

  const name = names[i-1]["name"]

  const user = {
    color: Object.values(Color)[Math.floor(Math.random() * Object.keys(Color).length)],
    name: name,
    speed: Math.floor(Math.random() * 100),
    time,
  };

  usersData.push(user);
}

usersData.sort((a, b) => {
  const timeA = a.time;
  const timeB = b.time;

  if (timeA < timeB) {
    return -1;
  }
  if (timeA > timeB) {
    return 1;
  }
  return 0;
});

export default usersData;
