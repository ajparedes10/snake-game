import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GameOver extends Component {
    constructor(props){
        super(props);
        this.onClick= this.onClick.bind(this);
    }
    onClick(){

    }
    render(){
        return (
            <div className="GameOver">
                <h1>Game Over</h1>
                <p>Thanks for playing!</p>
                <h3>Your score: {this.props.score}</h3>
                <h3>Your high score: </h3>
                <h3>Partner: </h3>
            </div>
        );
    }
}

GameOver.propTypes = {
    score: PropTypes.number.isRequired,
    //players: PropTypes.array.isRequired
};
export default GameOver;