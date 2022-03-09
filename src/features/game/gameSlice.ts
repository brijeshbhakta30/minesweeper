import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { convertMapPayload } from './gameHelper';
import { RootState } from '../../app/store';

export interface GameState {
  map: string[];
  message: string;
  gameOver: boolean;
}

export const getInitialState = (): GameState => ({
  map: [],
  message: '',
  gameOver: false,
});

export const gameSlice = createSlice({
  name: 'game',
  initialState: getInitialState(),
  reducers: {
    resetGame: (state) => getInitialState(),
    setMap(state, action: PayloadAction<any>) {
      state.map = convertMapPayload(action.payload);
    },
    updateMessage(state, { payload: message }) {
      state.message = message;
      if (message === 'You lose') {
        state.gameOver = true;
      }
    },
  },
});

export const {
  resetGame,
  setMap,
  updateMessage,
} = gameSlice.actions;

export const initialiazeGame = createAction<undefined>('game/initialiazeGame');
export const sendAction = createAction<string>('game/sendAction')

export const gameMapSelector = (state: RootState) => state.game.map;
export const gameMessageSelector = (state: RootState) => state.game.message;
export const gameOverSelector = (state: RootState) => state.game.gameOver;

export default gameSlice.reducer;
