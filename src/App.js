import React, { Component } from 'react'
import LLL from "./llll"
export default class App extends Component {
  render() {
    return (
      <div>
        <LLL page="1" pagesize="20"></LLL>
      </div>
    )
  }
}

