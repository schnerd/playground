/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * Autocomplete implementation that is decoupled from any DOM or Styling
 * See AutocompleteInjectableStyled for example of injecting DOM+Styles
 */
export default class AutocompleteInjectable extends React.Component {
  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.object),
    onChange: PropTypes.func.isRequired,
    $Root: PropTypes.func.isRequired,
    $Results: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
    $Result: PropTypes.func.isRequired,
    $TextInput: PropTypes.func.isRequired,
  };

  state = {
    query: '',
    isFocused: false,
  };

  handleQueryChange = evt => {
    this.setState({query: evt.target.value});
  };

  handleFocus = () => {
    this.setState({isFocused: true, query: ''});
  };

  handleBlur = () => {
    setTimeout(() => {
      this.setState({isFocused: false});
    }, 200);
  };

  handleSelect = result => {
    this.setState({query: result.label});
    this.props.onChange(result);
  };

  getFilteredResults() {
    const {query} = this.state;
    return this.props.options.filter(
        o => o.label.toLowerCase().indexOf(query) >= 0
    );
  }

  render() {
    const {query, isFocused} = this.state;
    const {$Root, $TextInput, $Results, $Result, $ResultContainer = AutocompleteResultContainer} = this.props;
    const results = this.getFilteredResults();
    return (
      <$Root>
        <$TextInput 
          className="ac-input"
          type="text"
          value={query}
          onChange={this.handleQueryChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
        <$Results>
          {isFocused && results.map((result, index) => (
            <$ResultContainer
              index={index}
              result={result}
              onClick={this.handleSelect}
              key={result.key}
              $Result={$Result}
            />
          ))}
        </$Results>
      </$Root>
    );
  }
}

export class AutocompleteResultContainer extends React.Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    result: PropTypes.object,
    $Result: PropTypes.func.isRequired,
  };

  render() {
    const {onClick, result, $Result} = this.props;
    return (
      <$Result onClick={() => onClick(result)}>{result.label}</$Result>
    )
  }
}