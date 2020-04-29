import React, { useState } from 'react';
import styled from 'styled-components';
import theme from '../constants/theme'

import Join from './Join';
import Create from './Create';
import Play from './Game/Play';

import { Button, ExitButton, ExitButtonContainer } from './StyledComponents'

const InstructionHeader = styled.h2`
  color: ${theme.colors.red}
`

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: ${theme.font}
`

const IntroContainer = styled.div`
  text-align: center;
`

const Header = styled.div`
 padding: 20px;
 height: 100px;
 font-size: 50px;
 text-align: center;
 margin-top: 50px;
 @media (max-width: 768px) {
  font-size: 30px;
  height: 80px;
}
`

const ButtonContainer = styled.div`
width: 100%;
display: flex;
align-items: center;
justify-content: center;
height: 100%;
flex-direction: column;
`

const TopButtonContainer = styled.div`
width: 100%;
align-items: center;
justify-content: center;
flex-direction: column;
`

const Footer = styled.div`
  height: 50px;
`

const PaddedContainer = styled.div`
  padding: 0 50px 0 50px;
`

const Landing = () => {
  const [showInstructions, toggleInstructions] = useState(false)
  const [showJoinForm, toggleJoinForm] = useState(false)
  const [showCreateForm, toggleCreateForm] = useState(false)
  const [isGamePlaying, setGamePlaying] = useState(false)
  const [gameData, setGameData] = useState({})

  return (
    <Container>
      <Header>
        Name, Place, Animal, Thing
      </Header>
      {isGamePlaying ?
        <Play
          setGamePlaying={setGamePlaying} gameData={gameData} /> : showInstructions ? <Instructions cancel={toggleInstructions} /> : <>
            {!(showJoinForm || showCreateForm) &&
              <IntroContainer>
                <TopButtonContainer>
                  <Button fontSize="25px" padding="15px" minWidth="220px" onClick={() => toggleInstructions(true)}>How To Play</Button>
                </TopButtonContainer>
                <ButtonContainer>
                  <Button fontSize="25px" padding="15px" minWidth="220px" onClick={(event) => {
                    event.preventDefault()
                    toggleJoinForm(true)
                    toggleCreateForm(false)
                  }}
                  >Join Existing Game</Button>
                  <Button fontSize="25px" padding="15px" minWidth="220px" onClick={(event) => {
                    event.preventDefault()
                    toggleJoinForm(false)
                    toggleCreateForm(true)
                  }}>Create New Game</Button>
                </ButtonContainer>
              </IntroContainer>}
            {showJoinForm && <Join cancel={toggleJoinForm} setGamePlaying={setGamePlaying} setGameData={setGameData} />}
            {showCreateForm && <Create setGamePlaying={setGamePlaying} setGameData={setGameData} cancel={toggleCreateForm} />}
          </>}
      <Footer></Footer>
    </Container>

  )
}


const Instructions = ({ cancel }) => <>
  <ExitButtonContainer><ExitButton onClick={() => cancel()}>X</ExitButton></ExitButtonContainer>
  <div>
    <PaddedContainer>
      <InstructionHeader>Creating A Game and Game Setup</InstructionHeader>
      <p>Head on over to the "Create New Game" section on the previous page to create a new game. You will be able to specify the number of rounds you would like to play as well as any additional categories you would want to include besides, "name", "place", "animal" and "thing".</p>
      <p>Once you have created the game, you will get a "Game Code". Create the room and send the Game Code to your friends who will be able to use it join the room. Once your friends have joined, the creator will be able to start the game!
    </p>
    </PaddedContainer>
    <PaddedContainer>
      <InstructionHeader>How To Play</InstructionHeader>
      <p>
        The game is simple. The game creator sets the number of rounds and chooses the word categories. At the beginning of every round you get a new letter. Your job is to think of a word starting with that letter for each category in the game.
      </p>
      <p>Each game round is times at 60 seconds, but the game will also end as soon as the first person submits their responses. Think fast!</p>
    </PaddedContainer>
    <PaddedContainer>
      <InstructionHeader>Scoring Rules</InstructionHeader>
      <p>
        This game relies on a bit of self scoring (but don't worry, you will be able to see your friends' responses and scores - yes I don't trust my friends either).</p>
      <p>Scoring Rules Work in a simple way:
      <ul>
          <li>+10 points for each unique answer</li>
          <li>+5 points for each non-unique answer</li>
          <li>+0 points for no answer</li>
        </ul>
        Make your own rules! Negative marking never hurt anybody 😉.
    </p>
    </PaddedContainer>
    <div style={{ textAlign: "center", margin: "20px" }}>
      <Button fontSize="25px" padding="15px" minWidth="220px" onClick={(event) => {
        event.preventDefault()
        cancel(false)
      }}
      >Understood, Let's Go!</Button></div>
  </div></>

export default Landing