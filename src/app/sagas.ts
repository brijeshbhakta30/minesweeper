import { fork } from 'redux-saga/effects';
import gameSaga from '../features/game/gameSaga';

function* rootSaga() {
  yield fork(gameSaga);
}

export default rootSaga;
