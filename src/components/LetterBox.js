import React, { PropType } from 'react';
import { BrowserRouter as Router, Link, Match, Miss } from 'react-router'
import JsonData from './subtitle.json';
import {Motion, spring, presets, precision} from 'react-motion';
import Modal from 'react-modal';
import MessageBox from './messageBox';

const defaultConfig = {
  stiffness: 40
};
const narrationImg = ['./image/owl.png','./image/hb.jpg','./image/nb.jpg']
const option = ['공', '기', '라', '하', '메', '흥', '놀', '갈', '메', '양', '부', '와', '고', '무', '랄', '행', '연', '강', '현', '수'];
const styles = {
  boxStyle: {
    background : 'black',
    padding : 10,
    borderWidth : 1,
    borderColor : 'white',
    borderStyle : 'solid',
    marginLeft : '10%'
  },
  letterStyle : {
    fontFamily : "맑은 고딕",
    fontSize : 50,
    color : 'white',
    textAlign: 'center'
  },
  buttonStyleRight : {
    float : 'right',
    background : 'white',
    marginRight: 10,
    fontSize : 20,
    borderColor : 'black'
  },
  buttonStyleLeft : {
    background : 'white',
    float: 'right',
    fontSize : 20,
    borderColor : 'black'
  }
};

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

const quizStyles = {
  content : {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
};

export default class LetterBox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isDispeared: false,
      modalVisible: false,

      quizVisible: true,
      answer: '',
      rightAnswer: '흥부와놀부',
      scriptn: 0,
      narrationImg : './image/image1.png',
      width : window.innerWidth,
      height : window.innerHeight

    }
    this.toggleModalVisible = this.toggleModalVisible.bind(this);
    this.renderQuiz = this.renderQuiz.bind(this);
    this.renderOption = this.renderOption.bind(this);
  }


  toggleModalVisible(){
    this.setState({modalVisible: !this.state.modalVisible});
  }

  renderModal(){
    return (


      <MessageBox boxVisible={this.state.modalVisible}
                  customStyles={customStyles}
                  isLink = {true}
                  title = '미니게임을 진행하시겠습니까?'
                  path = './GameContainer/Game'
                  rightButtonEvent={this.toggleModalVisible}/>
    )
  }

  renderQuiz(){
    
      var x = this.state.width;
      var y = this.state.height;
      return (
        <Modal isOpen={this.state.quizVisible}
              style={quizStyles}>
          <div style = {{ background : 'url('+'./image/3.svg' +')', backgroundSize : 'cover', width : '100%', height : '100%', location : 'absolute'}}>
            <img src = './image/closeIcon.svg'
                onClick = {()=>{
                  this.setState({quizVisible: false});
                }}
                style= {{width: 50, height: 50}}/>
            <h1 style = {{textAlign: 'center',position : 'absolute', top : 0, left : x * 0.25, width : x * 0.5, 
                          background : 'white', borderWidth : 1, borderColor : 'black',borderStyle : 'solid',fontSize : 40}}>Quiz: 이 동화의 제목은 무엇일까요?</h1>
            <button style = {{position: 'absolute', left: x * 0.4, top : y * 0.1, width : x * 0.03,height : y * 0.06, background : 'url('+'./image/backSpace.png'+')', backgroundSize : 'cover', backgroundColor : 'white',
                              borderWidth : 1, borderColor : 'black',borderStyle : 'solid'}}
                    onClick = {()=>{
                      this.setState({answer: this.state.answer.slice(0,-1)})
                    }}></button>
            <button style = {{position: 'absolute', left: x * 0.55, top : y * 0.1, width : x * 0.03, height : y * 0.06, background : 'url('+'./image/check.png'+')', backgroundSize : 'cover', backgroundColor : 'white',
                              borderWidth : 1, borderColor : 'black',borderStyle : 'solid'}}
                    onClick = {()=>{
                      if(this.state.rightAnswer === this.state.answer) {
                        alert('Congraturation');
                        this.setState({quizVisible: false});
                      }
                      else alert('try again');
                    }}></button>
            <div style = {{position: 'relative', top: y * 0.1, height: y * 0.1}}>
              <div style = {{position: 'absolute', left: x * 0.3, background: 'yellow', width: 70, height: 70, borderWidth : 1, borderColor : 'black',borderStyle : 'solid', borderRadius: 15}}>
                <div style = {{textAlign: 'center', top: '100%', fontSize : 50, fontWeight : 'bold'}}> {this.state.answer[0]} </div>
              </div>
              <div style = {{position: 'absolute', left: x * 0.3 + 150, background: 'yellow', width: 70, height: 70, borderWidth : 1, borderColor : 'black',borderStyle : 'solid', borderRadius: 15}}>
                <div style = {{textAlign: 'center', top: '100%', fontSize : 50, fontWeight : 'bold'}}> {this.state.answer[1]} </div>
              </div>
              <div style = {{position: 'absolute', left:x * 0.3 + 300, background: 'yellow', width: 70, height: 70, borderWidth : 1, borderColor : 'black',borderStyle : 'solid', borderRadius: 15}}>
                <div style = {{textAlign: 'center', top: '100%', fontSize : 50, fontWeight : 'bold'}}> {this.state.answer[2]} </div>
              </div>
              <div style = {{position: 'absolute', left: x * 0.3 + 450, background: 'yellow', width: 70, height: 70, borderWidth : 1, borderColor : 'black',borderStyle : 'solid', borderRadius: 15}}>
                <div style = {{textAlign: 'center', top: '100%', fontSize : 50, fontWeight : 'bold'}}> {this.state.answer[3]} </div>
              </div>
              <div style = {{position: 'absolute', left: x * 0.3 + 600, background: 'yellow', width: 70, height: 70, borderWidth : 1, borderColor : 'black',borderStyle : 'solid', borderRadius: 15}}>
                <div style = {{textAlign: 'center', top: '100%', fontSize : 50, fontWeight : 'bold'}}> {this.state.answer[4]} </div>
              </div>
              {this.renderOption()}
            </div>
          </div>
        </Modal>
      )
  }

  renderOption(){
   return (
      <div style = {{position: 'relative', top : this.state.width * 0.05, left: this.state.height * 0.7}}>
        {option.map((value,i)=>{
          return (
            <button style = {{position: 'absolute', left: 100 * (i % 5), top: 100 * Math.floor(i / 5), width: 70, height: 70, background: 'green', borderWidth : 1, borderColor : 'black',borderStyle : 'solid', borderRadius: 15}}
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

  render() {

    return (
      <div style = {{ height : window.innerHeight * 0.15}}>
        <img style = {{ width : window.innerWidth * 0.1, height : window.innerHeight * 0.12, position : 'absolute'}} src = {narrationImg[this.props.narration]}/>
        <div style = {styles.boxStyle}>
          <Motion defaultStyle={{opacity: 0, fontSize : 60, color : 'white', textAlign: 'center'}} style={{opacity: spring((this.state.isDispeared) ? 0 : 1, defaultConfig), fontSize : 50, color : 'white', textAlign: 'center'}}>
            {interpolatingStyle =>
              <div style = {interpolatingStyle}>{this.props.script[this.props.scriptPage][0]}</div>
            }
          </Motion>
          <button style = {styles.buttonStyleRight} onClick = {()=>{

            if(this.props.page == 16){

              this.toggleModalVisible();
            }
            else {
              if(this.props.scriptPage < this.props.script.length - 1){
                if(this.state.isDispeared){ this.props.nextScript(); this.setState({isDispeared: false}); }
                else this.setState({isDispeared: true});
              }
              else{
                if(this.state.isDispeared){
                  this.setState({
                    isDispeared: false
                  });
                  this.props.nextPage();
                }
                else this.setState({isDispeared: true});
              }
            }
          }}> next </button>
        <button style = {styles.buttonStyleLeft} onClick = {()=>{
            if(this.props.scriptPage > 0) this.props.prevScript();
            else{
              this.setState({
                isDispeared : false
              })
              this.props.prevPage();
            }
          }}> prev </button>
          <Link to = "/Main">
            <button style = {styles.buttonStyleLeft}>menu</button>
          </Link>
        </div>
        {this.state.modalVisible && this.renderModal()}
        {this.state.quizVisible && this.renderQuiz()}
      </div>
    );
  }
}
