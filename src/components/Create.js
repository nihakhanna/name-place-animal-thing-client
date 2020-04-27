import React, { useState } from 'react';
import styled from 'styled-components';
import { hri } from 'human-readable-ids';

import { Button, StyledInput, FlexColumn, FlexContainer } from './StyledComponents'
import { socket } from '../constants/websocket'
import theme from '../constants/theme'

const FormContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  text-align: center;
`

const GameCode = styled.span`
  color: ${theme.colors.red};
  font-weight: bold;
  font-size: 1.5em;
`

const CheckBoxContainer = styled.div`
  margin: 0 20px 20px 0;
`

const Create = ({ cancel, setGameData, setGamePlaying }) => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [rounds, setRounds] = useState(5);

  const gameData = {
    name, code, isAdmin: true
  }

  const handleCreateGame = (event) => {
    event.preventDefault()
    socket.emit('create', { name, code, rounds }, ({ error, users }) => {
      if (error) {
        alert(error);
      } else {
        gameData.users = users
        setGameData(gameData)
        setGamePlaying(true)
      }
    });
  }

  return (
    <FormContainer>
      <form>
        {!code ? <FlexColumn>
          <p>
            <label htmlFor="name">User Name:</label>
            <StyledInput maxLength="15" name="name" type="text" onChange={(event) => setName(event.target.value)} />
          </p>
          <h2>Select number of rounds:</h2>
          <FlexContainer>
            <CheckBoxContainer>
              <input type="radio" id="5" name="rounds" value={5} onChange={(event) => setRounds(event.target.value)} checked={rounds == 5} />
              <label htmlFor="5">5</label>
            </CheckBoxContainer>
            <CheckBoxContainer>
              <input type="radio" id="5" name="rounds" value={7} onChange={(event) => setRounds(event.target.value)} checked={rounds == 7} />
              <label htmlFor="dewey">7</label>
            </CheckBoxContainer>
            <CheckBoxContainer>
              <input type="radio" id="5" name="rounds" value={10} onChange={(event) => setRounds(event.target.value)} checked={rounds == 10} />
              <label htmlFor="louie">10</label>
            </CheckBoxContainer>
          </FlexContainer>
          <Button fontSize="25px" padding="15px" minWidth="220px" onClick={(event) => {
            event.preventDefault()
            setCode(hri.random())
          }}>Generate Game Code</Button>
        </FlexColumn>
          : <><p>
            Your Game Code is:
            <GameCode>{` `}{code}</GameCode>.
            Send it to your friends to start the game!
          </p>
            <Button fontSize="25px" padding="15px" minWidth="220px" onClick={(event) => handleCreateGame(event)}>Create Room & Enter
            </Button></>}
        <Button fontSize="25px" padding="15px" minWidth="220px" onClick={() => cancel()}>Cancel</Button>
      </form>
    </FormContainer>
  )
}

export default Create