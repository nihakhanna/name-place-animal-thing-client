import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, FlexContainer, Spinner, FlexColumn } from '../StyledComponents'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  text-align: center;
`

const ScoreTable = ({ gameState, round, handleStartNextRound }) => {
  const [playerReady, setPlayerReady] = useState(false)
  return <><Container>
    {gameState.users.map(user => <div key={user.id}>
      <h2>{user.name}</h2>
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
      }}>Start Next Round</Button>}
    </FlexContainer>
  </>
}

export default ScoreTable;