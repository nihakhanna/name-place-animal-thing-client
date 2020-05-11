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
        The game is simple. The game creator sets the number of rounds and chooses the word categories. At the beginning of every round you get a new letter. Your job is to think of a word starting with that letter which fits each category in the game, and note in down.
    </h3>
      <h3>Each game round is times at 60 seconds, but the game will also end as soon as the first person submits their responses. Think fast!</h3>
    </PaddedContainer>
    <PaddedContainer>
      <InstructionHeader>Creating A Game and Game Setup</InstructionHeader>
      <h3>Head on over to the "Create New Game" section on the previous page to create a new game. You will be able to specify the number of rounds you would like to play as well as any additional categories you would want to include besides, "name", "place", "animal" and "thing".</h3>
      <h3>Once you have created the game, you will get a "Game Code". Create the room and send the Game Code to your friends who will be able to use it join the room. Once your friends have joined, the creator will be able to start the game!
  </h3>
    </PaddedContainer>
    <PaddedContainer>
      <InstructionHeader>Scoring Rules</InstructionHeader>
      <h3>
        This game relies on a bit of self scoring (but don't worry, you will be able to see your friends' responses and scores - yes I don't trust my friends either).</h3>
      <h3>Scoring Rules Work in a simple way:
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