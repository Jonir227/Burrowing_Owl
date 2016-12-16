import React, { PropType } from 'react';
import { BrowserRouter as Router, Link, Match, Miss } from 'react-router'
import JsonData from './subtitle.json';
import {Motion, spring, presets, precision} from 'react-motion';
import Modal from 'react-modal';
import MessageBox from './messageBox';
const defaultConfig = {
  stiffness: 40
};
const option = ['공', '기', '라', '하', '메', '흥', '놀', '갈', '메', '양', '부', '와', '고', '무', '랄', '행', '연', '강', '현', '수'];
const styles = {
  boxStyle: {
    background : 'black',
    padding : 10,
    borderWidth : 1,
    borderColor : 'white',
    borderStyle : 'solid',
    location : 'absolute'
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
    borderColor : 'white'
  },
  buttonStyleLeft : {
    background : 'white',
    float: 'right',
    fontSize : 20,
    borderColor : 'black'
  },
  answerStyle : {
    textAlign: 'center',
    marginTop: '45%',
    fontSize: '15'
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
      scriptn: 0

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
                  path = './GameContainer/AvoidBat'
                  rightButtonEvent={this.toggleModalVisible}/>
    )
  }

  renderQuiz(){
    return (
      <Modal isOpen={this.state.quizVisible}
             style={quizStyles}>
        <div>
          <img src = './image/closeIcon.svg'
               onClick = {()=>{
                 this.setState({quizVisible: false});
               }}
               style= {{width: 50, height: 50}}/>
          <h1 style = {{textAlign: 'center'}}>Quiz: 이 동화의 제목은 무엇일까요?</h1>
          <button style = {{position: 'absolute', left: 480}}
                  onClick = {()=>{
                    this.setState({answer: this.state.answer.slice(0,-1)})
                  }}> Delete </button>
          <button style = {{position: 'absolute', left: 900}}
                  onClick = {()=>{
                    if(this.state.rightAnswer === this.state.answer) {
                      alert('Congraturation');
                      this.setState({quizVisible: false});
                    }
                    else alert('try again');
                  }}> Submit </button>
          <div style = {{position: 'relative', top: 50, height: 70}}>
            <div style = {{position: 'absolute', left: 450, background: 'yellow', width: 70, height: 70}}>
              <div style = {{textAlign: 'center', marginTop: '45%'}}> {this.state.answer[0]} </div>
            </div>
            <div style = {{position: 'absolute', left: 550, background: 'yellow', width: 70, height: 70}}>
              <div style = {{textAlign: 'center', marginTop: '45%'}}> {this.state.answer[1]} </div>
            </div>
            <div style = {{position: 'absolute', left: 650, background: 'yellow', width: 70, height: 70}}>
              <div style = {{textAlign: 'center', marginTop: '45%'}}> {this.state.answer[2]} </div>
            </div>
            <div style = {{position: 'absolute', left: 750, background: 'yellow', width: 70, height: 70}}>
              <div style = {{textAlign: 'center', marginTop: '45%'}}> {this.state.answer[3]} </div>
            </div>
            <div style = {{position: 'absolute', left: 850, background: 'yellow', width: 70, height: 70}}>
              <div style = {{textAlign: 'center', marginTop: '45%'}}> {this.state.answer[4]} </div>
            </div>
            {this.renderOption()}
          </div>
        </div>
      </Modal>
    )
  }

  renderOption(){
    return (
      <div style = {{position: 'relative', top : 100, left: 450}}>
        {option.map((value,i)=>{
          return (
            <button style = {{position: 'absolute', left: 100 * (i % 5), top: 100 * Math.floor(i / 5), width: 70, height: 70, background: 'green'}}
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
      <div>
        <div style = {styles.boxStyle}>
          <Motion defaultStyle={{opacity: 0, fontSize : 50, color : 'white', textAlign: 'center'}} style={{opacity: spring((this.state.isDispeared) ? 0 : 1, defaultConfig), fontSize : 50, color : 'white', textAlign: 'center'}}>
            {interpolatingStyle =>
              <div style = {interpolatingStyle}>{this.props.script[this.props.scriptPage]}</div>
            }
          </Motion>
          <button style = {styles.buttonStyleRight} onClick = {()=>{

            if(this.props.page == 2){

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
