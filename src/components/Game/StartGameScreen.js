import React from 'react';

import { Button, FlexContainer, FlexColumn, Spinner } from '../StyledComponents'

const StartGameScreen = ({ handleStartGame, isAdmin }) => {
  return <FlexContainer>{
    isAdmin ? <Button onClick={(event) => {
      event.preventDefault()
      handleStartGame()
    }}>
      Start Game
    </Button> : <FlexColumn><h3>Waiting for admin to start the game..</h3><Spinner /></FlexColumn>}</FlexContainer>
}

export default StartGameScreen;