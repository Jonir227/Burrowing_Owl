import React, { PropType } from 'react';

import { BrowserRouter as Router, Link, Match, Miss } from 'react-router'

import App from './App'



class Start extends React.Component {

    constructor(props){
        super(props);
  }

    render(){

        var backgroundStyle = {
           location:'absolute',
           width: window.innerWidth,
           height: window.innerHeight
        }
        var buttonStyle = {
            width: window.innerWidth,
            height: window.innerHeight,
            background : 'transparent'
        }
         return (
           <Link to = "/Main">
                <div style = {backgroundStyle}>
                    <button style = {buttonStyle} onClick = {this.nextPage}>
                      <img
                        src='./image/image1.png'
                        style = {{ width: window.innerWidth, height: window.innerHeight}}/>
                    </button>
                    <div style = {{fontSize : 100, position: 'absolute', top: window.innerHeight / 1.6, left: window.innerWidth / 2.7 }}>흥부와 놀부</div>
                </div>
           </Link>

         );
    }
}

export default Start;
