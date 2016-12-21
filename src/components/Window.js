import React, { PropType } from 'react';
import ImageLoader from './ImageLoader';
import LetterBox from './LetterBox';
import JsonData from './subtitle.json';
import VoicePlayer from './voicePlayer';
import Resizable from 'react-component-resizable'
import Modal from 'react-modal';
import AvoidBat from './avoidBat';
import CureSwallow from './cureSwallow';
import Draggame from './Draggame';

const messageBoxStyle = {
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

 const gameStyle = {
   content : {
     top: 0,
     left: 0,
     right: 0,
     bottom: 0,
     overflow : 'hidden',
     width : window.innerWidth * 0.99,
     height : window.innerHeight * 0.98
   }
 }

export default class Window extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      page : 0,
      max : JsonData.HeungbooNolboo.page,
      scriptPage : 0,
      scriptDone : false,
      isMuted: false,
      width: window.innerWidth*0.99,
      height: window.innerHeight*0.98,
      messageBoxVisible: false,
      gameVisible: false,
      currentGame: ()=><CureSwallow setGameSuccess = {this.setGameSuccess}
                                    setGameDone = {this.setGameDone}
                                    setScore = {this.setScore}/>,
      gameDone: false,
      gameSuccess: false,
      score: 0,
      goal: 0,
      gameNumber: 0
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
    this.setScore = this.setScore.bind(this);
  }
  onResize() {
    this.setState({
      width: window.innerWidth*0.99,
      height: window.innerHeight*0.98
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if(JsonData.HeungbooNolboo.data[prevState.page].script.length - 1 === prevState.scriptPage && prevState.page === 4) {
      this.setState({gameVisible: true});
    } else if(JsonData.HeungbooNolboo.data[prevState.page].script.length - 1 === prevState.scriptPage && prevState.page === 16){
      this.setState({gameVisible: true,
                     currentGame: ()=><AvoidBat setGameSuccess = {this.setGameSuccess}
                                                setGameDone = {this.setGameDone}
                                                setScroe = {this.setScroe}/>});
    } else if(JsonData.HeungbooNolboo.data[prevState.page].script.length - 1 === prevState.scriptPage && prevState.page === 6) {
      this.setState({gameVisible: true,
                     currentGame: ()=><Draggame    setGameSuccess = {this.setGameSuccess}
                                                   setGameDone = {this.setGameDone}
                                                   setScore = {this.setScore}/>});
    }
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

  setScore(score) {
    this.setState({score: score});
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
      <Modal isOpen={this.state.gameVisible}
             style={gameStyle}>
        <this.state.currentGame/>
        {this.renderMessageBox()}
      </Modal>
    );
  }

  renderMessageBox(){
    return (
      <Modal isOpen={this.state.messageBoxVisible}
             style = {messageBoxStyle}>
        { (this.state.score !== -1) && <h1> 당신의 기록은 {this.state.score} 입니다! </h1> }
        { (this.state.gameSuccess) ?
          <div>
          <h1> 축하드립니다. 미션을 성공하셨네요! </h1>
          <h1> 다시 하시겠습니까? </h1>
          <button onClick = {() => {
              if(this.state.page === 5){
                this.setState({currentGame: ()=><CureSwallow setGameSuccess = {this.setGameSuccess}
                                                             setGameDone = {this.setGameDone}
                                                             setScore = {this.setScore}/>,
                                                             messageBoxVisible: false,
                                                             gameSuccess: false});
              } else if(this.state.page === 17) {
                 this.setState({currentGame: ()=><AvoidBat    setGameSuccess = {this.setGameSuccess}
                                                              setGameDone = {this.setGameDone}
                                                              setScore = {this.setScore}/>,
                                                              messageBoxVisible: false,
                                                              gameSuccess: false});
               }
              else if(this.state.page === 7) {
                this.setState({gameVisible: true,
                               currentGame: ()=><Draggame    setGameSuccess = {this.setGameSuccess}
                                                             setGameDone = {this.setGameDone}
                                                             setScore = {this.setScore}/>,
                                                             messageBoxVisible: false,
                                                             gameSuccess: false});
              }
          }}> 예 </button>
          <button onClick = {()=>{
            if(this.state.page === 5){
            this.setState({messageBoxVisible: false, gameVisible: false, gameSuccess: false,
                           currentGame: ()=><CureSwallow setGameSuccess = {this.setGameSuccess}
                                                         setGameDone = {this.setGameDone}
                                                         setScore = {this.setScore}/>});
            }else if(this.state.page === 17) {
                 this.setState({currentGame: ()=><AvoidBat    setGameSuccess = {this.setGameSuccess}
                                                              setGameDone = {this.setGameDone}
                                                              setScore = {this.setScore}/>,
                                                              messageBoxVisible: false,
                                                              gameSuccess: false,
                                                              gameVisible: false});
            } else if(this.state.page === 7) {
                this.setState({gameVisible: true,
                               currentGame: ()=><Draggame    setGameSuccess = {this.setGameSuccess}
                                                             setGameDone = {this.setGameDone}
                                                             setScore = {this.setScore}/>,
                                                             messageBoxVisible: false,
                                                             gameSuccess: false,
                                                             gameVisible: false});
            }

          }}> 아니오 </button>
          </div>
          :
          <div>
          <h1> 아쉽게도 성공하지 못했어요! 다시 도전해보세요 </h1>
          <button onClick = {() => {
            if(this.state.page === 5) {
              this.setState({currentGame: ()=><CureSwallow setGameSuccess = {this.setGameSuccess}
                                                           setGameDone = {this.setGameDone}
                                                           setScore = {this.setScore}/>,
                                                           messageBoxVisible: false});
            } else if(this.state.page === 17) {
               this.setState({currentGame: ()=><AvoidBat    setGameSuccess = {this.setGameSuccess}
                                                            setGameDone = {this.setGameDone}
                                                            setScore = {this.setScore}/>,
                                                            messageBoxVisible: false,
                                                            gameSuccess: false});
             }
            else if(this.state.page === 6) {
              this.setState({gameVisible: true,
                             currentGame: ()=><Draggame    setGameSuccess = {this.setGameSuccess}
                                                           setGameDone = {this.setGameDone}
                                                           setScore = {this.setScore}/>,
                                                           messageBoxVisible: false,
                                                           gameSuccess: false});
            }
          }}> 다시 도전하기 </button>
          </div>
        }
      </Modal>
    )
  }

  render(){
      return(
      <Resizable onResize ={this.onResize}>
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
                    prevPage = {this.prevPage}
                    audioSrc = {(JSON.stringify(JsonData.HeungbooNolboo.data[this.state.page].narration).substr(1,JsonData.HeungbooNolboo.data[this.state.page].narration.length ) + (this.state.scriptPage + 1) +".mp3")}
                    onPause = {this.state.isMuted}
                    gameVisible = {this.state.gameVisible}/>
            <img src = {(this.state.isMuted) ? './image/mute.svg' : './image/voice.png'}

                  style = {{width: 50, height: 50, position: 'absolute', left: window.innerWidth - 50, top: 0, zIndex: 50}}/>
          {this.state.gameVisible && this.renderGame()}

        </div>
      </Resizable>
    )
    
  }
}