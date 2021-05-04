import { Grid } from 'antd-mobile'
import React, { Component } from 'react'

export default class Emoji extends Component {
  componentWillMount() {
    const emojis = [
      '😀',
      '😃',
      '😄',
      '😁',
      '😆',
      '😅',
      '🤣',
      '😂',
      '😀',
      '😃',
      '😄',
      '😁',
      '😆',
      '😅',
      '🤣',
      '😂',
      '😀',
      '😃',
      '😄',
      '😁',
      '😆',
      '😅',
      '🤣',
      '😂',
      '😀',
      '😃',
      '😄',
      '😁',
      '😆',
      '😅',
      '🤣',
      '😂',
      '😀',
      '😃',
      '😄',
      '😁',
      '😆',
      '😅',
      '🤣',
      '😂',
      '😀',
      '😃',
      '😄',
      '😁',
      '😆',
      '😅',
      '🤣',
      '😂',
      '😀',
      '😃',
      '😄',
      '😁',
      '😆',
      '😅',
      '🤣',
      '😂',
      '😀',
      '😃',
      '😄',
      '😁',
      '😆',
      '😅',
      '🤣',
      '😂'
    ]
    this.emojis = emojis.map(emoji => ({ text: emoji }))
  }

  render() {
    const { isShow, changeContent } = this.props
    return (
      <>
        {isShow && (
          <Grid
            data={this.emojis}
            columnNum={8}
            carouselMaxRow={4}
            isCarousel
            onClick={item => changeContent(item.text)}
          ></Grid>
        )}
      </>
    )
  }
}
