import React from 'react';
import { ExitButton, ExitButtonContainer, Button } from './StyledComponents';
import styled from 'styled-components';
import theme from '../constants/theme';

const InstructionHeader = styled.h1`
  color: ${theme.colors.red}
`

const PaddedContainer = styled.div`
  padding: 0 50px 0 50px;
`

const Instructions = ({ cancel }) => <>
  <ExitButtonContainer><ExitButton onClick={() => cancel()}>X</ExitButton></ExitButtonContainer>
  <div>
    <PaddedContainer>
      <InstructionHeader>How To Play</InstructionHeader>
      <h3>
        The game is simple. The game creator sets the number of rounds and chooses the word categories.
        <br />
        The game is player over a couple of rounds. At the beginning of every round, players get a new alphabet. Your job is to think of words that begin with that letter and fit the categories in the game.
    </h3>
      <h3>Each game round is timed at 60 seconds, but the game alsos end as soon as the first person submits their response. Think fast!</h3>
    </PaddedContainer>
    <PaddedContainer>
      <InstructionHeader>Creating A Game and Game Setup</InstructionHeader>
      <h3>Head on over to the "Create New Game" section on the previous page to create a new game. You will be able to specify the number of rounds you would like to play as well as any additional categories you would want to include besides, "Name", "Place", "Animal" and "Thing".</h3>
      <h3>You can also define "scoring mechanics". Select "Score Yourself" if you want people to score themselves, or select "Score Each Other" to score your friends. </h3>
      <h3>Once you have created the game, you will get a "Game Code". Create the room and send the Game Code to your friends who will be able to use it join the room. Once your friends have joined, the creator will be able to start the game!
  </h3>
    </PaddedContainer>
    <PaddedContainer>
      <InstructionHeader>Scoring Rules</InstructionHeader>
      <h3>Scoring Rules are simple:
    <ul>
          <li>+10 points for each unique answer</li>
          <li>+5 points for each non-unique answer</li>
          <li>+0 points for no answer</li>
        </ul>
      </h3>
    </PaddedContainer>
    <div style={{ textAlign: "center", margin: "20px" }}>
      <Button fontSize="25px" padding="15px" minWidth="220px" onClick={(event) => {
        event.preventDefault()
        cancel(false)
      }}
      >Understood, Let's Go!</Button></div>
  </div></>

export default Instructions;