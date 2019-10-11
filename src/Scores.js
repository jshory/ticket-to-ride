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
            // players: {
            //     names: playerNames,
            //     scores: playerScores
            // },
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
    /*
        componentDidUpdate(prevProps) {
            if (this.props.numPlayers > prevProps.numPlayers) {
                // var addNames = [...this.state.players.names];
                // var addScores = [...this.state.players.scores];
                var addNames = [...this.state.names];
                var addScores = [...this.state.scores];
    
                for (var i = prevProps.numPlayers + 1; i <= this.props.numPlayers; i++) {
                    var newName = "Player " + i;
                    addNames.push(newName);
    
                    var newScore = 0;
                    addScores.push(newScore);
                }
    
                this.setState({
                    // players: {
                    //     names: addNames,
                    //     scores: addScores
                    // }
                    names: addNames,
                    scores: addScores
                })
            } else if (this.props.numPlayers < prevProps.numPlayers) {
                var playersToDrop = prevProps.numPlayers - this.props.numPlayers;
                // var removeNames = [...this.state.players.names];
                // var removeScores = [...this.state.players.scores];
                var removeNames = [...this.state.names];
                var removeScores = [...this.state.scores];
    
                while (playersToDrop !== 0) {
                    removeNames.pop();
                    removeScores.pop();
                    playersToDrop--;
                }
    
                this.setState({
                    // players: {
                    //     names: removeNames,
                    //     scores: removeScores
                    // },
                    names: removeNames,
                    scores: removeScores,
                    activePlayer: 0
                })
            }
        }
    */
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
        // console.log(e.target.id);
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
                // players: {
                names: updatedNames
                // }
            })
        } else {
            updatedNames[playerNum] = "Player " + (playerNum + 1);
            this.setState({
                names: updatedNames
            })
        }
    }

    updateScore = (playerNum, s) => {
        // let updatedScores = [...this.state.players.scores];
        let updatedScores = [...this.state.scores];
        let thisScore = { ...updatedScores[playerNum] };
        thisScore = s;
        updatedScores[playerNum] = thisScore;

        this.setState({
            // players: {
            scores: updatedScores
            // }
        })
    }

    render() {
        var playerData = [];

        for (var i = 0; i < this.state.numPlayers; i++) {
            // playerData.push(<li key={i} id={i} className={this.state.activePlayer === i ? 'active-player' : ''} onClick={this.updateActivePlayer}>{this.state.players.names[i]}'s Score: </li>);
            playerData.push(<li key={i} id={i} className={this.state.activePlayer === i ? 'active-player' : ''} onClick={this.updateActivePlayer}>{this.state.names[i]}'s Score: {this.state.scores[i]}</li>
                /* <button id={i} className="delete-button" onClick={this.deletePlayer}>-</button>} */
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
                        {/* <p> Player {this.state.activePlayer} </p> */}
                    </div>
                    {players}
                    <div className="right-player" >
                        {this.state.activePlayer < 4 && this.state.numPlayers > (this.state.activePlayer + 1) && <p id={this.state.activePlayer + 1} onClick={this.updateActivePlayer}> &gt; <br /> {this.state.names[this.state.activePlayer + 1]} </p>}
                        {/* <p>  </p> */}
                    </div>
                    {/* <Player numPlayers={this.props.numPlayers} updateName={this.updateName} updateScore={this.updateScore} /> */}
                </div>

            </div>
        )
    }
}

export default Scores;