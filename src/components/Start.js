import React, { PropType } from 'react';

import { BrowserRouter as Router, Link, Match, Miss } from 'react-router'

import App from './App'


const styles = {
    backgroundStyle : {
        width:  '100%',
        height: '85%',
        margin: 0,
        location : 'absolute',
        display: 'block'
    },
    buttonStyle : {
        width:  '100%',
        height: '85%',
        margin: 0,
        location : 'absolute',
        background : 'transparent',
        display: 'block'
    }
}
class Start extends React.Component {

    constructor(props){
        super(props);
  }

    render(){

        
         return (
           <Link to = "/Main">
                <div style = {styles.backgroundStyle}>
                    <button style = {styles.buttonStyle} onClick = {this.nextPage}>
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
