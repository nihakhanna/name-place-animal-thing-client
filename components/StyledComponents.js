import React from 'react';
import styled, { keyframes } from 'styled-components'
import theme from '../constants/theme';

const StyledInput = styled.input`
  font-family: ${theme.font};
  margin: 10px;
  padding: 10px;
  max-width: 100px;
  min-width: ${props => props.minWidth || '80px'};
  border: 1px solid black;
  font-size: 1.2em;
`

const Button = styled.button`
  padding: ${props => props.padding || '10px 5px'};
  margin: 5px;
  min-width: ${props => props.minWidth || '150px'};
  font-size: ${props => props.fontSize || '15px'};
  color: white;
  border: none;
  background-color: ${props => props.disabled ? 'grey' : theme.colors.blue};
  font-family: ${theme.font};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
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

const ExitButtonContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  margin: 20px;
`

const ExitButton = styled.button`
  font-size: 15px;
  color: ${theme.colors.red};
  padding: 5px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border: 1px solid ${theme.colors.red};
  box-shadow: ${theme.colors.red} 2px 2px 0px 0px;
  border-radius: 20px;
  font-family: 'Schoolbell', cursive;
`

const SoundButtonContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  margin: 20px;
  z-index: 9999;
`

const SoundButton = styled.button`
  font-size: 15px;
  color: ${theme.colors.red};
  padding: 5px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border: 1px solid ${theme.colors.red};
  box-shadow: ${theme.colors.red} 2px 2px 0px 0px;
  border-radius: 20px;
  font-family: 'Schoolbell', cursive;
  display: flex;
`

const Spinner = () => {
  return <SpinContainer><img alt="loading spinner" src='/assets/spinner.svg' /></SpinContainer>
}

export {
  StyledInput,
  Button,
  FlexContainer,
  Spinner,
  FlexColumn,
  ExitButtonContainer,
  ExitButton,
  SoundButtonContainer,
  SoundButton
}