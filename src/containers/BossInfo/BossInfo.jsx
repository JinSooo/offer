import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reqUpdate } from '../../utils/api'
import { authFailure, resetUser, receiveUser } from '../../redux/actions/user'
import { NavBar, InputItem, TextareaItem, Button, Icon, Toast } from 'antd-mobile'
import AvatarSelector from '../../components/AvatarSelector/AvatarSelector'

class UserInfo extends Component {
  state = {
    avatar: {} /* 头像 */,
    post: {} /* 职位 */,
    info: {} /* 个人信息 */,
    company: {} /* 公司 */,
    salary: {} /* 薪资 */
  }

  // 跳转到主界面
  toMain = () => this.props.history.replace('/main')
  // 处理输入表单数据改变的change方法
  handleChange = (name, val) => this.setState({ [name]: val })
  // 保存信息
  save = async () => {
    const { avatar } = this.state
    const { authFailure, resetUser, receiveUser } = this.props
    if (!avatar) return authFailure('请选择头像')
    Toast.loading('Loading...')
    const res = await reqUpdate({ ...this.state })
    if (res.code === 0) {
      receiveUser(res.data)
      Toast.success(res.msg, 1, () => {
        this.props.history.replace('/')
      })
    } else {
      resetUser(res.msg)
    }
  }

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
          信息完善
        </NavBar>
        <AvatarSelector onChange={_ => this.handleChange('avatar', _)} />
        <InputItem placeholder="请输入招聘职位" onChange={_ => this.handleChange('post', _)}>
          招聘职位:
        </InputItem>
        <InputItem placeholder="请输入公司名称" onChange={_ => this.handleChange('company', _)}>
          公司名称:
        </InputItem>
        <InputItem placeholder="请输入职位薪资" onChange={_ => this.handleChange('salary', _)}>
          职位薪资:
        </InputItem>
        <TextareaItem
          title="职位要求:"
          placeholder="请输入职位要求"
          rows={3}
          onChange={_ => this.handleChange('info', _)}
        />
        <Button type="primary" onClick={this.save}>
          保&nbsp;&nbsp;&nbsp;存
        </Button>
      </>
    )
  }
}

export default connect(state => ({}), { authFailure, resetUser, receiveUser })(UserInfo)
