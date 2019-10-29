import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import RockImage from '../../assets/images/rock.png'
import PaperImage from '../../assets/images/paper.png'
import ScissorsImage from '../../assets/images/scissors.png'
import Button from '../../components/Button/Button'

import './Player.css';

export default class Player extends Component {
  state = {
    playerScore: 0,
    computerScore: 0,
    computerChoice: '',
    playerChoice: '',
    count: 5,
    timerOn: true,
    result: '',
    disabled: false
  }

  getComputerChoice = () => {
    const choices = ['r', 'p', 's'];
    const randomNumber = Math.floor(Math.random() * 3)
    return choices[randomNumber]
  }

  handleWin = () => {
    this.setState({
      playerScore: this.state.playerScore + 1,
      result: 'You Win! 🎉'
    })
  }

  handleLose = () => {
    this.setState({
      computerScore: this.state.computerScore + 1,
      result: 'You Lose 😭'
    })
  }

  handleDraw = () => {
    this.setState({result: `It's a tie 👍🏻`})
  }

  handlePlayAgain = () => {
    this.setState({
      computerChoice: '',
      playerChoice: '',
      count: 5,
      timerOn: true,
      result: '',
      disabled: false
    })
  }

  handleGame = choice => {
    this.setState(({
      playerChoice: choice,
      timerOn: true,
      result: '',
      disabled: true
    }))

    this.timer = setInterval(() => {
      const {count} = this.state;
      const computerChoice = this.getComputerChoice();

      this.setState(prevState => ({count: prevState.count - 1}))

      if(count <= 1) {
        this.setState({
          timerOn: false,
          count: 5,
          computerChoice
        });

        clearInterval(this.timer)

        switch(choice + computerChoice) {
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
      playerScore,
      computerScore,
      count,
      computerChoice,
      timerOn,
      playerChoice,
      result,
      disabled
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

       <div className="score">
         <div className="computer-label badge">computer</div>
         <div className="player-label badge">player</div>
         <span>{computerScore}</span>
         <div className="divider"></div>
         <span>{playerScore}</span>
       </div>

        {result ? (
          <div className="result">
            <p>{result}</p>
            <Button className="resultButton" onClick={this.handlePlayAgain}>Play Again!</Button>
            <Link to="/">
              <Button className="resultButton">Change Mode</Button>
            </Link>
          </div>
        ) : (
          <p className="choose-message">Choose your move</p>
        )}

       <div className="choices">
          <Button
            className="choiceButton"
            onClick={this.handleGame.bind(this, 'r')}
            disabled={disabled}
            active={playerChoice === 'r' ? 1 : 0}
          >
            <img className="image" src={RockImage} alt="rock"/>
          </Button>

          <Button
            className="choiceButton"
            onClick={this.handleGame.bind(this, 'p')}
            disabled={disabled}
            active={playerChoice === 'p' ? 1 : 0}
            >
            <img className="image" src={PaperImage} alt="paper"/>
          </Button>

          <Button
            className="choiceButton"
            onClick={this.handleGame.bind(this, 's')}
            disabled={disabled}
            active={playerChoice === 's' ? 1 : 0}
          >
            <img className="image" src={ScissorsImage} alt="scissors"/>
          </Button>
       </div>
    </div>
    )
  }
}
