import React, {Component} from 'react';
import PropTypes from 'prop-types';
 
class Board extends Component {
	constructor(props) {
		super(props);
		this.scale = 10;
        this.state = {
            snake: [],
            dir: "right",
            gameOver: false,
            score: 0
        }
	}

	componentDidMount(){
        this.canv();

        this.createSnake();
        setInterval(this.showSnake.bind(this), 100);
	    //this.showSnake();
    }
    componentWillMount(){
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }
    canv(){
        let ctx = this.canvas.getContext("2d");
        ctx.fillStyle="white";
        ctx.fillRect(0, 0, this.props.width, this.props.height);
        ctx.strokeStyle = "black";
        ctx.strokeRect(0, 0, this.props.width, this.props.height);
    }
    createSnake(){
        const len = 5;
        let s = this.state.snake;
        for (let i = len-1; i>=0; i--){
            s.push({x:i, y:0});
        }
        this.setState({
            snake:s
        });
        console.log(this.state.snake.length);
    }
    changeDirection(ndir){
        this.setState({
            dir:ndir
        });
    }
    moveSnake(){
        let s = this.state.snake;
        let nx = s[0].x;
        let ny = s[0].y;
        let d = this.state.dir;

        switch (d){
            case "up":
                ny--;
                break;
            case "down":
                ny++;
                break;
            case "left":
                nx--;
                break;
            case "right":
                nx++;
                break;
        }

        let tail = s[s.length-1];
        s.pop();
        tail.x = nx;
        tail.y = ny;
        s.unshift(tail);

        this.setState({
            snake:s
        });
    }

    showSnake(){
        this.canv();
        this.moveSnake();
        for(let i=0; i<this.state.snake.length; i++){
            let c = this.state.snake[i];
            let ctx = this.canvas.getContext("2d");
            ctx.fillStyle="green";
            ctx.fillRect(c.x*10, c.y*10, 10, 10);
        }
    }

    handleKeyDown(event){
        event.preventDefault();
        let ndir = this.state.dir;
        if(event.keyCode === 37) ndir = "left";
        else if(event.keyCode === 38) ndir = "up";
        else if(event.keyCode === 39) ndir = "right";
        else if(event.keyCode === 40) ndir = "down";
        this.changeDirection(ndir);
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