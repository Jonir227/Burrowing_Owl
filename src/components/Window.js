import React, { PropType } from 'react';
import ImageLoader from './ImageLoader';
import LetterBox from './LetterBox';
import JsonData from './subtitle.json';
import VoicePlayer from './voicePlayer';
import Resizable from 'react-component-resizable'
export default class Window extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      page : 0,
      max : JsonData.HeungbooNolboo.page,
      scriptPage : 0,
      scriptDone : false,
      isMuted: false,
      width: window.innerWidth,
      height: window.innerHeight
    }
    this.onResize = this.onResize.bind(this);
    this.nextScript = this.nextScript.bind(this);
    this.prevScript = this.prevScript.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
  }
  onResize() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    })

  }
  nextScript(){
    this.setState({scriptPage : this.state.scriptPage + 1})
   
  }
  prevScript(){
    this.setState({scriptPage : this.state.scriptPage - 1})
    
  }
  nextPage(){
    if(this.state.page == this.state.max - 1) return;
    this.setState({
      page : this.state.page+1,
      scriptPage : 0,
      scriptDone : false
    })
  }
  prevPage(){
    if(this.state.page < 1) return;
    this.setState({
      page:this.state.page-1,
      scriptPage : 0,
      scriptDone : false
    })
  }
  
  render(){
    return (
      <div style = {{width : this.state.width, height : this.state.height}}>
        <ImageLoader image = {JsonData.HeungbooNolboo.data[this.state.page].image}
                     isZoom = {JsonData.HeungbooNolboo.data[this.state.page].isZoom}
                     scriptPage = {this.state.scriptPage}
                     />
        <LetterBox script = {JsonData.HeungbooNolboo.data[this.state.page].script}
                   scriptPage = {this.state.scriptPage}
                   scriptDone = {this.state.scriptDone}
                   nextScript = {this.nextScript}
                   prevScript = {this.prevScript}
                   narration = {JsonData.HeungbooNolboo.data[this.state.page].script[this.state.scriptPage][1]}
                   page = {this.state.page}
                   nextPage = {this.nextPage}
                   prevPage = {this.prevPage}/>
        <VoicePlayer audioSrc = './audio/zeze.mp3'
                     onPause = {this.state.isMuted}/>
          <img src = {(this.state.isMuted) ? './image/mute.svg' : './image/voice.png'}
                style = {{width: 50, height: 50, position: 'absolute', left: window.innerWidth - 50, top: 0, zIndex: 50}}
                onClick = {() => {
                    this.setState({isMuted: !this.state.isMuted})
              }}/>
      </div>
    )
  }
}
