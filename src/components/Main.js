import React, { PropType } from 'react';
import {Motion, spring, presets, precision} from 'react-motion';
import Window from './Window';
import { BrowserRouter as Router, Link, Match, Miss } from 'react-router'
import Resizable from 'react-component-resizable'

const defaultConfig = {
  stiffness: 40
};
class Main extends React.Component {
    constructor(props){
        super(props);
         this.state = {
            borderWidth : 0,
            borderColor : 'transparent',
            visibility : 'hidden',
            clickImg : 'hidden',
            width : window.innerWidth * 0.99,
            height : window.innerHeight * 0.98,

        };
        this.buttonChange = this.buttonChange.bind(this);
        this.onResize = this.onResize.bind(this);
    }
    buttonChange(){
        this.setState ({
             visibility : 'visible'
        })
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
                <div style = {{ position:'absolute', width : this.state.width, height : this.state.height}} >
                        <img src = './image/2.png' style = {{width: this.state.width, height:this.state.height}}/>
                        <img src = './image/title.png' onMouseEnter={()=> {this.setState({ clickImg: 'visible' })}} onMouseLeave={()=> {this.setState({clickImg: 'hidden'})}}
                            style = {{cursor: 'url(./image/pencil.png), pointer', position: 'absolute', 
                            top: this.state.height * 0.19, left: this.state.width * 0.23, width : this.state.width * 0.15, height : this.state.height * 0.1 }} onClick = {this.buttonChange}/>
                        <img src = './image/click.png' style = {{cursor: 'url(./image/pencil.png), pointer', position : 'absolute', visibility : this.state.clickImg,
                            top: this.state.height * 0.2, left : this.state.width * 0.41, width : this.state.width * 0.05, height : this.state.height * 0.1}} onClick = {this.buttonChange}/>
                        <Motion defaultStyle = {{opacity : 0}} style = {{opacity : spring((this.state.visibility == 'visible') ? 1 : 0,defaultConfig)}}>{interpolated=>
                            <div style = {interpolated}>
                            <img src = './image/title.png' style = {{position : 'absolute', visibility : this.state.visibility, 
                                top : this.state.height * 0.2, left :this.state.width * 0.55, width : this.state.width * 0.15, height : this.state.height * 0.1}}/>
                            <img src = './image/3.png' style = {{position : 'absolute', visibility : this.state.visibility, 
                                width : this.state.width * 0.3, height : this.state.height * 0.3, top : this.state.height * 0.32, left : this.state.width * 0.55}}/>
                            <Link to = "/Window">
                                <img src = './image/start.png' style = {{cursor: 'url(./image/pencil.png), pointer', position : 'absolute', 
                                top : this.state.height * 0.7, left:  this.state.width * 0.7, width : this.state.width * 0.1, height : this.state.height * 0.1, visibility : this.state.visibility}}/>
                            </Link>
                        </div>}</Motion>           
                </div>
            </Resizable>
        );
    }
}

export default Main;
