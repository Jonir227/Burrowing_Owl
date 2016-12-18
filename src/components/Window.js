import React, { PropType } from 'react';
import ImageLoader from './ImageLoader';
import LetterBox from './LetterBox';
import JsonData from './subtitle.json';
import VoicePlayer from './voicePlayer';
import Resizable from 'react-component-resizable'
import Modal from 'react-modal';
import AvoidBat from './avoidBat';
import Game2 from './game2';
import Draggame from './Draggame';
const customStyles = {
   content : {
     top: '50%',
     left: '50%',
     right: 'auto',
     bottom: 'auto',
     marginRight: '-50%',
     transform: 'translate(-50%, -50%)',
     zIndex: 100
   }
 };
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
      height: window.innerHeight,

      messageBoxVisible: false,
      gameVisible: true,
      currentGame: ()=><AvoidBat setGameSuccess = {this.setGameSuccess}
                                 setGameDone = {this.setGameDone}/>,
      gameDone: false,
      gameSuccess: false
    }
    this.onResize = this.onResize.bind(this);
    this.nextScript = this.nextScript.bind(this);
    this.prevScript = this.prevScript.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.renderGame = this.renderGame.bind(this);
    this.renderMessageBox = this.renderMessageBox.bind(this);
    this.setGameDone = this.setGameDone.bind(this);
    this.setGameSuccess = this.setGameSuccess.bind(this);
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

  setGameDone() {
    this.setState({gameDone: true, messageBoxVisible: true});
  }

  setGameSuccess() {
    this.setState({gameSuccess: true});
  }

  renderGame() {
    let NewGame = this.state.currentGame;
    return (
      <Modal isOpen={this.state.gameVisible}>
        <this.state.currentGame/>
        <button onClick = {() => {
          this.setState({gameVisible: false});
        }}> close </button>
        <button onClick = {() => {
          this.setState({currentGame: ()=><AvoidBat setGameSuccess = {this.setGameSuccess}
                                                    setGameDone = {this.setGameDone}/>});
        }}> New Game </button>
        {this.renderMessageBox()}
      </Modal>
    );
  }

  renderMessageBox(){
    return (
      <Modal isOpen={this.state.messageBoxVisible}
             style = {customStyles}>
        <h1> 축하드립니다. 게임에서 승리하셨습니다. </h1>
        <h1> 다시 하시겠습니까? </h1>
        <button onClick = {() => {
          this.setState({currentGame: ()=><AvoidBat setGameSuccess = {this.setGameSuccess}
                                                    setGameDone = {this.setGameDone}/>,
                                                    messageBoxVisible: false});
        }}> 예 </button>
        <button onClick = {()=>{
          this.setState({messageBoxVisible: false, gameVisible: false});
        }}> 아니오 </button>
      </Modal>
    )
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

                style = {{width: 50, height: 50, position: 'absolute', left: window.innerWidth - 50, top: 0, zIndex: 50}}/>
        
        {this.state.gameVisible && this.renderGame()}

      </div>
    )
  }
}
