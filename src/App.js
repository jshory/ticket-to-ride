import React, { Component } from 'react';
import './App.css';
import Scores from './Scores';

class App extends Component {
  constructor() {
    super();

    this.state = {
      numPlayers: 2
    }

    this.setPlayerNum = this.setPlayerNum.bind(this);
  }

  setPlayerNum(event) {
    var n = Number(event.target.id);

    this.setState({
      numPlayers: n
    });
  }

  render() {
    return (
      <div className="App">
        <div className="header">
          <h1 className="title">Ticket to Ride Calculator</h1>
          <br />
          <br />
        </div>

        <div className="scores">
          <Scores numPlayers={this.state.numPlayers} />
        </div>
      </div>
    );
  }

}

export default App;