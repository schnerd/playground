import React from 'react';
import {defaultProps} from 'recompose';
import AutocompleteInjectable from './AutocompleteInjectable';

function $Root({children}) {
  return (
    <svg width="300" height="30" style={{display: 'block', margin: 'auto', overflow: 'visible', position: 'relative', zIndex: '9001'}}>
      {children}
    </svg>
  );
}

function $TextInput({type, value, onChange, onFocus, onBlur}) {
  return (
    <a xlinkHref="#" onFocus={onFocus} onBlur={onBlur}>
      <rect width="300" height="30" stroke="#ccc" fill="#fff"/>
      <text dy="20" dx="10">{value}</text>
    </a>
  )
}

function $Results({children}) {
  return (
    <g transform="translate(0, 30)">{children}</g>
  )
}

function $ResultContainer({onClick, result, index}) {
  return (
    <g transform={`translate(0, ${index * 30})`}>
      <rect width="300" height="30" stroke="#ccc" fill="white" onClick={() => onClick(result)}/>
      <text dy="20" dx="10">{result.label}</text>
    </g>
  );
}

export default defaultProps({
  $Root,
  $TextInput,
  $Results,
  $ResultContainer,
})(AutocompleteInjectable);