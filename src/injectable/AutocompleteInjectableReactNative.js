import {defaultProps} from 'recompose';
import AutocompleteInjectable from './AutocompleteInjectable';
import {View, Text, TextInput} from 'react-native';

const $Root = View;
const $TextInput = TextInput;
const $Results = View;
const $Result = Text;

export default defaultProps({
  $Root,
  $TextInput,
  $Results,
  $Result,
})(AutocompleteInjectable);