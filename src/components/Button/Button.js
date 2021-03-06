import React, { Component } from 'react'
import classNames from 'classnames';
import './Button.css'


export default class Button extends Component {
  state = {
    active: false
  }


  render() {
    const {children, active, disabled, className} = this.props;

    return (
      <div
        {...this.props}
        className={classNames(`button ${active && 'active'} ${disabled && 'disabled'}`, className)}
      >
        {children}
      </div>
    )
  }
}
