import React, { useState } from 'react';

import './styles.css';

interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  handleChange: (str: string) => void,
  label?: string,
  value?: string,
}
const Input: React.FunctionComponent<InputProps> = ({value, label, handleChange, ...rest}) => {
  const [ text, setText ] = useState(value || '');

  const handler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
    handleChange(event.target.value);
  }

  return (
    <input className={'cc-input'} value={text} onChange={handler} {...rest}/>
  )
}

export default Input;