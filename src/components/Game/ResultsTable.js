import React, { useState } from 'react';
import styled from 'styled-components';
import { StyledInput, Button, Spinner, FlexColumn } from '../StyledComponents'
import theme from '../../constants/theme'

const TableContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`

const StyledLabel = styled.label`
  padding: 20px 0;
`
const Container = styled.div`
  padding: 20px 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`

const Paper = styled.div`
  background: white;
  background-image:
    linear-gradient(90deg, transparent 79px, #abced4 79px, #abced4 81px, transparent 81px),
    linear-gradient(#eee .1em, transparent .1em);
  background-size: 100% 1.2em;
  height: auto;
  margin: 0 auto;
  margin-top: 30px;
  box-shadow: #9e9e9e63 6px 7px 14px 0px;
  width: auto;
  padding: 30px 30px 30px 80px;
  background-image:
  linear-gradient(90deg, transparent 49px, #abced4 49px, #abced4 51px, transparent 51px),
  linear-gradient(#eee .1em, transparent .1em);
`

const Submission = styled.span`
  color: ${theme.colors.blue}
`

const ResultsTable = ({ gameState, round, handleSubmitScore, scoreSubmitted }) => {
  const [currentScore, setCurrentScore] = useState(0);
  const categories = gameState.categories;
  return <><TableContainer>
    {gameState.users.map(user => <Paper key={user.id}>
      <h2 style={{ textAlign: 'center' }}>{user.name}</h2>
      {categories.map(category => <p key={category}>
        {category}: <Submission>{user.responses[round][category] || 'N/A'}</Submission>
      </p>)}
    </Paper>)}
  </TableContainer>
    <Container>
      {!scoreSubmitted ? <>
        <StyledLabel htmlFor="score">Enter your score:</StyledLabel>
        <StyledInput min="0" max="40" name="score" type="number" onChange={(event) => { setCurrentScore(event.target.value) }} />
        <Button onClick={(event) => {
          event.preventDefault()
          handleSubmitScore(currentScore)
        }}>Submit</Button>
      </> : <FlexColumn>
          <h2>Waiting for others</h2>
          <Spinner />
        </FlexColumn>}
    </Container>
  </>
}

export default ResultsTable;