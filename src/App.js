import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';

class App extends Component {

  state = {
    showMessage: false
  }
  onButtonClickHandler = () => {
    this.setState({ showMessage: !this.state.showMessage });
  };

  render() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="App">
            {this.state.showMessage && <p>Here is a simple Hello World React App Deployed by CircleCI</p>}
            <button data-testid="btn" onClick={this.onButtonClickHandler}>Enter</button>
        </div>
      </header>
    </div>
  );
}
}

export default App;