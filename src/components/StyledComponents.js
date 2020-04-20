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


const exportedComponents = {
  StyledInput
}

export default StyledInput