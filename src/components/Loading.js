import  loading  from "../loading.gif";



import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Loading extends Component {
  static propTypes = {

  }

  render() {
    return (
      <div>
         <img src={loading} width="50 rem" height="50 rem" alt="Loading"/>
      </div>
    )
  }
}

export default Loading
