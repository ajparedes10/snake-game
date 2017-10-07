import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import Board from "./Board.jsx";
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

                <Board width={this.width} height={this.height}/>
            </div>
        );
    }
}
App.propTypes = {

};
export default App;