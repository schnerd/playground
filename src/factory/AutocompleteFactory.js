/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import PropTypes from 'prop-types';

/**
 * The factory approach is kind of the like the injection approach, however it returns
 * a new instance of the component that is bound to the components passed into the factory
 * rather than via props.
 * 
 * Issues:
 * - Lets say I create MyAutocomplete by passing in some styled-elements, in order to allow
 *   people to further customize MyAutocomplete with other components, I too would have to
 *   expose a factory, that in-turn calls the createAutocomplet factory. So its a more
 *   complicated API for mulitple levels of overrides
 * - Might break things like instanceof since we're returning a new class definition each time?
 */
function createAutocomplete({
  $Root,
  $Results,
  $Result,
  $TextInput,
  $ResultContainer = AutocompleteResultContainer,
}) {
  return class ForgedAutocomplete extends React.Component {
    static propTypes = {
      options: PropTypes.arrayOf(PropTypes.object),
      onChange: PropTypes.func.isRequired,
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
            {isFocused && results.map(result => (
              <$ResultContainer
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

export default createAutocomplete;