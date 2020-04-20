import React, { useState } from 'react';
import styled from 'styled-components';
import theme from '../constants/theme'

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

const FormItem = styled.p`
`

const Join = ({ cancel, setGameData, setGamePlaying }) => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');

  const gameData = {
    name, code, isAdmin: false
  }

  return (
    <FormContainer>
      <form>
        <FormItem>
          <label htmlFor="name">User Name:</label>
          <StyledInput maxLength="15" name="name" type="text" onChange={(event) => setName(event.target.value)} />
        </FormItem>
        <FormItem>
          <label for="name">Room Code:</label>
          <StyledInput maxLength="20" type="text" onChange={(event) => setCode(event.target.value)} />
        </FormItem>
        <Button onClick={() => {
          setGameData(gameData)
          setGamePlaying(true)
        }} type="submit">Join Your Friends!</Button>
        <Button onClick={() => cancel()} type="submit">Cancel</Button>
      </form>
    </FormContainer>
  )
}

export default Join