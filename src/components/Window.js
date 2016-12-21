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
const backgroundUrl = ['./image/game2/swallow.png','./image/game/background.png','./image/game3/background.png']
const messageBoxStyle = {
   content : {
     background: '#FAE6A2',
     top: '30%',
     left: '30%',
     right: '30%',
     bottom: '30%',
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
      gameNumber: 0,
      gameInfo : false,
      gameTitle : "제비 다리를 고쳐줘!",
      gameInfoImage : './image/game2/',
      gameInfoIndex : 1,
      gameStart : false
    }
    this.onResize = this.onResize.bind(this);
    this.nextScript = this.nextScript.bind(this);
    this.prevScript = this.prevScript.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.renderGame = this.renderGame.bind(this);
    this.renderMessageBox = this.renderMessageBox.bind(this);
    this.renderInfo = this.renderInfo.bind(this);
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
      this.setState({gameVisible: true, gameNumber : 0, gameInfo : true, gameTitle : "제비 다리를 고쳐줘!", gameInfoImage : './image/game2/', gameInfoIndex : 1, gameStart : false});
    }else if(JsonData.HeungbooNolboo.data[prevState.page].script.length - 1 === prevState.scriptPage && prevState.page === 17){
      this.setState({gameVisible : true,
                     gameNumber : 1,
                     gameInfo : true,
                     gameTitle : "도깨비 방망이를 피해봐!",
                     gameInfoImage : './image/game/',
                     gameInfoIndex : 1,
                     gameStart : false,
                     currentGame: ()=><AvoidBat setGameSuccess = {this.setGameSuccess}
                                                setGameDone = {this.setGameDone}
                                                setScore = {this.setScore}/>});
    } else if(JsonData.HeungbooNolboo.data[prevState.page].script.length - 1 === prevState.scriptPage && prevState.page === 6) {
      this.setState({gameVisible: true,
                     gameNumber : 2,
                     gameInfo : true,
                     gameTitle : "제비가 준 박씨를 심어봐!",
                     gameInfoImage : './image/game3/',
                     gameInfoIndex : 1,
                     gameStart : false,
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
        { (this.state.score !== -1) && <h1 style = {{textAlign : 'center', fontWeight: 'bold'}}> 당신의 기록은 {this.state.score} 입니다! </h1> }
        { (this.state.gameSuccess) ?
          <div style = {{textAlign : 'center', fontWeight: 'bold'}}>
          <h1> 축하드립니다. 미션을 성공하셨네요! </h1>
          <h1> 다시 하시겠습니까? </h1>
          <img onClick = {() => {
              if(this.state.page === 5){
                this.setState({currentGame: ()=><CureSwallow setGameSuccess = {this.setGameSuccess}
                                                             setGameDone = {this.setGameDone}
                                                             setScore = {this.setScore}/>,
                                                             messageBoxVisible: false,
                                                             gameSuccess: false});
              } else if(this.state.page === 18) {
                 this.setState({currentGame: ()=><AvoidBat    setGameSuccess = {this.setGameSuccess}
                                                              setGameDone = {this.setGameDone}
                                                              setScore = {this.setScore}/>,
                                messageBoxVisible: false,
                                gameSuccess: false
                              });
               }
              else if(this.state.page === 7) {
                this.setState({gameVisible: true,
                               currentGame: ()=><Draggame    setGameSuccess = {this.setGameSuccess}
                                                             setGameDone = {this.setGameDone}
                                                             setScore = {this.setScore}/>,
                                                             messageBoxVisible: false,
                                                             gameSuccess: false});
              }
          }} src = './image/Modal/check.PNG' style = {{position:'absolute', left:'30%', height:80, width :80}}></img>
          <img onClick = {()=>{
            if(this.state.page === 5){
            this.setState({messageBoxVisible: false, gameVisible: false, gameSuccess: false,
                           currentGame: ()=><CureSwallow setGameSuccess = {this.setGameSuccess}
                                                         setGameDone = {this.setGameDone}
                                                         setScore = {this.setScore}/>});
            }else if(this.state.page === 18) {
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
          }}src = './image/Modal/x.PNG' style = {{position:'absolute', right:'30%', height:80, width :80}}></img>
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
            } else if(this.state.page === 18) {
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
  renderInfo(modalStyle){
      
      
        return(
            <Modal isOpen = {this.state.gameInfo} style = {modalStyle}>
                <h1>{this.state.gameTitle}</h1>
                <img src = './image/game2/부엉이.png' style = {{position : 'absolute',top : this.state.height * 0.15,width : this.state.width * 0.1, height : this.state.height * 0.1}}/>
                <div>
                    <img src = './image/game2/textbox.png' style = {{position : 'absolute', top : this.state.height * 0.1, left : this.state.width * 0.12, width : this.state.width * 0.5, height : this.state.height * 0.5}}/>
                    <img src = {this.state.gameInfoImage + "info" + String(this.state.gameInfoIndex) + ".png" } 
                         style = {{position : 'absolute', top : this.state.height * 0.15, left : this.state.width * 0.2, width : this.state.width * 0.4, height : this.state.height * 0.4}}/> 
                    {(this.state.gameInfoIndex != 3) &&<div style = {{position : 'absolute', top : this.state.height * 0.55, left : this.state.width * 0.52, width : this.state.width * 0.04, height : this.state.height * 0.03,
                                                                      background : 'white', borderColor : 'black', borderWidth : 3, borderStyle : 'solid', borderRadius: 15, textAlign : 'center',fontSize : 20, fontWeight : 'bold'}}
                            onClick = {()=>{this.setState({gameInfoIndex : this.state.gameInfoIndex + 1})}}>다음</div>}
                    {(this.state.gameInfoIndex == 3) &&<div style = {{position : 'absolute', top : this.state.height * 0.55, left : this.state.width * 0.52, width : this.state.width * 0.04, height : this.state.height * 0.03,
                                                                      background : 'white', borderColor : 'black', borderWidth : 3, borderStyle : 'solid', borderRadius: 15, textAlign : 'center',fontSize : 20, fontWeight : 'bold'}}
                            onClick = {()=>{this.setState({gameInfo : false, gameStart : true})}}>시작</div>}
                    {(this.state.gameInfoIndex != 1) &&<div style = {{position : 'absolute', top : this.state.height * 0.55, left : this.state.width * 0.47, width : this.state.width * 0.04, height : this.state.height * 0.03,
                                                                      background : 'white', borderColor : 'black', borderWidth : 3, borderStyle : 'solid', borderRadius: 15, textAlign : 'center',fontSize : 20, fontWeight : 'bold'}}
                            onClick = {()=>{this.setState({gameInfoIndex : this.state.gameInfoIndex - 1})}}>이전</div>}
                    
                </div>
            </Modal>

        )
    }
  render(){
      const modalStyle = {
                content : {
                    top: '20%',
                    left: '20%',
                    width : this.state.width * 0.6,
                    height : this.state.height * 0.6,
                    zIndex: 100
                }
            };
      
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
          {this.state.gameVisible && !this.state.gameStart &&<div><img src = {backgroundUrl[this.state.gameNumber]} style = {{ width : this.state.width, height : this.state.height, left : 0, top : 0, position : 'absolute'}}/>
            {this.state.gameNumber == 1&&<img src = './image/game/hero.png' style = {{top:  this.state.height - 150, left: this.state.width/2 - 50, width: 100, height: 150, position: 'absolute'}}/>}</div>}
          {this.state.gameVisible && this.state.gameStart && this.renderGame()}
          {this.state.gameInfo && this.renderInfo(modalStyle)}

        </div>
      </Resizable>
    )
    
  }
}