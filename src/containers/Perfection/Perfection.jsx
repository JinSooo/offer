import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class Perfection extends Component {
  render() {
    const { type } = this.props.user
    return <Redirect to={type === 'user' ? '/userInfo' : '/bossInfo'} />
  }
}

export default connect(state => ({ user: state.user }))(Perfection)
