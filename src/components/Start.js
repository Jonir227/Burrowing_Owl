import React, { PropType } from 'react';
import {Motion, spring, presets, precision} from 'react-motion';
import { BrowserRouter as Router, Link, Match, Miss } from 'react-router'
import App from './App'
import Resizable from 'react-component-resizable'

const defaultConfig = {

    stiffness : 40
}

class Start extends React.Component {

    constructor(props){

        super(props);
        this.state = {
            width: window.innerWidth * 0.99,
            height: window.innerHeight * 0.98

        }
        this.onResize = this.onResize.bind(this);
  }
    onResize() {
            this.setState({
                width: window.innerWidth * 0.99,
                height: window.innerHeight * 0.98

            })

        }  
    render(){
        
        
         return (
                <Resizable onResize={this.onResize}>
                    <div style = {{width : this.state.width, height :this.state.height, margin: 0,padding : 0, position : 'absolute'}}>
                        
                        <img src='./image/1.png' style = {{ width: this.state.width, height: this.state.height}}/>
                        <Motion defaultStyle = {{opacity : 0}} style = {{opacity : spring(1,defaultConfig)}}>{interpolated=>
                            <div style = {interpolated}>
                                <img src = './image/title2.png' style = {{position: 'absolute', top: this.state.height * 0.27, left: this.state.width * 0.4, width : this.state.width * 0.2, height : this.state.height * 0.13 }}/>
                                <Link to = "/Main">
                                    <div>
                                        <img src = './image/start.png' style = {{position : 'absolute', top :  this.state.height * 0.7, left: this.state.width * 0.52, width : this.state.width * 0.1}}/>
                                    </div>
                                </Link>
                        </div>}</Motion>
                    </div>
                </Resizable>
         );
    }
}

export default Start;
