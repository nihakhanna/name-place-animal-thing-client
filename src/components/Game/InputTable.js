import React, { useState } from 'react';
import styled from 'styled-components';

import { StyledInput, Button } from '../StyledComponents'

const TableContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  @media (max-width: 768px) {
    width: min-content;
  }
`

const Paper = styled.div`
  background: white;
  background-image:
    linear-gradient(90deg, transparent 79px, #abced4 79px, #abced4 81px, transparent 81px),
    linear-gradient(#eee .1em, transparent .1em);
  background-size: 100% 1.2em;
  width: 480px;
  height: auto;
  padding: 30px 30px 30px 110px;
  margin: 0 auto;
  margin-top: 50px;
  box-shadow: #9e9e9e70 11px 8px 12px;
  @media (max-width: 768px) {
    box-shadow: gray 0px 0px;
    width: 180px;
    padding: 30px 30px 30px 80px;
    background-image:
    linear-gradient(90deg, transparent 49px, #abced4 49px, #abced4 51px, transparent 51px),
    linear-gradient(#eee .1em, transparent .1em);
  }
  text-align: center;
`

const InputTable = ({ sendResponse, timerValue, categories }) => {
  const [response, setResponse] = useState({});

  if (timerValue === 60) {
    sendResponse(response)
  }
  return <Paper>
    <form>
      <TableContainer>
        {categories.map(cat => <span key={cat}>
          <label style={{ display: 'none' }} htmlFor={cat}>{`${cat}:`}</label>
          <StyledInput placeholder={cat} maxLength="30" name={cat} type="text" onChange={(event) => {
            setResponse(Object.assign({}, response, { [cat]: event.target.value }))
          }} />
        </span>)}
      </TableContainer>
      <Button onClick={(event) => {
        event.preventDefault()
        sendResponse(response)
      }}>Submit Response</Button>
    </form>
  </Paper>
}

export default InputTable;