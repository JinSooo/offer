import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserList from '../../components/UserList/UserList'
import { receiveUserList } from '../../redux/actions/userList'
import { getBossList } from '../../utils/api'

class Boss extends Component {
  getBossListAsync = async () => {
    const res = await getBossList()
    if (res.code === 0) {
      this.props.receiveUserList(res.data)
    }
  }

  componentDidMount() {
    this.getBossListAsync()
  }

  render() {
    const { userList } = this.props
    if (!userList) return null
    return <UserList userList={userList} />
  }
}

export default connect(state => ({ userList: state.userList }), { receiveUserList })(Boss)
