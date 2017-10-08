import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Games } from '../api/games.js';

import Board from "./Board.jsx";
import Leaderboard from "./Leaderboard.jsx";
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
 
class App extends Component {
    constructor(props){
        super(props);
        this.height = 600;
        this.width = 600;
    }
    render(){
        return(
            <div className="App">
                <header>
                    <h1>Multiplayer Snake Game</h1>
                    <AccountsUIWrapper />
                </header>

                { this.props.currentUser ?
                    <Board width={this.width} height={this.height}/> : ''
                }
                <Leaderboard games={this.props.games}/>
            </div>
        );
    }
}

App.propTypes = {
  games: PropTypes.array.isRequired,
  currentUser: PropTypes.object,
};

export default createContainer(() => {
  return {
    games: Games.find({ active: false }).fetch(),
    currentUser: Meteor.user(),
  };
}, App);