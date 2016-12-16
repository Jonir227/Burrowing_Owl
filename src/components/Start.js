import React, { PropType } from 'react';
import { BrowserRouter as Router, Link, Match, Miss } from 'react-router'
import App from './App'
import Resizable from 'react-component-resizable'

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
        this.state = {
            width: window.innerWidth,
            height: window.innerHeight
        }
        this.onResize = this.onResize.bind(this);
  }
 
 onResize() {
     this.setState({
         width: window.innerWidth,
         height: window.innerHeight,
     })
 }
    render(){

<<<<<<< HEAD
         return (
           <Link to = "/Main">
                <div>
                    <Resizable onResize={this.onResize}>
                    <button onClick = {this.nextPage}>
                      <img src="./mainimage/1.svg" style = {{ width: this.state.width, height: this.state.height}}/>
=======
        
         return (
           <Link to = "/Main">
                <div style = {styles.backgroundStyle}>
                    <button style = {styles.buttonStyle} onClick = {this.nextPage}>
                      <img
                        src='./image/image1.png'
                        style = {{ width: window.innerWidth, height: window.innerHeight}}/>
>>>>>>> 9d7b973b0fa0190970f236a420fd7c06c939fb05
                    </button>
                    </Resizable>
                    <div style = {{fontSize : 50, fontFamily: '궁서', position: 'absolute', top: window.innerHeight / 1.4, left: window.innerWidth / 1.9 }}>시작</div>
                </div>
           </Link>

         );
    }
}

export default Start;
