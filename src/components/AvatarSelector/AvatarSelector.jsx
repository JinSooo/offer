import React, { Component } from 'react'
import { Grid, List } from 'antd-mobile'
import './AvatarSelector.css'

// 加载图片
const avatarList = Array.from(new Array(20)).map((val, index) => ({
  text: '头像' + (index + 1),
  icon: require(`../../assets/img/头像${index + 1}.png`).default
}))

export default class AvatarSelector extends Component {
  state = {
    avatar: '' /* 头像名称 */,
    icon: '' /* 头像图片 */,
    header: '请选择头像'
  }
  // 设置头像
  setAvatar = ({ text, icon }) => {
    this.setState({ avatar: text, icon, header: '已选择的头像' })
    this.props.onChange(text)
  }

  render() {
    return (
      <List
        renderHeader={() =>
          this.state.avatar ? (
            <div>
              {this.state.header}
              {/* 使用<a>的target="_blank"属性时需要rel="noopener noreferrer"没有的话有安全风险 */}
              {/* <a href={this.state.icon} target="_blank" rel="noopener noreferrer"> */}
              <img src={this.state.icon} alt="头像" />
              {/* </a> */}
            </div>
          ) : (
            this.state.header
          )
        }
      >
        <Grid data={avatarList} columnNum={5} onClick={this.setAvatar}></Grid>
      </List>
    )
  }
}
