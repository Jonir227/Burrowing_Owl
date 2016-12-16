import React, { PropType } from 'react';
import Window from './Window';
import Draggame from './Draggame';
import { BrowserRouter as Router, Link, Match, Miss } from 'react-router'
import Resizable from 'react-component-resizable'

class Main extends React.Component {
    constructor(props){
        super(props);
         this.state = {
            borderWidth : 0,
            borderColor : 'transparent',
            visibility : 'hidden',

            width: window.innerWidth,
            height: window.innerHeight
        };
        this.buttonChange = this.buttonChange.bind(this);
        this.onResized = this.onResized.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
    }
    buttonChange(){
        this.setState ({
            borderWidth: 2,
            borderColor: 'red',
             visibility : 'visible'
        })
    }
    onMouseEnter() {
        this.setState({
            borderWidth: 2,
            borderColor: 'black'
        })
    }
    onMouseLeave() {
        this.setState({
            borderWidth: 0,
            borderColor: 'transparent'
        })
    }
    onResized() {
        this.setState({width: window.innerWidth, height: window.innerHeight})
    }

    render(){

        var backgroundStyle = {
           width: this.state.width,
           height: this.state.height
        }
        var selectButtonStyle = {

            background : 'transparent',
            fontSize : 50,
            position : 'absolute',
            left : this.state.width / 4.2,
            top : this.state.height / 4,
            borderWidth : this.state.borderWidth,
            borderColor : this.state.borderColor

        }
       var nextButtonStyle = {

           background : 'transparent',
           fontSize : 50,
           position : 'absolute',
           top : window.innerHeight / 1.5,
           left : window.innerWidth / 1.5,
           visibility : this.state.visibility,
           borderColor : 'transparent'
       }
       var imageStyle = {
           position : 'absolute',
           visibility : this.state.visibility,
           width : window.innerWidth / 3.5,
           height : window.innerHeight / 2.5,
           top : window.innerHeight / 5,
           left : window.innerWidth / 1.85
       }



        return (

            <div>>
                <Resizable className="test" onResize={this.onResized}>
                    <img src='./mainimage/2.svg' style={backgroundStyle}/>
                </Resizable>
                    <button style = {selectButtonStyle} 
                            onClick = {this.buttonChange}
                            onMouseEnter = {this.onMouseEnter}
                            onMouseLeave = {this.onMouseLeave}>
                        흥부와 놀부 </button>
                    <img src = './hnnimage/3.svg' style = {imageStyle}/>
                    <Link to = "/Window">
                        <button style = {nextButtonStyle}>시작하기</button>
                    </Link>
            </div>
        );
    }
}

export default Main;
