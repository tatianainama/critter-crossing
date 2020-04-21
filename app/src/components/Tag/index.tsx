import React from 'react';
import './styles.css';

type props = {
  children: React.ReactNode,
  color?: 'red' | 'orange'  | 'yellow' | 'pink' | 'green' | 'blue' | 'purple'
}
const Tag: React.FunctionComponent<props> = ({ children, color = 'orange' }) => {
  return (
    <span className={`cc-tag cc-tag-${color}`}>
      {children}
    </span>
  )
}

export default Tag;