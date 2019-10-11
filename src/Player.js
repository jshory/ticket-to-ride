import React, { Component } from 'react';
import './Player.css';

class Player extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showForm: this.props.showForm,
            numberOfPlayers: this.props.numberOfPlayers,
            playerNum: this.props.playerNum,
            name: "",
            oneTrain: 0,
            twoTrains: 0,
            threeTrains: 0,
            fourTrains: 0,
            fiveTrains: 0,
            sixTrains: 0,
            successfulDestinations: 0,
            unsuccessfulDestinations: 0,
            longestRoute: false,
            score: 0,
            showScore: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.calculateScore = this.calculateScore.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.showForm !== prevProps.showForm) {
            this.setState({
                showForm: this.props.showForm
            })
        }
    }

    handleChange(event) {
        const name = event.target.name;
        var value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

        if (name !== "name" && name !== 'longestRoute') {
            value = Number(value);
        }

        this.setState({
            [name]: value
        });
        
        if (name === "name") {
            this.props.updateName(this.state.playerNum, value);
        }
    }
    
    resetForm(event) {
        event.preventDefault();
        
        this.setState({
            showForm: true,
            name: "",
            oneTrain: 0,
            twoTrains: 0,
            threeTrains: 0,
            fourTrains: 0,
            fiveTrains: 0,
            sixTrains: 0,
            successfulDestinations: 0,
            unsuccessfulDestinations: 0,
            longestRoute: false,
            score: 0,
            showScore: false,
        });

        this.props.updateName(this.state.playerNum, "Player " + (this.state.playerNum + 1));
    }

    calculateScore(event) {
        event.preventDefault();

        var total = (this.state.oneTrain * 1) + (this.state.twoTrains * 2) + (this.state.threeTrains * 4) + (this.state.fourTrains * 7) + (this.state.fiveTrains * 10) + (this.state.sixTrains * 15);
        
        total += this.state.successfulDestinations;
        total -= this.state.unsuccessfulDestinations;
        
        if (this.state.longestRoute) {
            total += 10;
        }

        this.setState({
            score: total,
            showScore: true
        });

        this.props.updateScore(this.state.playerNum, total);
    }

    render() {
        let name;
        if (this.state.name.length > 0) {
            name = <span>{this.state.name}</span>
        } else {
            name = <span>Player {this.state.playerNum + 1}</span>
        }

        return (
            <div className={`player ${this.state.showForm ? "" : "hidden"}`}>
                {/* <div className={'player-form' + this.props.numPlayers}> */}
                    <h2 className="center-label">{name}</h2>
                    
                    <form onSubmit={this.calculateScore} onReset={this.resetForm}>
                        <label className="center-label">Name:
                            <br />
                            <input className="wide-input" type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                        </label>
                        <br />

                        <label className="center-label">Claimed Routes:
                        <br />
                            <label className="inline-label">1 Car</label><input type="text" className="inline-input" name="oneTrain" value={this.state.oneTrain} onChange={this.handleChange} /><br />
                            <label className="inline-label">2 Cars</label><input type="text" className="inline-input" name="twoTrains" value={this.state.twoTrains} onChange={this.handleChange} /><br />
                            <label className="inline-label">3 Cars</label><input type="text" className="inline-input" name="threeTrains" value={this.state.threeTrains} onChange={this.handleChange} /><br />
                            <label className="inline-label">4 Cars</label><input type="text" className="inline-input" name="fourTrains" value={this.state.fourTrains} onChange={this.handleChange} /><br />
                            <label className="inline-label">5 Cars</label><input type="text" className="inline-input" name="fiveTrains" value={this.state.fiveTrains} onChange={this.handleChange} /><br />
                            <label className="inline-label">6 Cars</label><input type="text" className="inline-input" name="sixTrains" value={this.state.sixTrains} onChange={this.handleChange} /><br />
                        </label>
                        <br />

                        <label className="center-label">Successful Destinations Total:
                        <br />
                            <input className="wide-input" type="text" name="successfulDestinations" value={this.state.successfulDestinations} onChange={this.handleChange} /><br />
                        </label>
                        <br />

                        <label className="center-label">Unsuccessful Destinations Total:
                        <br />
                            <input className="wide-input" type="text" name="unsuccessfulDestinations" value={this.state.unsuccessfulDestinations} onChange={this.handleChange} /><br />
                        </label>

                        <div className="center-label">
                        <label className="check-label">Longest Route?
                            <input type="checkbox" className="check-input" name="longestRoute" value={this.state.longestRoute} onChange={this.handleChange} /><br />
                        </label>
                        </div>
                        
                        {this.state.showScore && 
                            <h2 className="center-label">{name}'s Score: {this.state.score}</h2>
                        }

                        <button className="submit-button" type="submit">Score</button>
                        <button className="reset-button" type="reset">Reset</button>

                    </form>
                {/* </div> */}
            </div>
        )
    }
}

export default Player;