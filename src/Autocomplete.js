import React from 'react';
import PropTypes from 'prop-types';

/**
 * Default autocomplete that maps to global styles, no significant customizability options.
 * To see alternative APIs check out the /injectable and /factory folders
 */
class Autocomplete extends React.Component {
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
      <div className="ac">
        <input
          className="ac-input"
          type="text"
          value={query}
          onChange={this.handleQueryChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
        <div className="ac-results">
          {isFocused && results.map(result => (
            <div className="ac-result"
                 onClick={() => this.handleSelect(result)}
                 key={result.key}>
              {result.label}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Autocomplete;