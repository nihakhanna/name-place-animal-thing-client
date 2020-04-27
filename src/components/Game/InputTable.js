import React, { useState } from 'react';
import styled from 'styled-components';

import { StyledInput, Button } from '../StyledComponents'

const TableContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  @media (max-width: 768px) {
    width: min-content;
  }
`

const Paper = styled.div`
  background: white;
  background-image:
    linear-gradient(90deg, transparent 79px, #abced4 79px, #abced4 81px, transparent 81px),
    linear-gradient(#eee .1em, transparent .1em);
  background-size: 100% 1.2em;
  width: 480px;
  height: auto;
  padding: 30px 30px 30px 110px;
  margin: 0 auto;
  margin-top: 30px;
  box-shadow: 4px 16px 8px rgba(#566270, .1);
  transform: rotate(-4deg);
  @media (max-width: 768px) {
    transform: rotate(0deg);
    width: 180px;
    padding: 30px 30px 30px 80px;
    background-image:
    linear-gradient(90deg, transparent 49px, #abced4 49px, #abced4 51px, transparent 51px),
    linear-gradient(#eee .1em, transparent .1em);
  }
  text-align: center;
`

const InputTable = ({ sendResponse, timerValue }) => {
  // Current game state 
  const [currentName, setCurrentName] = useState('');
  const [currentAnimal, setCurrentAnimal] = useState('');
  const [currentPlace, setCurrentPlace] = useState('');
  const [currentThing, setCurrentThing] = useState('');

  if (timerValue === 60) {
    sendResponse({ currentName, currentPlace, currentAnimal, currentThing })
  }
  return <Paper><TableContainer>
    <span>
      <label style={{ display: 'none' }} htmlFor="name">Name:</label>
      <StyledInput placeholder="Name" maxLength="15" name="name" type="text" onChange={(event) => { setCurrentName(event.target.value) }} />
    </span>
    <span>
      <label style={{ display: 'none' }} htmlFor="place">Place:</label>
      <StyledInput placeholder="Place" maxLength="15" name="place" type="text" onChange={(event) => { setCurrentPlace(event.target.value) }} />
    </span>
    <span>
      <label style={{ display: 'none' }} htmlFor="animal">Animal:</label>
      <StyledInput placeholder="Animal" maxLength="15" name="animal" type="text" onChange={(event) => { setCurrentAnimal(event.target.value) }} />
    </span>
    <span>
      <label style={{ display: 'none' }} htmlFor="thing">Thing:</label>
      <StyledInput placeholder="Thing" maxLength="15" name="thing" type="text" onChange={(event) => { setCurrentThing(event.target.value) }} />
    </span>
  </TableContainer>
    <Button onClick={(event) => {
      event.preventDefault()
      sendResponse({ currentName, currentPlace, currentAnimal, currentThing })
    }}>Submit Response</Button></Paper>
}

export default InputTable;