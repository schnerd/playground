import {$Root, $TextInput, $Results, $Result} from '../AutocompletePrimitives';
import createAutocomplete from './AutocompleteFactory';

function createStyledAutocomplete(overrides = {}) {
  return createAutocomplete({
    $Root,
    $Results,
    $Result,
    $TextInput,
    ...overrides
  });
}

export {createStyledAutocomplete};

export default createStyledAutocomplete({});
