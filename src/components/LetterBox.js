import React, { PropType } from 'react';
import { BrowserRouter as Router, Link, Match, Miss } from 'react-router'
import JsonData from './subtitle.json';
import {Motion, spring, presets, precision} from 'react-motion';
import Modal from 'react-modal';
import Resizable from 'react-component-resizable'



const defaultConfig = {
  stiffness: 70
};
const narrationImg = ['./image/부엉이.png','./image/흥부.png','./image/놀부.png','./image/흥부아내.png','./image/놀부아내.png']


export default class LetterBox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isDispeared: false,
      scriptn: 0,
      narrationImg : './image/image1.png',
      width : window.innerWidth * 0.99,
      height : window.innerHeight * 0.98
    }
    this.toggleModalVisible = this.toggleModalVisible.bind(this);
    this.onResize = this.onResize.bind(this);
  }
  onResize() {
        this.setState({
            width: window.innerWidth * 0.99,
            height: window.innerHeight * 0.98
        })

    }

  toggleModalVisible(){
    this.setState({modalVisible: !this.state.modalVisible});
  }



  render() {
    var styles = {
        boxStyle: {
          background : 'black',
          borderWidth : 1,
          borderColor : 'white',
          borderStyle : 'solid',
          marginLeft : this.state.width * 0.1,
          width : this.state.width * 0.9,
          height : this.state.height * 0.15
        },
        buttonStyleRight : {
          background : 'white',
          fontSize : 20,
          borderColor : 'black',
          width : this.state.width * 0.05,
          height : this.state.height * 0.05,
          position : 'absolute',
          bottom : this.state.height * 0.15,
          right : this.state.width * 0.01
        },
        buttonStyleLeft : {
          background : 'white',
          fontSize : 20,
          borderColor : 'black',
          width : this.state.width * 0.05,
          height : this.state.height * 0.05,
          position : 'absolute',
          bottom : this.state.height * 0.15,
          right : 0 + this.state.width * 0.06
        }
  };
    
    return (
      <Resizable onResize={this.onResize}>
        <div style = {{ width : this.state.width, height : this.state.height * 0.12}}>
          <img style = {{ width : this.state.width * 0.1, height : this.state.height * 0.15, position : 'absolute'}} src = {narrationImg[this.props.narration]}/>
          <div style = {styles.boxStyle}>
          
            <Motion defaultStyle={{opacity: 0, fontSize : 40, color : "white", marginLeft : "5%", marginTop : "0.8%", fontWeight: 'bold'}} 
                    style={{opacity: spring((this.state.isDispeared) ? 0 : 1, defaultConfig), fontSize : 40, color : "white", marginLeft : "5%", marginTop : "0.8%", fontWeight: 'bold'}}>
              {interpolatingStyle =>
                <div style = {interpolatingStyle}>{this.props.script[this.props.scriptPage][0]}</div>}
            </Motion>

            {this.props.subViet && <Motion defaultStyle={{opacity: 0, fontSize : 40, color : "white", marginLeft : "5%", marginTop : "0.8%", fontWeight: 'bold'}} 
                    style={{opacity: spring((this.state.isDispeared) ? 0 : 1, defaultConfig), fontSize : 40, color : "white", marginLeft : "5%", marginTop : '0.8%', fontWeight: 'bold'}}>
              {interpolatingStyle =>
                <div style = {interpolatingStyle}>{this.props.scriptViet[this.props.scriptPage]}</div>}
            </Motion>}

            {this.props.onPause&&!this.props.gameVisible&&<audio id = "narration" src={this.props.audioSrc} type='audio/mp3' autoPlay/>}
            <button style = {styles.buttonStyleRight} onClick = {()=>{


            {!this.props.quizVisible && this.props.onPause&&!this.props.gameVisible&&<audio id = "narration" src={this.props.audioSrc} type='audio/mp3' autoPlay/>}
            <button style = {styles.buttonStyleRight} onClick = {()=>{
              if(this.props.page == 20){
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
          </div>
        </div>
      </Resizable>

    );
  }
}
