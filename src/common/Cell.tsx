import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import BombImage from '../assets/img/bomb.png';

const CellButton = styled(Button)({
  padding: '0.25rem',
});

type BoardProps = {
  value: string,
  testId: string,
  level: number,
  onClick: () => any,
}

function Cell({ testId, level, value, onClick }: BoardProps) {
  const getColor = (value: string) => {
    switch (value) {
      case '*':
        return 'error';
      case '□':
        return 'primary';
      default:
        return 'success';
    }
  }
  const renderValue = () => {
    switch (value) {
      case '*':
        return <img data-testid="bomb-image" src={BombImage} width="100%" alt="bomb" />;
      case '□':
        return null;
      default:
        return value;
    }
  }
  const getCellStyle = () => {
    const cellSize = 4 / level;
    return {
      width: `${cellSize}rem`,
      minWidth: `${cellSize}rem`,
      height: `${cellSize}rem`,
    };
  }
  return (
    <CellButton
      data-testid={testId}
      variant="outlined"
      color={getColor(value)}
      onClick={onClick}
      style={getCellStyle()}
    >
      {renderValue()}
    </CellButton>
  );
}

export default Cell;
