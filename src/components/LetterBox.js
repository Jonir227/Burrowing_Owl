import React, { PropType } from 'react';
import { BrowserRouter as Router, Link, Match, Miss } from 'react-router'
import JsonData from './subtitle.json';
import {Motion, spring, presets, precision} from 'react-motion';

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

export default class LetterBox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isDispeared: false
    }
  }

  render(){
    return (
      <div>
        <div style = {styles.boxStyle}>
          <Motion defaultStyle={{opacity: 0, fontSize : 50, color : 'white', textAlign: 'center'}} style={{opacity: spring((this.state.isDispeared) ? 0 : 1, defaultConfig), fontSize : 50, color : 'white', textAlign: 'center'}}>
            {interpolatingStyle =>
              <div style = {interpolatingStyle}>{this.props.script}</div>
            }

          </Motion>
          <button style = {styles.buttonStyleRight} onClick = {()=>{
            if(this.state.isDispeared)this.props.nextPage();
            this.setState({isDispeared: !this.state.isDispeared});
          }}> next </button>
        <button style = {styles.buttonStyleLeft} onClick = {()=>{
            if(this.state.isDispeared)this.props.prevPage();
            this.setState({isDispeared: !this.state.isDispeared});
          }}> prev </button>
          <Link to = "/Main">
            <button style = {styles.buttonStyleLeft}>menu</button>
          </Link>
        </div>
      </div>
    );
  }
}
