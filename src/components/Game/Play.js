import React, { useState, useEffect } from 'react';
import styled from 'styled-components'

import theme, { avatars } from '../../constants/theme'
import { socket } from '../../constants/websocket'
import { Button, FlexContainer, Spinner, FlexColumn } from '../StyledComponents'

import InputTable from './InputTable'
import ResultsTable from './ResultsTable'
import ScoreTable from './ScoreTable'
import ActivePlayers from './PlayerList'
import GameHeader from './GameHeader'

const Container = styled.div`
  font-family: ${theme.font};
`

const ExitButtonContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin: 20px;
`

const ExitButton = styled.button`
  font-size: 15px;
  color: ${theme.colors.red};
  padding: 5px;
  cursor: pointer;
  width: 30px;
  border: 1px solid ${theme.colors.red};
  box-shadow: ${theme.colors.red} 2px 2px 0px 0px;
  border-radius: 15px;
  font-family: 'Schoolbell', cursive;;
`

const Play = ({ gameData, setGamePlaying }) => {
  const [users, setUsers] = useState([]);
  const [code, setCode] = useState('');
  const [currentGameRound, setCurrentGameRound] = useState(1);
  const [responseSubmitted, setResponseSubmitted] = useState(false);
  const [scoreSubmitted, setScoreSubmitted] = useState(false);
  const [allScoresCollected, setAllScoresCollected] = useState(false);
  const [allResponsesCollected, setAllResponsesCollected] = useState(false);
  const [currentAlphabet, setCurrentAlphabet] = useState('')
  const [gameState, setGameState] = useState({});
  const [gameStarted, startGame] = useState(false);
  const [timerValue, setTimerValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [finalScores, setFinalScores] = useState([]);
  const [maxRounds, setMaxRounds] = useState(0);
  const [categories, setCategories] = useState([])

  const isAdmin = gameData.isAdmin;

  useEffect(() => {
    const { code, users, maxRounds, categories } = gameData;
    setUsers(users)
    setCode(code);
    setMaxRounds(maxRounds)
    setCategories(categories)
  }, [gameData]);

  useEffect(() => {
    socket.on("gameData", ({ users }) => {
      setUsers(users);
    });

    socket.on("allSubmitted", ({ gameState }) => {
      setGameState(Object.assign({}, gameState))
      setAllResponsesCollected(true)
    })

    socket.on("allScoresSubmitted", ({ gameState }) => {
      setGameState(Object.assign({}, gameState))
      setAllScoresCollected(true)
    })

    socket.on("allPlayersReady", ({ gameState }) => {
      setLoading(true)
      setGameState(Object.assign({}, gameState))
      setCurrentGameRound(gameState.currentRound);
      setResponseSubmitted(false);
      setAllResponsesCollected(false);
      setAllScoresCollected(false);
      setScoreSubmitted(false);
      setTimerValue(0)
      setCurrentAlphabet(gameState.currentAlphabet)
      setLoading(false)
    })

    socket.on("gameStarted", ({ gameState }) => {
      startGame(gameState.started);
      setCurrentAlphabet(gameState.currentAlphabet)
    });

    socket.on("gameEnded", ({ scores, gameState }) => {
      setLoading(true)
      setGameState(Object.assign({}, gameState))
      setCurrentGameRound(1);
      setResponseSubmitted(false);
      setAllResponsesCollected(false);
      setAllScoresCollected(false);
      setScoreSubmitted(false);
      setTimerValue(0)
      setCurrentAlphabet('')
      setGameEnded(true)
      startGame(false)
      setLoading(false)

      setFinalScores(scores)
    });


    socket.on("timerValue", ({ timer }) => {
      setTimerValue(timer)
    })
  }, []);

  // Sumbit users respnse
  const sendResponse = (response) => {
    // forEach category, make a response object
    socket.emit('sendResponse', { code, response, round: currentGameRound }, () => {
      setResponseSubmitted(true)
      socket.emit('stopTimer', { code })
    })
  }

  const handleSubmitScore = (score) => {
    let submitScore;
    submitScore = score ? score : 0;
    socket.emit('sendScore', { code, score: submitScore, round: currentGameRound }, ({ error, gameState }) => {
      if (error) alert(error)
      else if (gameState) {
        setScoreSubmitted(true)
      }
    })
  }

  const handleStartGame = () => {
    socket.emit('startGame', { code }, (gameState) => {
      if (gameState) {
        startGame(gameState.started)
        setLoading(false)
      }
    })
  }

  const handleStartNextRound = () => {
    // If everyone is ready to start next round, then start next round 
    socket.emit('playerReady', { code, round: currentGameRound }, ({ gameState }) => {
      if (gameState) {

      }
    })
  }

  const renderGameState = () => {
    if (loading) return <FlexContainer><Spinner /></FlexContainer>
    if (gameEnded) return <FinalScreen scores={finalScores} />
    if (!gameStarted) return <StartGameScreen handleStartGame={handleStartGame} isAdmin={isAdmin} />
    else if (allScoresCollected)
      return <ScoreTable handleStartNextRound={handleStartNextRound} round={currentGameRound} gameState={gameState} />
    else if (responseSubmitted && !allResponsesCollected)
      return <FlexContainer><Spinner /></FlexContainer>
    else if (allResponsesCollected)
      return <ResultsTable scoreSubmitted={scoreSubmitted} handleSubmitScore={handleSubmitScore} round={currentGameRound} gameState={gameState} />
    else
      return <>
        {(gameStarted) ? <GameHeader maxRounds={maxRounds} timerValue={timerValue} roundNumber={currentGameRound} currentAlphabet={currentAlphabet} /> : false}
        <InputTable categories={categories} timerValue={timerValue} sendResponse={sendResponse} />
      </>
  }

  return <Container>
    <ExitButtonContainer><ExitButton onClick={() => {
      socket.emit('removeUserFromGame', { code }, () => {
        setGamePlaying(false)
      })
    }}>X</ExitButton></ExitButtonContainer>
    {!gameEnded && <ActivePlayers gameStarted={gameStarted || gameEnded} users={users} />}
    {renderGameState()}
  </Container>
}


const StartGameScreen = ({ handleStartGame, isAdmin }) => {
  return <FlexContainer>{
    isAdmin ? <Button onClick={(event) => {
      event.preventDefault()
      handleStartGame()
    }}>
      Start Game
    </Button> : <FlexColumn><h3>Waiting for admin to start the game..</h3><Spinner /></FlexColumn>}</FlexContainer>
}

const FinalScreen = ({ scores }) => {
  let winner = {
    score: 0,
  };
  scores.forEach(score => {
    if (score.score > winner.score) winner = {
      score: score.score,
      name: score.name
    }
  })


  return <FlexColumn>
    <h2>Final Scores</h2>
    <FlexContainer>
      {scores.map(user => {
        return <div style={{ margin: "0 20px", textAlign: "center" }} key={user.name}>
          <img alt={`${user.name} avatar`} src={avatars[user.avatarId]} width={60} height={60} />
          <p>{user.name}: {user.score}</p>
        </div>
      })
      }
    </FlexContainer>
    <h2 style={{ textAlign: "center" }}>{`🎉🎉 The winner is: ${winner.name || 'No winner!'} 🎉🎉`}</h2>
  </FlexColumn >
}

export default Play;