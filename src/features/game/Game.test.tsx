import Game from './Game';
import { setMap } from './gameSlice';
import { render, resetStore, store } from '../../test-utils';

import { dataMap } from './test-data';

beforeAll(() => { 
  resetStore();
});

it('should render empty state correctly', () => {
  const { getByText } = render(<Game />);
  expect(getByText('Pick a level to start')).toBeInTheDocument();
});

it('should render level buttons correctly', () => {
  const { getByTestId } = render(<Game />);
  expect(getByTestId('level-button')).toBeInTheDocument();
});

it('should render board game if we have map data', () => {
  store.dispatch(setMap(dataMap));
  const { getByTestId } = render(<Game />);
  expect(getByTestId('board-wrapper')).toBeInTheDocument();
});

it('should render cells in the game board if map data is provided', () => {
  store.dispatch(setMap(dataMap));
  const { getByTestId } = render(<Game />);
  expect(getByTestId('board-wrapper')).toBeInTheDocument();
  expect(getByTestId('square-1-1')).toBeInTheDocument();
});
