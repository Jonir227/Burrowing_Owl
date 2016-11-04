import React, { PropType } from 'react';
import { BrowserRouter as Router, Link, Match, Miss } from 'react-router'
import JsonData from './subtitle.json';

export default class LetterBox extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    var boxStyle = {
      background : 'black',
      padding : 10,
      borderWidth : 1,
      borderColor : 'white',
      borderStyle : 'solid',
      location : 'absolute'
    }
    var letterStyle = {
      fontFamily : "맑은 고딕",
      fontSize : 50,
      color : 'white',
      textAlign: 'center'
    }
    var buttonStyleRight = {
      float : 'right',
      background : 'white',
      marginRight: 10,
      fontSize : 20,
      borderColor : 'black'
    }
    var buttonStyleLeft = {
      background : 'white',
      float: 'right',
      fontSize : 20,
      borderColor : 'black'
    }

    return (
      <div>

        <div style = {boxStyle}>
        <div style = {letterStyle}>{this.props.script}</div>
          <button style = {buttonStyleRight} onClick = {this.props.nextPage}> next </button>
          <button style = {buttonStyleLeft} onClick = {this.props.prevPage}> prev </button>
          <Link to = "/Main">
            <button style = {buttonStyleLeft}>menu</button>
          </Link>
        </div>
      </div>
    );
  }
}
