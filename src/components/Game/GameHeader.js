import React from 'react';
import styled from 'styled-components';
import timerImage from '../../assets/timer.png'

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  font-size: 15px;
  @media(max-width: 500px) {

  }
`

const TimerValue = styled.span`
  position: relative;
  top: 48px;
`

const TimerContainer = styled.div`
  background-image: url(${timerImage});
  height: 100px;
  background-size: 100px;
  width: 100px;
  text-align: center;
  font-size: 1.3em;
`

const RoundContainer = styled.div`
  font-size: 1.8em;
  position: relative;
  top: 30px;
  @media(max-width: 500px) {
    font-size: 1em;
  }
  display: flex;
  flex-direction: column;
`

const BoldContent = styled.span`
  color: red;
  font-weight: bold;
  font-size: 1.2em;
`

const GameHeader = ({ roundNumber, timerValue, currentAlphabet }) => {
  return <Container>
    <RoundContainer>
      <span>Round <BoldContent>{`#${roundNumber}`}</BoldContent></span>
      <span>Current Alphabet: <BoldContent>{currentAlphabet || 'Not Selected'}</BoldContent></span>
    </RoundContainer>
    <TimerContainer><TimerValue>{timerValue}</TimerValue></TimerContainer>
  </Container>
}

export default GameHeader;