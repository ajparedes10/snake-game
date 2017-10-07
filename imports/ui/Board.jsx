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

        this.createFood();
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
    gameOver(){
        this.setState({
            gameOver:true
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
        if(nx===-1 || ny===-1 || nx=== this.props.width/10 || ny=== this.props.height/10 || this.collision(nx, ny)){
            this.gameOver();
            console.log(this.state.gameOver);
        }

        const tail = {x: nx, y:ny};
        if(nx === this.state.food.x && ny === this.state.food.y){
            this.createFood();
            this.addPoints();
        }else{
            s.pop();
        }
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
            this.paintCell("green", c);
        }
        this.paintCell("red", this.state.food);
    }

    handleKeyDown(event){
        event.preventDefault();
        let ndir = this.state.dir;
        if(event.keyCode === 37 && ndir!== "right") ndir = "left";
        else if(event.keyCode === 38 && ndir!== "down") ndir = "up";
        else if(event.keyCode === 39 && ndir!== "left") ndir = "right";
        else if(event.keyCode === 40 && ndir!== "up") ndir = "down";
        this.changeDirection(ndir);
    }

    createFood(){
        const food = {
            x: Math.round(Math.random()* (this.props.width-10)/10),
            y: Math.round(Math.random()* (this.props.height-10)/10)
        };
        this.setState({
            food: food
        });

    }
    addPoints(){
        this.setState({
            score: this.state.score+10
        });
        console.log(this.state.score);
    }
    collision(x, y){
        const s = this.state.snake;
        for (let i=0; i<s.length; i++ ){
            if( s[i].x === x && s[i].y === y) return true;
        }
        return false;
    }

    paintCell(color, cell){
        const ctx = this.canvas.getContext("2d");
        ctx.fillStyle=color;
        ctx.fillRect(cell.x*10, cell.y*10, 10, 10);
    }

    render(){
        return(
            <div className="Board">
                <p>Score: {this.state.score}</p>
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