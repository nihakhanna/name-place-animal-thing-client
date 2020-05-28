import React from 'react';

import { avatars } from '../../constants/theme'
import { Button, FlexContainer, FlexColumn } from '../StyledComponents'

const FinalScreen = ({ scores, handleRestartGame }) => {
  let winner = {
    score: 0,
  };
  scores.forEach(score => {
    if (score.score > winner.score) winner = {
      score: score.score,
      name: score.name
    }
  })


  return <FlexColumn>
    <h2>Final Scores</h2>
    <FlexContainer>
      {scores.map(user => {
        return <div style={{ margin: "0 20px", textAlign: "center" }} key={user.name}>
          <img alt={`${user.name} avatar`} src={avatars[user.avatarId]} width={60} height={60} />
          <p>{user.name}: {user.score}</p>
        </div>
      })
      }
    </FlexContainer>
    <h2 style={{ textAlign: "center" }}>{`🎉🎉 The winner is: ${winner.name || 'No winner!'} 🎉🎉`}</h2>
    {<Button fontSize="25px" padding="15px" minWidth="220px" onClick={(event) => {
      gtag('event', 'play_again');
      event.preventDefault()
      handleRestartGame(event)
    }}>Play Again</Button>}
  </FlexColumn >
}

export default FinalScreen