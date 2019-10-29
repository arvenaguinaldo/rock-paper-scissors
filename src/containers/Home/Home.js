import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import "./Home.css"

import Button from '../../components/Button/Button'

export class Home extends Component {
  render() {
    return (
      <div className="home">
        <h1>Select Play Mode</h1>
        <Link to="/player">
            <Button className="btn">
              Player VS Computer
            </Button>
        </Link>

        <Link to="/computer">
          <Button className="btn">
            Computer VS Computer
          </Button>
        </Link>
      </div>
    )
  }
}

export default Home
