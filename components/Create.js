import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { hri } from 'human-readable-ids';

import { Button, StyledInput, FlexColumn, FlexContainer } from './StyledComponents'
import { socket } from '../constants/websocket'

const FormContainer = styled.div`
  padding: 40px;
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  text-align: center;
`

const CheckBoxContainer = styled.div`
  margin: 0 20px 20px 0;
`

const Create = ({ cancel, setGameData, setGamePlaying }) => {
  const [name, setName] = useState('');
  const [rounds, setRounds] = useState("5");
  const [scoringType, setScoringType] = useState("cross");
  const [categories, setCategories] = useState({
    Name: true,
    Place: true,
    Animal: true,
    Thing: true,
    Songs: false,
    Movies: false,
    "TV shows": false,
    Fruits: false,
    Vegetables: false,
    Books: false,
    Subjects: false,
    Celebrities: false,
    Musicians: false,
    Instruments: false
  })

  // Monzo easter egg
  useEffect(() => {
    if (name === "Monzo") {
      setCategories(Object.assign({}, categories, {
        "Office Dog Breeds": false,
        "Meeting Rooms": false,
        "Badge Types": false,
        "Activity Types": false,
        "Engineers": false,
        "Data Scientists": false
      }))
    }

  }, [name])

  const categoriesArray = Object.keys(categories);

  const options = ["5", "7", "10"]
  const gameData = {
    name, isAdmin: true
  }

  const handleCreateGame = (code) => {
    let cats = [];
    categoriesArray.forEach(cat => {
      if (categories[cat]) cats.push(cat);
    });

    socket.emit('create', { name, code, rounds, categories: cats, scoringType }, ({ error, users }) => {
      if (error) {
        gtag('event', 'create_error', {
          error
        })
        alert(error);
      } else {
        gameData.code = code;
        gameData.users = users;
        gameData.maxRounds = Number(rounds);
        gameData.categories = cats;
        setGameData(gameData)
        setGamePlaying(true)
      }
    });
  }

  let disabled = !name || !checkAtleastOneSelected(categoriesArray, categories)

  return (
    <FormContainer>
      <form>
        <FlexColumn>
          <p>
            <label htmlFor="name">Your Name:</label>
            <StyledInput maxLength="15" name="name" type="text" onChange={(event) => setName(event.target.value)} />
          </p>
          <h2>Select number of rounds:</h2>
          <FlexContainer>
            {options.map(option => <CheckBoxContainer key={option}>
              <input type="radio" id={option} name="rounds" value={option} onChange={(event) => setRounds(event.target.value)} checked={rounds === option} />
              <label htmlFor={option}>{option}</label>
            </CheckBoxContainer>)}
          </FlexContainer>
          <h2>Select categories:</h2>
          <FlexContainer style={{ maxWidth: "450px" }}>
            {categoriesArray.map(cat => <CheckBoxContainer key={cat}>
              <input type="checkbox" id={cat} name="categories" onChange={(event) => {
                setCategories(Object.assign({}, categories, { [cat]: event.target.checked }))
              }} checked={categories[cat]} />
              <label htmlFor={cat}>{cat}</label>
            </CheckBoxContainer>)}
          </FlexContainer>
          <h2>Scoring Rules:</h2>
          <FlexContainer>
            <CheckBoxContainer>
              <input type="radio" id="cross" name="scoring" value="cross" onChange={(event) => setScoringType(event.target.value)} checked={scoringType === "cross"} />
              <label htmlFor="cross">Score Each Other</label>
            </CheckBoxContainer>
            <CheckBoxContainer key="self">
              <input type="radio" id="self" name="scoring" value="self" onChange={(event) => setScoringType(event.target.value)} checked={scoringType === "self"} />
              <label htmlFor="self">Score Yourself</label>
            </CheckBoxContainer>

          </FlexContainer>
          <Button disabled={disabled} fontSize="25px" padding="15px" minWidth="220px" onClick={(event) => {
            gtag('event', 'create_room', {
              categories: categoriesArray.join(','),
              rounds: rounds
            });
            event.preventDefault()
            let code = hri.random();
            handleCreateGame(code);
          }}>Create Room</Button>
        </FlexColumn>
        <Button fontSize="25px" padding="15px" minWidth="220px" onClick={() => cancel()}>Cancel</Button>
      </form>
    </FormContainer>
  )
}


const checkAtleastOneSelected = (categoriesList, categories) => {
  let enableButton = false;
  categoriesList.forEach(category => {
    if (categories[category]) {
      enableButton = true;
    }
  })
  return enableButton
}

export default Create