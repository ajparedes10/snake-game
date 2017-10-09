import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { Games } from '../api/games.js';

class Leaderboard extends Component {
  
    render(){
        return (
          <div className="leaderboard">
            <h2>Leaderboard</h2>
            <ul>
              {this.props.games.map(function(listValue){
                return <li key={listValue._id}>
                  <b>Score:</b> {listValue.score}
                  <br/><b>Players:</b> {listValue.usernames.join(", ")}
                  <br/><b>When:</b> {(new Date(listValue.createdAt)).toLocaleDateString()}
                </li>;
              })}
            </ul>
          </div>
        );
    }
}
 
Leaderboard.propTypes = {
  games: PropTypes.array.isRequired,
};

export default Leaderboard;