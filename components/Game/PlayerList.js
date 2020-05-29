import React from 'react';
import styled, { keyframes } from 'styled-components';
import theme, { avatars } from '../../constants/theme'
import { FlexContainer } from '../StyledComponents'

const ActivePlayers = ({ users, gameStarted, code }) => {
  const width = gameStarted ? 30 : 60;
  const height = width;

  return <>
    {!gameStarted && <div style={{ textAlign: "center", padding: "20px 20px 20px 20px" }}><p>
      Your Game Code is:
            <GameCode>{` `}{code}</GameCode>. Send it to your friends to start the game!
          </p>
    </div>}
    <Container>
      {!gameStarted && <h1>Who's Playing?</h1>}
      <FlexContainer>{
        users.map((user, i) => <UserContainer gameStarted={gameStarted} key={user.id}>
          <img alt={`${user.name} avatar`} width={width} height={height} src={avatars[user.avatarIndex || i]} />
          {gameStarted && <h4>{user.name}</h4>}
          {!gameStarted && <h2>{user.name}</h2>}
        </UserContainer>)
      }</FlexContainer></Container></>
}

// Styles
const Container = styled.div`
  text-align: center;
  color: ${theme.colors.red}
`
// Create the keyframes
const flicker = keyframes`
  from {
    transform: rotate(-2deg);
  }

  to {
    transform: rotate(8deg);
  }
`;


const GameCode = styled.span`
  color: ${theme.colors.red};
  font-weight: bold;
  font-size: 1.5em;
`

const UserContainer = styled.div`
  display: flex;
  animation: ${props => !props.gameStarted && flicker} 1s cubic-bezier(1,-1, 0, 2) infinite;
  flex-direction: column;
  align-items: center;
  margin: 0 20px;
  color: black;
`

export default ActivePlayers;