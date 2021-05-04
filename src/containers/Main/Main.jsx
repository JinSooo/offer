import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUserById, getChatList } from '../../utils/api'
import { getUserId } from '../../utils/cookie'
import { receiveUser } from '../../redux/actions/user'
import { receiveChatList, receiveChat } from '../../redux/actions/chat'
import { NavBar } from 'antd-mobile'
import { initIO, socketIO } from '../../socket/socket'

import BossInfo from '../BossInfo/BossInfo'
import UserInfo from '../UserInfo/UserInfo'
import Boss from '../Boss/Boss'
import User from '../User/User'
import Message from '../Message/Message'
import Personal from '../Personal/Personal'
import NavFooter from '../../components/NavFooter/NavFooter'
import Perfection from '../Perfection/Perfection'
import Chat from '../Chat/Chat'

class Main extends Component {
  // 所有导航组件的相关信息
  navList = [
    {
      path: '/message',
      component: Message,
      title: 'Messages',
      icon: 'message',
      text: 'Message'
    },
    {
      path: '/user',
      component: User,
      title: 'Users',
      icon: 'users',
      text: 'Users'
    },
    {
      path: '/boss',
      component: Boss,
      title: 'Bosses',
      icon: 'users',
      text: 'Bosses'
    },
    {
      path: '/perfection',
      component: Perfection,
      title: 'Perfection',
      icon: 'perfection',
      text: 'Perfection'
    },
    {
      path: '/personal',
      component: Personal,
      title: 'Personal',
      icon: 'personal',
      text: 'Personal'
    }
  ]
  // 获取用户信息
  getUserInfo = async () => {
    // 首次进入时，判断浏览器cookie中是否已经登录过用户
    const userId = getUserId()
    const { _id } = this.props.user
    if (userId && !_id) {
      // 向后台请求用户信息
      const res = await getUserById()
      if (res.code === 0) {
        this.props.receiveUser(res.data)
      }
    }
  }

  componentDidMount() {
    this.getUserInfo()
  }

  render() {
    // 判断用户是否登录
    // 如果没有登录则跳转到登录界面
    if (!this.props.user._id) {
      const userId = getUserId()
      if (!userId) return <Redirect to="/login" />
      return null
    } else {
      if (!socketIO) {
        initIO(this.props.user._id, this.props.receiveChat)
        // 获取用户聊天信息
        getChatList().then(chats => {
          if (chats.code === 0) this.props.receiveChatList({ ...chats.data, user: this.props.user })
        })
      }
    }
    const { type } = this.props.user
    // 获取当前路由路径
    const path = this.props.location.pathname
    // 判断当前路径是否存在
    const currentNav = this.navList.find(nav => nav.path === path)
    if (currentNav) {
      if (type === 'user') {
        this.navList[1].isHide = true
      } else {
        this.navList[2].isHide = true
      }
    }

    return (
      <div>
        {currentNav && (
          <NavBar mode="dark" className="sticky-header">
            {currentNav.title}
          </NavBar>
        )}
        <div className={currentNav && 'nav-container'}>
          <Switch>
            <Route path="/bossinfo" component={BossInfo} />
            <Route path="/userinfo" component={UserInfo} />
            <Route path="/chat/:userId" component={Chat} />
            {this.navList
              .filter(nav => !nav.isHide)
              .map(nav => (
                <Route key={nav.text} path={nav.path} component={nav.component} />
              ))}
            {/* 
            <Route path="/boss" component={Boss} />
            <Route path="/user" component={User} />
            <Route path="/message" component={Message} />
            <Route path="/perfection" component={Perfection} />
            <Route path="/personal" component={Personal} /> 
          */}
            <Redirect to={'/message'} component={Message} />
          </Switch>
        </div>
        {currentNav && <NavFooter navList={this.navList} unReadCount={this.props.unReadCount} />}
      </div>
    )
  }
}

export default connect(state => ({ user: state.user, unReadCount: state.chats.unReadCount }), {
  receiveUser,
  receiveChatList,
  receiveChat
})(Main)
