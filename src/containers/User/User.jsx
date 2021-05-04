import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserList from '../../components/UserList/UserList'
import { receiveUserList } from '../../redux/actions/userList'
import { getUserList } from '../../utils/api'

class Boss extends Component {
  getUserListAsync = async () => {
    const res = await getUserList()
    if (res.code === 0) {
      this.props.receiveUserList(res.data)
    }
  }

  componentDidMount() {
    this.getUserListAsync()
  }

  render() {
    const { userList } = this.props
    if (!userList) return null
    return <UserList userList={userList} />
  }
}

export default connect(state => ({ userList: state.userList }), { receiveUserList })(Boss)
