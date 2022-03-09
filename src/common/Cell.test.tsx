import Cell from './Cell';
import { render } from '../test-utils';

const cellProps = {
  level: 1,
  value: '□',
  onClick: jest.fn(),
  testId: 'square-1-1',
};

const cellValue = '9999';

it('should render cell correctly', () => {
  const { getByTestId } = render(<Cell {...cellProps} />);
  expect(getByTestId(cellProps.testId)).toBeInTheDocument();
});

it('should render bomb image of the element is a mine', () => {
  const { getByTestId } = render(<Cell {...cellProps} value="*" />);
  expect(getByTestId('bomb-image')).toBeInTheDocument();
});

it('should render value passed to the cell', () => {
  const { getByText } = render(<Cell {...cellProps} value={cellValue} />);
  expect(getByText(cellValue)).toBeInTheDocument();
});

it('should render cell with primary varient for default value', () => {
  const { getByTestId } = render(<Cell {...cellProps} />);
  const cellNode = getByTestId(cellProps.testId);
  expect(cellNode.className).toContain('MuiButton-outlinedPrimary');
});

it('should render cell with success varient with value', () => {
  const { getByTestId } = render(<Cell {...cellProps} value={cellValue} />);
  const cellNode = getByTestId(cellProps.testId);
  expect(cellNode.className).toContain('MuiButton-outlinedSuccess');
});

it('should render cell with error varient with value', () => {
  const { getByTestId } = render(<Cell {...cellProps} value="*" />);
  const cellNode = getByTestId(cellProps.testId);
  expect(cellNode.className).toContain('MuiButton-outlinedError');
});
