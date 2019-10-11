import React, { Component } from 'react';
import './Scores.css';
import Player from './Player';

class Scores extends Component {
    constructor(props) {
        super(props);

        var playerNames = [];
        for (var i = 0; i < this.props.numPlayers; i++) {
            playerNames.push("Player " + (i + 1));
        }

        var playerScores = [];
        for (var j = 0; j < this.props.numPlayers; j++) {
            playerScores.push(0);
        }

        this.state = {
            numPlayers: 2,
            names: playerNames,
            scores: playerScores,
            activePlayer: 0
        }

        this.addPlayer = this.addPlayer.bind(this);
        this.deletePlayer = this.deletePlayer.bind(this);
        this.updateActivePlayer = this.updateActivePlayer.bind(this);
        this.updateName = this.updateName.bind(this);
        this.updateScore = this.updateScore.bind(this);
    }

    addPlayer() {
        if (this.state.numPlayers < 5) {
            var addNames = [...this.state.names];
            var addScores = [...this.state.scores];
            var newName = "Player " + (this.state.numPlayers + 1);
            addNames.push(newName);
            var newScore = 0;
            addScores.push(newScore);

            this.setState({
                numPlayers: this.state.numPlayers + 1,
                names: addNames,
                scores: addScores
            })
        } else {
            alert("5 Player Maximum");
        }
    }

    deletePlayer() {
        if (this.state.numPlayers > 2) {
            var removeNames = [...this.state.names];
            var removeScores = [...this.state.scores];
            removeNames.pop();
            removeScores.pop();

            this.setState({
                numPlayers: this.state.numPlayers - 1,
                names: removeNames,
                scores: removeScores,
                activePlayer: 0
            })
        }
    }

    updateActivePlayer(event) {
        console.log(event.target);
        var n = Number(event.target.id);

        this.setState({
            activePlayer: n
        })
    }

    updateName = (playerNum, n) => {
        let updatedNames = [...this.state.names];
        let thisName = { ...updatedNames[playerNum] };
        thisName = n;

        if (thisName.trim() !== "") {
            updatedNames[playerNum] = thisName;

            this.setState({
                names: updatedNames
            })
        } else {
            updatedNames[playerNum] = "Player " + (playerNum + 1);
            this.setState({
                names: updatedNames
            })
        }
    }

    updateScore = (playerNum, s) => {
        let updatedScores = [...this.state.scores];
        let thisScore = { ...updatedScores[playerNum] };
        thisScore = s;
        updatedScores[playerNum] = thisScore;

        this.setState({
            scores: updatedScores
        })
    }

    render() {
        var playerData = [];

        for (var i = 0; i < this.state.numPlayers; i++) {
            playerData.push(<li key={i} id={i} className={this.state.activePlayer === i ? 'active-player' : ''} onClick={this.updateActivePlayer}>{this.state.names[i]}'s Score: {this.state.scores[i]}</li>
            );
        }

        var players = [];
        for (var j = 0; j < this.state.numPlayers; j++) {
            players.push(<Player className="player-panel" key={j} showForm={this.state.activePlayer === Number(j) ? true : false} numberOfPlayers={this.state.numPlayers} playerNum={j} updateName={this.updateName} updateScore={this.updateScore} />);
        }

        return (
            <div className="scores">
                <div className="column scores-column">
                    <h2>Scores</h2>
                    <ul>{playerData}</ul>
                    <span>
                        <button className="add-button" onClick={this.addPlayer}>+ Player</button>
                        <button className="delete-button" onClick={this.deletePlayer}>- Player</button>
                    </span>

                </div>

                <div className="column player-column">
                    <div className="left-player">
                        {this.state.activePlayer > 0 && <p id={this.state.activePlayer - 1} onClick={this.updateActivePlayer}> &lt; <br /> {this.state.names[this.state.activePlayer - 1]} </p>}
                    </div>
                    {players}
                    <div className="right-player" >
                        {this.state.activePlayer < 4 && this.state.numPlayers > (this.state.activePlayer + 1) && <p id={this.state.activePlayer + 1} onClick={this.updateActivePlayer}> &gt; <br /> {this.state.names[this.state.activePlayer + 1]} </p>}
                    </div>
                </div>
            </div>
        )
    }
}

export default Scores;