import React, { PropType } from 'react';
import { BrowserRouter as Router, Link, Match, Miss } from 'react-router'
import App from './App'
import Resizable from 'react-component-resizable'


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

         return (
           <Link to = "/Main">
                <div>
                    <Resizable onResize={this.onResize}>
                    <button onClick = {this.nextPage}>
                      <img src="./mainimage/1.svg" style = {{ width: this.state.width, height: this.state.height}}/>
                    </button>
                    </Resizable>
                    <div style = {{fontSize : 50, fontFamily: '궁서', position: 'absolute', top: window.innerHeight / 1.4, left: window.innerWidth / 1.9 }}>시작</div>
                </div>
           </Link>

         );
    }
}

export default Start;
