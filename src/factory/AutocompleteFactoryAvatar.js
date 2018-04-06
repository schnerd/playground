import React from 'react';
import glamorous from 'glamorous';
import createAutocomplete from './AutocompleteFactory';
import {$Root, $Results, $Result, $TextInput} from '../AutocompletePrimitives';

const $Icon = glamorous.div({
  width: '10px',
  height: '10px',
  borderRadius: '10px',
  marginRight: '10px',
});

function $ResultContainer({onClick, result}) {
  return (
    <$Result css={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <$Icon css={{backgroundColor: result.key}}/>
      {' '}
      {result.label}
    </$Result>
  );
}

export default createAutocomplete({
  $Root,
  $Results,
  $ResultContainer,
  $Result,
  $TextInput
});
