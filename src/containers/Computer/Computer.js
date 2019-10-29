import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import RockImage from '../../assets/images/rock.png'
import PaperImage from '../../assets/images/paper.png'
import ScissorsImage from '../../assets/images/scissors.png'
import Button from '../../components/Button/Button'

import './Computer.css';

export default class Player extends Component {
  state = {
    computer1Score: 0,
    computerScore: 0,
    computerChoice: '',
    computer1Choice: '',
    count: 5,
    timerOn: true,
    computerResult: '',
    computer1Result: ''
  }

  componentDidMount() {
    this.handleGame();
  }

  getComputerChoice = () => {
    const choices = ['r', 'p', 's'];
    const randomNumber = Math.floor(Math.random() * 3)
    return choices[randomNumber]
  }

  handleWin = () => {
    this.setState({
      computer1Score: this.state.computer1Score + 1,
      computer1Result: 'Win! 🎉',
      computerResult: 'Lose 😭'
    })
  }

  handleLose = () => {
    this.setState({
      computerScore: this.state.computerScore + 1,
      computer1Result: 'Lose 😭',
      computerResult: 'Win! 🎉'
    })
  }

  handleDraw = () => {
    this.setState({
      computer1Result: `It's a tie 👍🏻`,
      computerResult: `It's a tie 👍🏻`
    })
  }

  handleGame = () => {
    this.setState(({
      timerOn: true,
      computerResult: '',
      computer1Result: ''
    }))

    this.timer = setInterval(() => {
      const {count} = this.state;
      const computerChoice = this.getComputerChoice();
      const computer1Choice = this.getComputerChoice();

      this.setState(prevState => ({count: prevState.count - 1}))

      if(count <= 1) {
        this.setState({
          timerOn: false,
          count: 5,
          computerChoice,
          computer1Choice
        });

        clearInterval(this.timer)

        switch(computer1Choice + computerChoice) {
          case "rs":
          case "pr":
          case "sp":
            this.handleWin()
            break;
          case "rp":
          case "ps":
          case "sr":
              this.handleLose()
            break;
          case "rr":
          case "pp":
          case "ss":
              this.handleDraw()
            break;
          default:
          return null
        }
      }

    }, 1000)
  }



  render() {
    const {
      computer1Score,
      computerScore,
      count,
      computerChoice,
      computer1Choice,
      timerOn,
      computer1Result,
      computerResult
    } = this.state;

    return (
      <div className="player">
      <header className="player-header">
       <h1 className="title">Rock Paper Scissors</h1>
      </header>

        <div className="computer-choice">
          {timerOn ? (
            <p className='timer'>{count}</p>
          ) : (
            <div>
              {computerChoice === 'r' && <img className="image" src={RockImage} alt="rock"/>}
              {computerChoice === 'p' && <img className="image" src={PaperImage} alt="paper"/>}
              {computerChoice === 's' && <img className="image" src={ScissorsImage} alt="scissors"/>}
            </div>
          )}
        </div>

        {computerResult &&
          <div className="result">
            <p>{computerResult}</p>
          </div>
         }

       <div className="score">
         <div className="computer-label badge">computer</div>
         <div className="computer1-label badge">Computer 1</div>
         <span>{computerScore}</span>
         <div className="divider"></div>
         <span>{computer1Score}</span>
       </div>

        {computer1Result &&
          <div className="result">
            <p>{computer1Result}</p>
            <Button className="resultButton" onClick={this.handleGame}>Play Again!</Button>
            <Link to="/">
              <Button className="resultButton">Change Mode</Button>
            </Link>
          </div>
         }

        <div className="computer-choice">
          {timerOn ? (
            <p className='timer'>{count}</p>
          ) : (
            <div>
              {computer1Choice === 'r' && <img className="image" src={RockImage} alt="rock"/>}
              {computer1Choice === 'p' && <img className="image" src={PaperImage} alt="paper"/>}
              {computer1Choice === 's' && <img className="image" src={ScissorsImage} alt="scissors"/>}
            </div>
          )}
        </div>
    </div>
    )
  }
}
