
import {defaultProps} from 'recompose';
import {$Root, $TextInput, $Results, $Result} from '../AutocompletePrimitives';
import AutocompleteInjectable from './AutocompleteInjectable';

export default defaultProps({
  $Root,
  $Results,
  $Result,
  $TextInput
})(AutocompleteInjectable);