import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import 'antd-mobile/dist/antd-mobile.css'
import './App.css'

import Login from './containers/Login/Login'
import Register from './containers/Register/Register'
import Main from './containers/Main/Main'

export default class App extends Component {
  render() {
    return (
      // 路由只进行一次匹配
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/" component={Main} />
        {/* 重定向到Main中，当输入其他字符时，重定向回来 */}
        <Redirect to="/" />
      </Switch>
    )
  }
}
