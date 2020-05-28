import React, { useState } from 'react';
import styled from 'styled-components';
import theme from '../constants/theme'

import Join from './Join';
import Create from './Create';
import Play from './Game/Play';
import Instructions from './Instructions'
import Footer from './Footer'

import { Button, FlexColumn, SoundButton, SoundButtonContainer } from './StyledComponents'

const Container = styled.div`
  width: 100vw;
  display: flex;
  padding-top: 50px;
  flex-direction: column;
  font-family: ${theme.font}
`

const Header = styled.div`
 padding: 20px;
 height: 50px;
 font-size: 50px;
 text-align: center;
 margin-top: 100px;
 margin-bottom: 40px;
 @media (max-width: 500px) {
  font-size: 30px;
  height: 80px;
  margin-bottom: 0px;
  margin-top: 50px;
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
  margin-bottom: 20px;
`

const Landing = () => {
  const [showInstructions, toggleInstructions] = useState(false)
  const [showJoinForm, toggleJoinForm] = useState(false)
  const [showCreateForm, toggleCreateForm] = useState(false)
  const [isGamePlaying, setGamePlaying] = useState(false)
  const [gameData, setGameData] = useState({})
  const [soundOn, toggleSound] = useState(true);

  return (
    <Container>
      <SoundButtonContainer>
        <SoundButton onClick={() => toggleSound(!soundOn)}>
          <img alt="sound icon " height="22px" width="22px" style={{ margin: '0 auto' }} src={soundOn ? '/assets/audio.svg' : '/assets/audioOff.svg'} />
        </SoundButton>
      </SoundButtonContainer>
      {isGamePlaying ?
        <Play soundOn={soundOn} setGamePlaying={setGamePlaying} gameData={gameData} /> : showInstructions ? <Instructions cancel={toggleInstructions} /> : <>
          {!(showJoinForm || showCreateForm) &&
            <><FlexColumn>
              <Header>
                Name, Place, Animal, Thing
              </Header>
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
            </FlexColumn>
              <Footer /></>}
          {showJoinForm && <Join cancel={toggleJoinForm} setGamePlaying={setGamePlaying} setGameData={setGameData} />}
          {showCreateForm && <Create setGamePlaying={setGamePlaying} setGameData={setGameData} cancel={toggleCreateForm} />}
        </>}
    </Container>

  )
}

export default Landing