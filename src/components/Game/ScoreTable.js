import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, FlexContainer, Spinner, FlexColumn } from '../StyledComponents'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  text-align: center;
  font-size: 1.5em;
`

const ScoreTable = ({ maxRounds, gameState, round, handleStartNextRound }) => {
  const [playerReady, setPlayerReady] = useState(false)
  return <><Container>
    {gameState.users.map(user => <div key={user.id}>
      <h3>{user.name}</h3>
      <p>{user.scores[round]}</p>
    </div>)}
  </Container>
    <FlexContainer>
      {playerReady ? <>
        <FlexColumn>
          <h2>Waiting for others</h2>
          <Spinner />
        </FlexColumn>
      </> : <Button onClick={() => {
        setPlayerReady(true)
        handleStartNextRound()
      }}>{round === maxRounds ? 'See Final Scores 🤩' : 'Start Next Round'}</Button>}
    </FlexContainer>
  </>
}

export default ScoreTable;