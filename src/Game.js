import React ,{Component} from 'react'
import Square from './Square'
import Board from './Board'
class Game extends React.Component {
    constructor(){
        super()
        this.state = {
            history : [
                {squares : Array(9).fill(null)}
            ],
            xIsNext : true,
            step : 0
        }
    }
    handleClick = (i)=>{
        let history = this.state.history
        let newsquares = history[this.state.step].squares.slice();//数组的浅拷贝
        //newsquares[i]判断当前棋盘上是否有棋子
        //this.calculateWinner(newsquares)判断当前是否有赢家
        //满足以上两个条件就不会在更改squares
        if(newsquares[i]||this.calculateWinner(newsquares)){
            return 
        }
        newsquares[i] =  this.state.xIsNext?"X":"O" 
        this.setState({
            history : history.concat([{squares : newsquares}]),
            xIsNext : !this.state.xIsNext,
            step : history.length
        })
    }
    calculateWinner = (squares)=>{
        const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
          }
        }
        return null;
    }
    goto(step){
        this.setState({
            step : step,
            xIsNext : (step%2)?false:true
        })
    }
    render() {
        let history = this.state.history
        let newsquares = history[this.state.step].squares.slice();
        let winner = this.calculateWinner(newsquares)
        let state = (this.state.xIsNext?"X":"O")
        if(winner){
            state = 'winner:'+winner
        }
        var moves = history.map((item,index)=>{
           let des = index?'move to#'+index:"Game Start"
           return  (<li 
                        key={index}
                        onClick = {()=>this.goto(index)}
                    >{des}</li>)
        })
        console.log(moves,'map')
        return (

            <div className="game">
                <div className="game-board">
                <div className="status">Next player:{state}</div>
                <Board 
                    handleClick = {this.handleClick}
                    squares = {newsquares}
                    xIsNext = {this.state.xIsNext}
                    calculateWinner = {this.calculateWinner}
                />
                </div>
                <div className="game-info">
                <div>{/* status */}</div>
                <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}
export default Game