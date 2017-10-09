import React, {Component} from 'react';
import PropTypes from 'prop-types';
import GameOver from "./GameOver";
import Board from "./Board";

import { createContainer } from 'meteor/react-meteor-data';

import { Games } from '../api/games.js';

class BoardContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeGameId: undefined
        }
    }

    componentWillMount() {
        if (this.props.potentialGame) {
            console.log("Found an active game.");
            this.setState({ activeGameId: this.props.potentialGame._id })
        } else {
            console.log("Didn't find an active game.");
            // var id = Games.insert({
            //     createdAt: new Date(), // current time
            //     users: [Meteor.userId()],           // _id of logged in user
            //     usernames: [Meteor.user().username],
            //     partner: "",
            //     score: 0,
            //     snake: [],
            //     dir: "right",
            //     gameOver: false
            // });

            Meteor.call('games.insert', [Meteor.userId()], [Meteor.user().username], function(err, result) {
                console.log(result)
                this.setState({ activeGameId: result })
            }.bind(this));
            
        }
    }

    render(){
        return(
            <div>
                { this.state.activeGameId ?
                    <Board width={this.props.width} height={this.props.height} activeGameId={this.state.activeGameId}/>
                     : ''}
            </div>
        );
    }
}
BoardContainer.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    potentialGame: PropTypes.object,
};

export default BoardContainer;