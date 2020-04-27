import React from 'react';
import styled, { keyframes } from 'styled-components'
import theme from '../constants/theme';

import spinner from '../assets/spinner.svg'

const StyledInput = styled.input`
  font-family: ${theme.font};
  margin: 10px;
  padding: 10px;
  max-width: 100px;
  min-width: 80px;
  border: 1px solid black;
  font-size: 1.2em;
`

const Button = styled.button`
  padding: ${props => props.padding || '10px 5px'};
  margin: 5px;
  min-width: ${props => props.minWidth || '150px'};
  font-size: ${props => props.fontSize || '15px'};
  background-color: ${theme.colors.blue};
  color: white;
  border: none;
  font-family: ${theme.font};
  cursor: pointer;
`

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
// Create the keyframes
const spin = keyframes`
  0% {
    transform: rotateZ(0);
  }
  100% {
    transform: rotateZ(360deg);
  }
`;

const SpinContainer = styled.div`
  height: 50px;
  width: 50px;
  animation: ${spin} 1.4s linear infinite;
`

const Spinner = () => {
  return <SpinContainer><img src={spinner} /></SpinContainer>
}

export {
  StyledInput,
  Button,
  FlexContainer,
  Spinner,
  FlexColumn
}