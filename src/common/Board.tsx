import { useMemo } from 'react';
import Box from '@mui/material/Box';

import Cell from './Cell';

type BoardProps = {
  gameMap: Array<string>,
  level: number,
  onSquareClick: (x: number, y: number) => any,
}

function Board({ gameMap, level, onSquareClick }: BoardProps) {
  const gameBoard = useMemo(() => gameMap.map((item, rowIndex: number) => {
    const squares = item.split('');
    const row = squares.map((square, columnIndex: number) => {
      const key = `square-${rowIndex}-${columnIndex}`;
      const onCellClick = () => onSquareClick(columnIndex, rowIndex);
      return <Cell
        key={key}
        testId={key}
        level={level}
        value={square}
        onClick={onCellClick}
      />
    });
    return <Box display="flex" flexWrap="nowrap" key={`square-row-${rowIndex}`}>{row}</Box>;
  }), [gameMap, level]); // eslint-disable-line react-hooks/exhaustive-deps
  
  return <Box data-testid="board-wrapper" display="flex" flexDirection="row" justifyContent="center" alignItems="center">{gameBoard}</Box>;
}

export default Board;
