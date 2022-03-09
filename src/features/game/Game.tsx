import { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import Board from '../../common/Board';
import { sendAction, initialiazeGame, resetGame, gameMapSelector, gameMessageSelector, gameOverSelector } from './gameSlice';

const LevelButton = styled(Button)({
  marginBottom: '0.5rem',
  minWidth: '10rem',
});

function Game() {
  const dispatch = useAppDispatch();
  const map = useAppSelector(gameMapSelector);
  const message = useAppSelector(gameMessageSelector);
  const gameOver = useAppSelector(gameOverSelector);
  

  const [level, setLevel] = useState<number>(1);
  
  const doCreateGame = (level: number) => {
    const newGameCommand = `new ${level}`;
    console.log('newGameCommand: ', newGameCommand);
    
    dispatch(sendAction(newGameCommand));
  }
  const onResetGame = () => {
    dispatch(resetGame());
  };

  const onSelectLevel = (level: number) => () => {
    setLevel(level);
    doCreateGame(level);
  };

  const onSquareClick = (x: number, y: number) => {
    if (gameOver) {
      return;
    }
    dispatch(sendAction(`open ${x} ${y}`));
  };

  useEffect(() => {
    dispatch(initialiazeGame());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (map.length) {
    return (
      <Box width="100%" maxWidth="100%">
        <Typography variant="h4">
          Level {level}
        </Typography>
        <Button variant="contained" onClick={onResetGame}>Main Menu</Button>
        <Typography hidden={!gameOver} style={{ color: 'red' }}>
          Game Over!
        </Typography>
        <Typography hidden={!message}>{message}</Typography>
        <Box alignItems="center" margin={2} maxHeight="80vh" style={{ overflowX: "auto" }}>
          <Board gameMap={map} level={level} onSquareClick={onSquareClick} />
        </Box>
      </Box>
    );
  }

  return (
    <Container>
      <Box display="flex" flexDirection="column">
        <Typography variant="h3">
        Minesweeper!
        </Typography>
        <Typography variant="h3">
          Pick a level to start
        </Typography>
        <Box marginTop={4} display="flex" flexDirection="column" alignItems="center">
          <LevelButton variant="contained" onClick={onSelectLevel(1)} data-testid="level-button">Easy</LevelButton>
          <LevelButton variant="contained" onClick={onSelectLevel(2)}>Medium</LevelButton>
          <LevelButton variant="contained" onClick={onSelectLevel(3)}>Hard</LevelButton>
          <LevelButton variant="contained" onClick={onSelectLevel(4)}>Extreme</LevelButton>
        </Box>
      </Box>
    </Container>
  );
}

export default Game;
