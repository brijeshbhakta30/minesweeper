import { isDevelopment, urls } from './constants';

const debug = isDevelopment;
const socket = new WebSocket(urls.gameServer);

socket.onopen = () => {
  if (debug) {
    console.log('you are online!');
  }
};

socket.onmessage = data => {
  if (debug) {
    console.log('incoming message', data);
  }
};

socket.onclose = () => {
  if (debug) {
    console.log('bye bye');
  }
};

export default socket;
