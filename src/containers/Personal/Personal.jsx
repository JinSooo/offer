import { List, Result, WhiteSpace, Button, Toast, Modal } from 'antd-mobile'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { removeUserId } from '../../utils/cookie'
import { resetUser } from '../../redux/actions/user'
import dateFormat from 'dateformat'
const Item = List.Item
const Brief = Item.Brief
const alert = Modal.alert

class Personal extends Component {
  // 退出登录
  logout = () => {
    alert('Log Out', 'Are you sure???', [
      { text: 'Cancel' },
      {
        text: 'Ok',
        onPress: () => {
          removeUserId()
          this.props.resetUser()
          Toast.success('退出登录成功', 1, () => this.props.history.replace('/login'))
        }
      }
    ])
  }

  render() {
    const { user } = this.props
    return (
      <>
        <Result
          img={<img src={require(`../../assets/img/${user.avatar}.png`).default} alt="张三" />}
          title={user.username}
          message={user.company}
        />
        <List renderHeader={() => '相关信息'}>
          <Item multipleLine>
            {user.company ? (
              <>
                <Brief>招聘：{user.post ? user.post : '无'}</Brief>
                <Brief>要求：{user.info ? user.info : '无'}</Brief>
                <Brief>公司：{user.company}</Brief>
                <Brief>薪资：{user.salary}</Brief>
              </>
            ) : (
              <>
                <Brief>职位：{user.post ? user.post : '无'}</Brief>
                <Brief>简介：{user.info ? user.info : '无'}</Brief>
              </>
            )}
            <Brief>创建时间：{dateFormat(new Date(user.date), 'yyyy-mm-dd HH:MM:ss')}</Brief>
          </Item>
        </List>
        <WhiteSpace />
        <List>
          <Button type="warning" onClick={this.logout}>
            退出登录
          </Button>
        </List>
      </>
    )
  }
}

export default connect(state => ({ user: state.user }), { resetUser })(Personal)
