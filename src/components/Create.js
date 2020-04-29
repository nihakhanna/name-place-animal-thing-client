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
  const [rounds, setRounds] = useState("5");
  const [categories, setCategories] = useState({
    Songs: false,
    Movies: false,
    "TV shows": false,
    Fruits: false,
    Vegetables: false,
    Books: false,
    Subjects: false
  })

  const options = ["5", "7", "10"]
  const gameData = {
    name, code, isAdmin: true
  }

  const handleCreateGame = (event) => {
    event.preventDefault()
    let cats = [];
    Object.keys(categories).forEach(cat => {
      if (categories[cat]) cats.push(cat);
    });

    // Don't hardcode, but always default to name, place, animal, thing
    cats = ['Name', 'Place', 'Animal', 'Thing', ...cats];
    socket.emit('create', { name, code, rounds, categories: cats }, ({ error, users }) => {
      if (error) {
        alert(error);
      } else {
        gameData.users = users;
        gameData.maxRounds = Number(rounds);
        gameData.categories = cats;
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
            <label htmlFor="name">Name:</label>
            <StyledInput maxLength="15" name="name" type="text" onChange={(event) => setName(event.target.value)} />
          </p>
          <h2>Select number of rounds:</h2>
          <FlexContainer>
            {options.map(option => <CheckBoxContainer key={option}>
              <input type="radio" id={option} name="rounds" value={option} onChange={(event) => setRounds(event.target.value)} checked={rounds === option} />
              <label htmlFor={option}>{option}</label>
            </CheckBoxContainer>)}
          </FlexContainer>
          <h2>Select additional categories:</h2>
          <FlexContainer>
            {Object.keys(categories).map(cat => <CheckBoxContainer key={cat}>
              <input type="checkbox" id={cat} name="categories" onChange={(event) => {
                setCategories(Object.assign({}, categories, { [cat]: event.target.checked }))
              }} checked={categories[cat]} />
              <label htmlFor={cat}>{cat}</label>
            </CheckBoxContainer>)}
          </FlexContainer>
          <Button disabled={!name} fontSize="25px" padding="15px" minWidth="220px" onClick={(event) => {
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