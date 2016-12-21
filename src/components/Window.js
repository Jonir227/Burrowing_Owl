import React, { PropType } from 'react';
import { BrowserRouter as Router, Link, Match, Miss } from 'react-router'
import Main from './Main'
import ImageLoader from './ImageLoader';
import LetterBox from './LetterBox';
import JsonData from './subtitle.json';
import Resizable from 'react-component-resizable'
import Modal from 'react-modal';
import AvoidBat from './avoidBat';
import CureSwallow from './cureSwallow';
import Owl from './owl';
import Draggame from './Draggame';

const backgroundUrl = ['./image/game2/swallow.png','./image/game/background.png','./image/game3/background.png'];
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

 const quizStyles = {
   content : {
     top: 0,
     left: 0,
     right: 0,
     bottom: 0
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

 const option = ['공', '기', '라', '하', '메', '흥', '놀', '갈', '메', '양', '부', '와', '고', '무', '랄', '행', '연', '강', '현', '수'];

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
      answer: '',
      rightAnswer: '흥부와놀부',
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
      gameStart : false,

      optionModal : false,
      subViet : true,
      voicePlay : true,
      gamePlay : true,
      onoffImage : './image/option/on.png',
      voiceImage : './image/option/on.png',
      gameImage : './image/option/on.png',
      finalMessageVisible: false,
      borderWidth : 0,
      quizVisible: false,
      owlScripts: ['착한 동생과 마음씨가 고약한 형이 나오는 동화였지?', '착한 동생 이름이 흥부였어!', '마음씨가 고약한 형의 이름은 무엇이었을까?']
    }
    this.renderQuiz = this.renderQuiz.bind(this);
    this.renderQuizOption = this.renderQuizOption.bind(this);
    this.onResize = this.onResize.bind(this);
    this.nextScript = this.nextScript.bind(this);
    this.prevScript = this.prevScript.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.renderGame = this.renderGame.bind(this);
    this.renderMessageBox = this.renderMessageBox.bind(this);
    this.renderInfo = this.renderInfo.bind(this);
    this.renderOption = this.renderOption.bind(this);
    this.toggleSub = this.toggleSub.bind(this);
    this.toggleGame = this.toggleGame.bind(this);
    this.toggleVoice = this.toggleVoice.bind(this);
    this.setGameDone = this.setGameDone.bind(this);
    this.setGameSuccess = this.setGameSuccess.bind(this);
    this.setScore = this.setScore.bind(this);
    this.renderFinalMessage = this.renderFinalMessage.bind(this);
  }
  onResize() {
    this.setState({
      width: window.innerWidth*0.99,
      height: window.innerHeight*0.98
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.gamePlay){
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
  }

  renderFinalMessage() {
    return (
      <Modal isOpen={this.state.finalMessageVisible}
             style = {messageBoxStyle}>
        <div style = {{textAlign : 'center', fontWeight: 'bold'}}>
          <h1> 축하해~ 퀴즈를 잘 풀었어! </h1>
          <h1> 다른 동화를 살펴보자! </h1>
          <Link to = '/Main'>          
            <img src = './image/Modal/check.PNG' style = {{position:'absolute', left:'45%', height: '15%', width :'10%'}}/>
          </Link>
        </div>
      </Modal>
    )
  }

  renderQuiz(){
      var x = this.state.width;
      var y = this.state.height;
      return (
        <Modal isOpen={this.state.quizVisible}
              style={quizStyles}>
          <div style = {{ background : 'url('+'./image/3.svg' +')', backgroundSize : 'cover', width : '100%', height : '100%', location : 'absolute', background: "skyBlue"}}>
            <Owl scripts = {this.state.owlScripts}
                 isDone = {!this.state.quizVisible}/>
            <img src = './image/closeIcon.svg'
                onClick = {()=>{
                  this.setState({quizVisible: false});
                }}
                style= {{width: 50, height: 50}}/>
            <h1 style = {{textAlign: 'center',position : 'absolute', top : 0, width : this.state.width * 0.98,
                          background : 'white', borderWidth : 1, borderColor : 'black',borderStyle : 'solid',fontSize : 40}}>Quiz: 이 동화의 제목은 무엇일까요?</h1>
            <img style = {{position: 'absolute', left: x * 0.17, bottom : y * 0.07, width : x * 0.04,height : y * 0.07, backgroundSize : 'cover'}}
                    onClick = {()=>{
                      this.setState({answer: this.state.answer.slice(0,-1)})
                    }}
                    src = './image/Modal/x.PNG'/>
            <img style = {{position: 'absolute', left: x * 0.47, bottom : y * 0.07, width : x * 0.04, height : y * 0.07, backgroundSize : 'cover'}}
                    onClick = {()=>{
                      if(this.state.rightAnswer === this.state.answer) {
                        this.setState({quizVisible: false, finalMessageVisible: true});
                      }
                    }}
                    src = './image/Modal/check.PNG'/>
            <div style = {{position: 'relative', top: y * 0.1, height: y * 0.1}}>
              <div style = {{position: 'absolute', left: x * 0.15, background: 'white', width: 100, height: 100, borderWidth : 1, borderColor : 'black',borderStyle : 'solid', borderRadius: 15}}>
                <div style = {{textAlign: 'center', position: 'absolute', left: '27.5%', top: '25%', fontSize : 50, fontWeight : 'bold'}}> {this.state.answer[0]} </div>
              </div>
              <div style = {{position: 'absolute', left: x * 0.15 + 100, background: 'white', width: 100, height: 100, borderWidth : 1, borderColor : 'black',borderStyle : 'solid', borderRadius: 15}}>
                <div style = {{textAlign: 'center', position: 'absolute', left: '27.5%', top: '25%', fontSize : 50, fontWeight : 'bold'}}> {this.state.answer[1]} </div>
              </div>
              <div style = {{position: 'absolute', left:x * 0.15 + 200, background: 'white', width: 100, height: 100, borderWidth : 1, borderColor : 'black',borderStyle : 'solid', borderRadius: 15}}>
                <div style = {{textAlign: 'center', position: 'absolute', left: '27.5%', top: '25%', fontSize : 50, fontWeight : 'bold'}}> {this.state.answer[2]} </div>
              </div>
              <div style = {{position: 'absolute', left: x * 0.15 + 300, background: 'white', width: 100, height: 100, borderWidth : 1, borderColor : 'black',borderStyle : 'solid', borderRadius: 15}}>
                <div style = {{textAlign: 'center', position: 'absolute', left: '27.5%', top: '25%', fontSize : 50, fontWeight : 'bold'}}> {this.state.answer[3]} </div>
              </div>
              <div style = {{position: 'absolute', left: x * 0.15 + 400, background: 'white', width: 100, height: 100, borderWidth : 1, borderColor : 'black',borderStyle : 'solid', borderRadius: 15}}>
                <div style = {{textAlign: 'center', position: 'absolute', left: '27.5%', top: '25%', fontSize : 50, fontWeight : 'bold'}}> {this.state.answer[4]} </div>
              </div>
              {this.renderQuizOption()}
            </div>
          </div>
        </Modal>
      )
  }

  renderQuizOption(){
    var x = this.state.width;
    var y = this.state.height;
    return (
      <div style = {{position: 'relative', top : this.state.width * 0.05, left: x * 0.15}}>
        {option.map((value,i)=>{
          return (
            <button style = {{position: 'absolute', left: 100 * (i % 5), top: (y / 15) + (100 * Math.floor(i / 5)), width: 100, height: 100, background: 'yellow', borderWidth : 1, borderColor : 'black', color: 'black',  fontWeight: 'bold'}}
              onClick = {() => {
                (this.state.answer.length < 5) && this.setState({answer: this.state.answer + option[i]})
              }}>
              <div style = {{fontSize: 20}}>
                {value}
              </div>
            </button>
          );
        })}
      </div>
    );
  }

  nextScript(){
    this.setState({scriptPage : this.state.scriptPage + 1})
  }

  prevScript(){
    this.setState({scriptPage : this.state.scriptPage - 1})
  }
  nextPage(){
    if(this.state.page == this.state.max - 1) {
      this.setState({quizVisible: true});
    } else {
      this.setState({
        page : this.state.page+1,
        scriptPage : 0,
        scriptDone : false
      })
    }    
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

  renderOption(optionStyle){

    return(
      <Modal isOpen ={this.state.optionModal} style = {optionStyle}>
          <img src = './image/option/close.png' style = {{left : '5%',top : '5%', postion : 'absolute', width : '7%', height : '14%'}} onClick = {()=> this.setState({optionModal : false})}/>
          <h1 style = {{top : '20%', left : '10%', width : this.state.width * 0.15, height : this.state.height * 0.1, fontWeight : 'bold', position : 'absolute'}}>처음으로</h1>
          <Link to = "/Main"><img src = './image/option/home.png' style = {{left : '70%', top : '20%', width : '10%', height : '15%', position : 'absolute'}}/></Link>
          <h1 style = {{top : '40%', left : '10%', width : this.state.width * 0.15, height : this.state.height * 0.1, fontWeight : 'bold', position : 'absolute'}}>베트남 자막</h1>
          <img src = {this.state.onoffImage} style = {{left : '70%', top : '40%', width : '10%', height : '10%', position : 'absolute'}} onClick = {()=> this.toggleSub()}/>
          <h1 style = {{top : '60%', left : '10%', width : this.state.width * 0.15, height : this.state.height * 0.1, fontWeight : 'bold', position : 'absolute'}}>나레이션</h1>
          <img src = {this.state.voiceImage} style = {{left : '70%', top : '60%', width : '10%', height : '10%', position : 'absolute'}} onClick = {()=> this.toggleVoice()}/>
          <h1 style = {{top : '80%', left : '10%', width : this.state.width * 0.15, height : this.state.height * 0.1, fontWeight : 'bold', position : 'absolute'}}>미니게임</h1>
          <img src = {this.state.gameImage} style = {{left : '70%', top :'80%', width : '10%', height : '10%', position : 'absolute' }} onClick = {()=> this.toggleGame()}/>         
      </Modal>
      
    )
  }
  toggleSub(){
    if(!this.state.subViet)
      this.setState({subViet : true, onoffImage : './image/option/on.png'});
    else this.setState({subViet : false, onoffImage : './image/option/off.png'});
  }
  toggleVoice(){
    if(!this.state.voicePlay)
      this.setState({voicePlay : true, voiceImage : './image/option/on.png'});
    else this.setState({voicePlay : false, voiceImage : './image/option/off.png'});
  }
  toggleGame(){
    if(!this.state.gamePlay)
      this.setState({gamePlay : true, gameImage : './image/option/on.png'});
    else this.setState({gamePlay : false, gameImage : './image/option/off.png'});
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
          }} src = './image/Modal/check.PNG' style = {{position:'absolute', left:'30%', height: '15%', width :'10%'}}></img>
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
          }}src = './image/Modal/x.PNG' style = {{position:'absolute', right:'30%', height: '15%', width :'10%'}}></img>
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
      const optionStyle = {
                content : {
                    background: '#FAE6A2',
                    top: '20%',
                    left: '20%',
                    width : this.state.width * 0.6,
                    height : this.state.height * 0.6,
                    zIndex: 200,
                    overflow : 'hidden'
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
                    subViet = {this.state.subViet}
                    scriptViet = {JsonData.HeungbooNolboo.data[this.state.page].scriptViet}
                    scriptPage = {this.state.scriptPage}
                    scriptDone = {this.state.scriptDone}
                    nextScript = {this.nextScript}
                    prevScript = {this.prevScript}
                    narration = {JsonData.HeungbooNolboo.data[this.state.page].script[this.state.scriptPage][1]}
                    page = {this.state.page}
                    nextPage = {this.nextPage}
                    prevPage = {this.prevPage}
                    audioSrc = {(JSON.stringify(JsonData.HeungbooNolboo.data[this.state.page].narration).substr(1,JsonData.HeungbooNolboo.data[this.state.page].narration.length ) + (this.state.scriptPage + 1) +".mp3")}
                    onPause = {this.state.voicePlay}
                    gameVisible = {this.state.gameVisible}
                    quizVisible = {this.state.quizVisible}/>
            <img src = './image/option/setting.png' style = {{ left : '0.7%', top : '1%', width : '4%', height : '8%', position : 'absolute', borderRadius : 15, borderStyle : 'solid', borderColor : 'white', borderWidth : this.state.borderWidth}}
                 onClick = {()=>{this.setState({optionModal : true})}}  onMouseEnter={()=> {this.setState({borderWidth : 5})}} onMouseLeave={()=> {this.setState({borderWidth : 0})}}/>


          {this.state.gameVisible && !this.state.gameStart &&<div stlye = {{ left : 0, top : 0, zIndex : 50, position : 'absolute'}}>
            <img src = {backgroundUrl[this.state.gameNumber]} style = {{ width : this.state.width, height : this.state.height, left : 0, top : 0, position : 'absolute'}}/>
            {this.state.gameNumber == 1&&<img src = './image/game/hero.png' style = {{top:  this.state.height - 150, left: this.state.width/2 - 50, width: 100, height: 150, position: 'absolute'}}/>}</div>}
          {this.state.gameVisible && this.state.gameStart && this.renderGame()}
          {this.state.gameInfo && this.renderInfo(modalStyle)}
          {this.state.optionModal && this.renderOption(optionStyle)}
          {this.state.quizVisible && this.renderQuiz()}
          {this.state.finalMessageVisible && this.renderFinalMessage()}
        </div>
      </Resizable>
    )

  }
}
