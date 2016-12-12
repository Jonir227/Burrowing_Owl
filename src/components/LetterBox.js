import React, { PropType } from 'react';
import { BrowserRouter as Router, Link, Match, Miss } from 'react-router'
import JsonData from './subtitle.json';
import {Motion, spring, presets, precision} from 'react-motion';
import Modal from 'react-modal'
const defaultConfig = {
  stiffness: 40
};
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
  }
};

const customStyles = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

export default class LetterBox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isDispeared: false,
      modalVisible: false,
      scriptn: 0
    }
    this.toggleModalVisible = this.toggleModalVisible.bind(this);
  }

  
  toggleModalVisible(){
    this.setState({modalVisible: !this.state.modalVisible});
  }

  renderModal(){
    return (
      <Modal isOpen={this.state.modalVisible}
             style={customStyles}>
              <h1>미니게임을 진행하시겠습니까?</h1>
              <Link to = "/Game">
                <button style={{position:'absolute', left: 30}}>예</button>
              </Link>
              <button onClick={this.toggleModalVisible}
                      style={{position:'absolute', right: 30}}>아니요</button>
            </Modal>
    )
  }

  render(){
    console.log(this.props.page);
    return (
      <div>
        <div style = {styles.boxStyle}>
          <Motion defaultStyle={{opacity: 0, fontSize : 50, color : 'white', textAlign: 'center'}} style={{opacity: spring((this.state.isDispeared) ? 0 : 1, defaultConfig), fontSize : 50, color : 'white', textAlign: 'center'}}>
            {interpolatingStyle =>
              <div style = {interpolatingStyle}>{this.props.script[this.props.scriptPage]}</div>
            }
          </Motion>
          <button style = {styles.buttonStyleRight} onClick = {()=>{
            
            if(this.props.page == 2 && this.state.isDispeared){
              this.toggleModalVisible();
            }
            else {
              if(this.props.scriptPage < this.props.script.length - 1) this.props.nextScript();
              else{
                this.setState({ 
                  isDispeared : false
                });
                this.props.nextPage();
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
        {this.renderModal()}
      </div>
    );
  }
}
