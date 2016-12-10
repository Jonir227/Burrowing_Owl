import React, { PropType } from 'react';
import ImageLoader from './ImageLoader';
import LetterBox from './LetterBox';
import JsonData from './subtitle.json';
import VoicePlayer from './voicePlayer';

export default class Window extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      page : 0,
      max : JsonData.HeungbooNolboo.page,
      done : false,
      isMuted: false
    }
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
  }
  nextPage(){
    if(this.state.page == this.state.max - 1) return;
    this.setState({
      page : this.state.page+1
    })
  }
  prevPage(){
    if(this.state.page < 1) return;
    this.setState({
      page:this.state.page-1
    })
  }

  render(){
    return (
      <div>
        <ImageLoader image = {JsonData.HeungbooNolboo.data[this.state.page].image}
                     isZoom = {JsonData.HeungbooNolboo.data[this.state.page].isZoom}/>
        <LetterBox script = {JsonData.HeungbooNolboo.data[this.state.page].script}
                   page = {this.state.page}
                   nextPage = {this.nextPage}
                   prevPage = {this.prevPage}/>
        <VoicePlayer audioSrc = './audio/zeze.mp3'
                     onPause = {this.state.isMuted}/>
        <button onClick = {() => {
          this.setState({isMuted: !this.state.isMuted})
        }}>
          <img src = {(this.state.isMuted) ? './image/mute.svg' : './image/voice.png'}
                style = {{width: 50, height: 50, position: 'absolute', left: window.innerWidth - 50, top: 0, zIndex: 50}}/>
        </button>
      </div>
    )
  }
}
