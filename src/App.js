import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Autocomplete from './Autocomplete';
import AutocompleteInjectableStyled from './injectable/AutocompleteInjectableStyled';
import AutocompleteInjectableAvatar from './injectable/AutocompleteInjectableAvatar';
import AutocompleteInjectableSvg from './injectable/AutocompleteInjectableSvg';
import AutocompleteFactoryStyled from './factory/AutocompleteFactoryStyled';
import AutocompleteFactoryAvatar from './factory/AutocompleteFactoryAvatar';

const OPTIONS = [
  {key: 'red', label: 'Red'},
  {key: 'blue', label: 'Blue'},
  {key: 'green', label: 'Green'},
];

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div style={{margin: '20px'}}>
          <strong style={{marginBottom: '10px'}}>Default</strong>
          <Autocomplete options={OPTIONS} onChange={console.log} />
        </div>
        <div style={{margin: '20px'}}>
          <strong style={{marginBottom: '10px'}}>Injectable</strong>
          <AutocompleteInjectableStyled options={OPTIONS} onChange={console.log} />
        </div>
        <div style={{margin: '20px'}}>
          <strong style={{marginBottom: '10px'}}>Injectable w/ Avatar</strong>
          <AutocompleteInjectableAvatar options={OPTIONS} onChange={console.log} />
        </div>
        <div style={{margin: '20px'}}>
          <strong style={{marginBottom: '10px'}}>Injectable w/ Svg</strong>
          <AutocompleteInjectableSvg options={OPTIONS} onChange={console.log} />
        </div>
        <div style={{margin: '20px'}}>
          <strong style={{marginBottom: '10px'}}>Factory</strong>
          <AutocompleteFactoryStyled options={OPTIONS} onChange={console.log} />
        </div>
        <div style={{margin: '20px'}}>
          <strong style={{marginBottom: '10px'}}>Factory w/ Avatar</strong>
          <AutocompleteFactoryAvatar options={OPTIONS} onChange={console.log} />
        </div>
      </div>
    );
  }
}

export default App;
