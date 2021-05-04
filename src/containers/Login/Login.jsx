import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reqLogin, getChatList } from '../../utils/api'
import { authSuccess, authFailure } from '../../redux/actions/user'
import { receiveChatList } from '../../redux/actions/chat'
import Logo from '../../components/Logo/Logo'
import { NavBar, Icon, WingBlank, List, InputItem, WhiteSpace, Button, Toast } from 'antd-mobile'

class Login extends Component {
  state = {
    username: '' /* 用户名 */,
    password: '' /* 密码 */
  }

  // 处理输入表单数据改变的change方法
  handleChange = (name, val) => this.setState({ [name]: val })
  // 登录
  login = async () => {
    const { username, password } = this.state
    const { authSuccess, authFailure } = this.props
    if (!username) return authFailure('请输入用户名')
    if (!password) return authFailure('请输入密码')
    Toast.loading('Loading...')
    // 注册
    const res = await reqLogin({
      username,
      password
    })
    // 判断登录是否成功
    if (res.code === 0) {
      authSuccess(res.data)
      Toast.success('登录成功', 1, async () => {
        // 获取用户聊天信息
        const chats = await getChatList()
        if (chats.code === 0) this.props.receiveChatList(chats.data)
        this.props.history.replace('/')
      })
    } else {
      authFailure(res.msg)
    }
  }
  // 跳转到注册界面
  toRegister = () => this.props.history.replace('/register')
  // 跳转到主界面
  toMain = () => this.props.history.replace('/main')

  render() {
    return (
      <>
        {/* 导航栏 */}
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={this.toMain}
          rightContent={<Icon key="0" type="ellipsis" />}
        >
          Login
        </NavBar>
        {/* Logo图片 */}
        <Logo />
        {/* 两翼留白 */}
        <WingBlank>
          <List>
            {/* 表单数据 */}
            <InputItem placeholder="请输入用户名" type="text" onChange={val => this.handleChange('username', val)}>
              用户名:
            </InputItem>
            <InputItem placeholder="请输入密码" type="password" onChange={val => this.handleChange('password', val)}>
              密&nbsp;&nbsp;&nbsp;码:
            </InputItem>
            {/* 上下留白 */}
            <WhiteSpace />
            <Button type="primary" onClick={this.login}>
              登&nbsp;&nbsp;&nbsp;陆
            </Button>
            <WhiteSpace />
            <Button onClick={this.toRegister}>未注册账户</Button>
          </List>
        </WingBlank>
      </>
    )
  }
}

export default connect(state => ({}), { authSuccess, authFailure, receiveChatList })(Login)
