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
    // var players = [];

    // for (var i = 0; i < this.state.numPlayers; i++) {
    //   players.push(<Player key={i} numberOfPlayers={this.state.numPlayers} playerNum={i + 1} />);
    // }

    return (
      <div className="App">
        <div className="header">
          <h1 className="title">Ticket to Ride Calculator</h1>
          {/* <h2>Select number of players and start totalling your scores!</h2> */}

          {/* <button id="2" className={`number-button ${this.state.numPlayers === 2 ? 'active' : ''}`} onClick={this.setPlayerNum}>2</button>
          <button id="3" className={`number-button ${this.state.numPlayers === 3 ? 'active' : ''}`} onClick={this.setPlayerNum}>3</button>
          <button id="4" className={`number-button ${this.state.numPlayers === 4 ? 'active' : ''}`} onClick={this.setPlayerNum}>4</button>
          <button id="5" className={`number-button ${this.state.numPlayers === 5 ? 'active' : ''}`} onClick={this.setPlayerNum}>5</button> */}
          <br />
          <br />
        </div>

        <div className="scores">
          <Scores numPlayers={this.state.numPlayers} />
        </div>
        {/* <div className="player-scores">
          {players}
        </div> */}

      </div>
    );
  }

}

export default App;