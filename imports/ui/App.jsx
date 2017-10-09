import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Games } from '../api/games.js';

import BoardContainer from "./BoardContainer.jsx";
import Leaderboard from "./Leaderboard.jsx";
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
 
class App extends Component {
    constructor(props){
        super(props);
        this.height = 600;
        this.width = 600;
        this.state = {
            activeGameId: undefined
        }
    }

    componentDidMount() {
    }

    

    render(){
        return(
            <div className="App">
                <header>
                    <h1>Multiplayer Snake Game</h1>
                    <AccountsUIWrapper />
                </header>

                { this.props.currentUser && this.state.games ?
                    <BoardContainer width={this.width} height={this.height} potentialGame={this.props.potentialGame}/> : ''
                }
                <Leaderboard games={this.props.games}/>
            </div>
        );
    }
}

App.propTypes = {
  games: PropTypes.array.isRequired,
  currentUser: PropTypes.object,
  potentialGame: PropTypes.object,
};

export default createContainer((props) => {
    Meteor.subscribe('games', {
      onReady: function () {
        console.log("omg");
      }
    });

  return {
    games: Games.find({  }).fetch(),
    currentUser: Meteor.user(),
    potentialGame: Games.findOne({ users: { $size: 1 }, gameOver: false })
  };
}, App);