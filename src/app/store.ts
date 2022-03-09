import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import gameReducer from '../features/game/gameSlice';
import rootSaga from './sagas';
import socket from './socket';

export const getStore = () => {
  const sagaMiddleware = createSagaMiddleware({ context: { socket }});

  const store = configureStore({
    reducer: {
      game: gameReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
  });
  
  sagaMiddleware.run(rootSaga);
  return store;
}

export const store = getStore();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
