import React from 'react';
import styled from 'styled-components'
import theme from '../constants/theme';

const StyledInput = styled.input`
  font-family: ${theme.font};
  margin: 10px;
  padding: 10px;
  max-width: 100px;
  border: 1px solid black;
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

export {
  StyledInput,
  Button
}