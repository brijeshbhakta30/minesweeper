import Board from './Board';
import { render } from '../test-utils';

import { convertMapPayload } from '../features/game/gameHelper';
import { dataMap } from '../features/game/test-data';

const boardProps = {
  level: 1,
  gameMap: convertMapPayload(dataMap),
  onSquareClick: jest.fn(),
};

it('should render game board correctly', () => {
  const { getByTestId } = render(<Board {...boardProps} />);
  expect(getByTestId('board-wrapper')).toBeInTheDocument();
});

it('should render cell buttons correctly', () => {
  const { getByTestId } = render(<Board {...boardProps} />);
  expect(getByTestId('square-1-1')).toBeInTheDocument();
});
