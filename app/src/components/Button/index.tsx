import React from 'react';

import './styles.css';

interface props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children: string,
  color?: 'link' | 'primary' | 'secondary',
}

const Button: React.FunctionComponent<props> = (props) => {
  const color = props.color || 'secondary';
  return (
    <button  className={`cc-button cc-button-${color} ${props.className || ''}`} {...props} >
      {props.children}
    </button>
  )
}

export default Button;