import React, { useState } from 'react';
import styled from 'styled-components';
import theme from '../constants/theme';
import { hri } from 'human-readable-ids';

import StyledInput from './StyledComponents'

const FormContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  text-align: center;
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

const GameCode = styled.span`
  color: red;
  font-weight: bold;
  font-size: 1.5em;
`

const Create = ({ cancel, setGameData, setGamePlaying }) => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');

  const gameData = {
    name, code, isAdmin: true
  }

  return (
    <FormContainer>
      <form>
        {!code ? <>
          <p>
            <label htmlFor="name">User Name:</label>
            <StyledInput maxLength="15" name="name" type="text" onChange={(event) => setName(event.target.value)} />
          </p>
          <Button onClick={(event) => {
            event.preventDefault()
            setCode(hri.random())
          }}>Generate Game Code</Button>
        </>
          : <><p>
            Your Game Code is:
            <GameCode>{` `}{code}</GameCode>.
          Send it to your friends to start the game!
          </p>
            <Button onClick={(event) => {
              event.preventDefault()
              setGameData(gameData)
              setGamePlaying(true)
            }}>Enter Room
            </Button></>}
        <Button onClick={() => cancel()}>Cancel</Button>
      </form>
    </FormContainer>
  )
}

export default Create