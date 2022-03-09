import reducer, { getInitialState, resetGame, setMap, updateMessage } from './gameSlice';
import { convertMapPayload } from './gameHelper';
import { dataMap } from './test-data';

test('should return the initial state for game reducer', () => {
  // @ts-ignore
  expect(reducer(undefined, {})).toEqual(getInitialState());
});

test('should set map in the store if action is called', () => {
  const state = reducer(getInitialState(), setMap(dataMap));
  expect(state).toEqual({
    ...getInitialState(),
    map: convertMapPayload(dataMap),
  });
});

test('should reset the game details to initial state on rest action', () => {
  const stateWithMapData = reducer(getInitialState(), setMap(dataMap));
  const state = reducer(stateWithMapData, resetGame);
  expect(state).toEqual(getInitialState());
});

test('should reset the game details to initial state on rest action', () => {
  const stateWithMapData = reducer(getInitialState(), setMap(dataMap));
  const state = reducer(stateWithMapData, resetGame);
  expect(state).toEqual(getInitialState());
});

test('should update message on update message action', () => {
  const message = 'OK';
  const state = reducer(getInitialState(), updateMessage(message));
  expect(state).toEqual({
    ...getInitialState(),
    message,
  });
});

test('should finish game if you loose is received on update message action', () => {
  const message = 'You lose';
  const state = reducer(getInitialState(), updateMessage(message));
  expect(state).toEqual({
    ...getInitialState(),
    message,
    gameOver: true,
  });
});
