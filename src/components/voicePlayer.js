import React, { PropType } from 'react';

export default class voicePlayer extends React.Component {
  render() {
    return (
      <audio
        src={this.props.audioSrc}
        type='audio/mp3'
        loop
        autoPlay
        onPause={this.props.onPause}
      />
    )
  }
}
