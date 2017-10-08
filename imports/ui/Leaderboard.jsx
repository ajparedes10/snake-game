import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { Games } from '../api/games.js';

class Leaderboard extends Component {
  
    render(){
        return this.props.games.map((game) => (
            <div key={game._id}>
                {game.text}
            </div>
        ));
    }
}
 
Leaderboard.propTypes = {
  games: PropTypes.array.isRequired,
};

export default Leaderboard;