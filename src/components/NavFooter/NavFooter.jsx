import React, { Component } from 'react'
import { TabBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
const TabBarItem = TabBar.Item

class NavFooter extends Component {
  handlePress = path => this.props.history.replace(path)
  render() {
    const { navList, unReadCount } = this.props
    const path = this.props.location.pathname
    return (
      <TabBar>
        {navList
          .filter(nav => !nav.isHide)
          .map(nav => (
            <TabBarItem
              key={nav.text}
              badge={nav.path === '/message' ? unReadCount : 0}
              title={nav.text}
              icon={{ uri: require(`./img/${nav.icon}.png`).default }}
              selectedIcon={{ uri: require(`./img/${nav.icon}-active.png`).default }}
              selected={path === nav.path}
              onPress={() => this.handlePress(nav.path)}
            />
          ))}
      </TabBar>
    )
  }
}

export default withRouter(NavFooter)
