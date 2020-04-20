import React from 'react';
import styled from 'styled-components';
import theme from '../constants/theme'

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  font-size: 15px;
`

const Button = styled.button`
  padding: 5px;
  margin: 5px;
  min-width: 150px;
  font-size: 15px;
  background-color: ${theme.buttonBlue};
  color: white;
  border: none;
  font-family: ${theme.font};
  cursor: pointer;
`

const GameHeader = ({ roundNumber }) => {
  return <Container>
    <div>{`Round #${roundNumber}`}</div>
    <Button>Exit Game</Button>
  </Container>
}

export default GameHeader;