import React, { Component } from 'react'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import QueueAnim from 'rc-queue-anim'
const Header = Card.Header
const Body = Card.Body

class UserList extends Component {
  toChat = userId => {
    this.props.history.push(`/chat/${userId}`)
  }

  render() {
    const { userList } = this.props
    return (
      <WingBlank>
        <QueueAnim type="scale">
          {userList &&
            userList.map(user => (
              <div key={user._id}>
                <WhiteSpace />
                <Card onClick={() => this.toChat(user._id)}>
                  <Header thumb={require(`../../assets/img//${user.avatar}.png`).default} extra={user.username} />
                  <Body>
                    {user.company ? (
                      <>
                        <div>招聘: {user.post ? user.post : '无'}</div>
                        <div>要求: {user.info ? user.info : '无'}</div>
                        <div>公司: {user.company ? user.company : '无'}</div>
                        <div>月薪: {user.salary ? user.salary : '无'}</div>
                      </>
                    ) : (
                      <>
                        <div>职位: {user.post ? user.post : '无'}</div>
                        <div>简介: {user.info ? user.info : '无'}</div>
                      </>
                    )}
                  </Body>
                </Card>
              </div>
            ))}
        </QueueAnim>
      </WingBlank>
    )
  }
}

export default withRouter(UserList)
