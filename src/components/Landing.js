import React, { useState } from 'react';
import styled from 'styled-components';
import theme from '../constants/theme'

import Join from './Join';
import Create from './Create';
import Play from './Play';


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
 font-size: 50px;
 text-align: center;
 @media (max-width: 768px) {
  font-size: 30px;
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

const Button = styled.button`
  padding: 15px;
  margin: 5px;
  min-width: 220px;
  font-size: 25px;
  background-color: ${theme.buttonBlue};
  color: white;
  border: none;
  font-family: ${theme.font};
  cursor: pointer;
`

const Footer = styled.div`
  height: 50px;
`

const Instructions = () => <></>

const Landing = () => {
  const [showInstructions, toggleInstructions] = useState(false)
  const [showJoinForm, toggleJoinForm] = useState(false)
  const [showCreateForm, toggleCreateForm] = useState(false)
  const [isGamePlaying, setGamePlaying] = useState(false)
  const [gameData, setGameData] = useState({})

  return (
    <Container>
      <Header>
        <p>Name, Place, Animal, Thing</p>
      </Header>
      {isGamePlaying ? <Play gameData={gameData} /> : showInstructions ? <Instructions /> : <>
        {!(showJoinForm || showCreateForm) &&
          <IntroContainer>
            <TopButtonContainer>
              <Button onClick={() => toggleInstructions(true)}>How To Play</Button>
            </TopButtonContainer>
            <ButtonContainer>
              <Button onClick={(event) => {
                event.preventDefault()
                toggleJoinForm(true)
                toggleCreateForm(false)
              }}
              >Join Existing Game</Button>
              <Button onClick={(event) => {
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

export default Landing