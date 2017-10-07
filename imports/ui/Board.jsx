import React, {Component} from 'react';
import PropTypes from 'prop-types';
 
class Board extends Component {
	constructor(props) {
		super(props);
		this.scale = 10;
        this.state = {
                x: 0,
                y: 0,
                xspeed: 0,
                yspeed: 0
        }
	}

	componentDidMount(){
        this.showSnake();
    }
    componentWillUpdate(){
        this.showSnake();
    }
    updateSnake(dir){
        let speed = {};

        switch (dir){
            case "up":
                speed.y = -1;
                break;
            case "down":
                speed.y = 1;
                break;
            case "left":
                speed.x = -1;
                break;
            case "right":
                speed.x = 1;
                break;
        }
        this.setState({
            xspeed: speed.x,
            yspeed: speed.y
        });
    }
    moveSnake(){
        const posx = this.state.x;
        const posy = this.state.y;
        const speedx = this.state.xspeed;
        const speedy = this.state.yspeed;
        this.setState({
            x: posx + speedx*this.scale,
            y: posy + speedy*this.scale
        });
    }
    showSnake(){
        let ctx = this.canvas.getContext("2d");
        ctx.rect(this.state.x, this.state.y, 10, 10);
        ctx.fillStyle="green";
        ctx.fill();
    }
    render(){
        return(
            <div className="Board">
                <canvas
                    width={this.props.width}
                    height={this.props.height}
                    ref={(c)=> this.canvas = c}>
				</canvas>
            </div>
        );
    }
}
Board.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
};
export default Board;