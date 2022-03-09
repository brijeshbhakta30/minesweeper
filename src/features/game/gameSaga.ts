import { getContext, take, put, takeLatest, call, fork, apply } from 'redux-saga/effects';
import { initialiazeGame, sendAction, setMap, updateMessage } from './gameSlice';
import { createSocketConnectionChannel } from './gameHelper';

function* getMap(socket: any) {
  yield apply(socket, socket.send, ['map']);
}

export function* handleSendAction(action: any) {
  const socket: WebSocket = yield getContext('socket');
  yield apply(socket, socket.send, [action.payload]);
}

export function* watchOnGame(): any {
  const socket: WebSocket = yield getContext('socket');
  const socketChannel = yield call(createSocketConnectionChannel, socket);

  while (true) {
    try {
      const data = yield take(socketChannel);
      if (data.includes('map:')) {
        yield put(setMap(data));
      }
      if (data.includes('new:')) {
        yield fork(getMap, socket);
      }
      if (data.includes('open:')) {
        yield put(updateMessage(data.split('open: ')[1]));
        yield fork(getMap, socket);
      }
    } catch (err) {
      console.error('socket error:', err);
      socketChannel.close();
    }
  }
}

export default function* gameSaga() {
  yield takeLatest(initialiazeGame.type, watchOnGame);
  yield takeLatest(sendAction.type, handleSendAction);
}
