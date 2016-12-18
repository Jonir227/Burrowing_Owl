import React, { PropType } from 'react';
import Window from './Window';
import { BrowserRouter as Router, Link, Match, Miss } from 'react-router'
import Resizable from 'react-component-resizable'
class Main extends React.Component {
    constructor(props){
        super(props);
         this.state = {
            borderWidth : 0,
            borderColor : 'transparent',
            visibility : 'hidden',
            width : window.innerWidth,
            height : window.innerHeight,
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
            width: window.innerWidth,
            height: window.innerHeight
        })

    }
    render(){

        return (
            <Resizable onResize={this.onResize}>
                <div style = {{ position:'absolute', width : this.state.width, height : this.state.height}} >
                        <img src = './image/2.png' style = {{width: this.state.width, height:this.state.height}}/>
                        <img src = './image/title.png' style = {{cursor: 'url(./image/pencil.png), pointer', position: 'absolute', 
                            top: this.state.height * 0.19, left: this.state.width * 0.23, width : this.state.width * 0.15, height : this.state.height * 0.1 }} onClick = {this.buttonChange}/>
                        <img src = './image/click.png' style = {{cursor: 'url(./image/pencil.png), pointer', position : 'absolute', 
                            top: this.state.height * 0.2, left : this.state.width * 0.41, width : this.state.width * 0.05, height : this.state.height * 0.1}} onClick = {this.buttonChange}/>
                        <img src = './image/title.png' style = {{position : 'absolute', visibility : this.state.visibility, 
                            top : this.state.height * 0.2, left :this.state.width * 0.55, width : this.state.width * 0.15, height : this.state.height * 0.1}}/>
                        <img src = './image/3.png' style = {{position : 'absolute', visibility : this.state.visibility, 
                            width : this.state.width * 0.3, height : this.state.height * 0.3, top : this.state.height * 0.32, left : this.state.width * 0.55}}/>
                        <Link to = "/Window">
                            <img src = './image/start.png' style = {{cursor: 'url(./image/pencil.png), pointer', position : 'absolute', 
                            top : this.state.height * 0.7, left:  this.state.width * 0.7, width : this.state.width * 0.1, height : this.state.height * 0.1}}/>
                        </Link>
                </div>
            </Resizable>
        );
    }
}

export default Main;
