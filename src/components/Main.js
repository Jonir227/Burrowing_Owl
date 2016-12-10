import React, { PropType } from 'react';
import Window from './Window';
import { BrowserRouter as Router, Link, Match, Miss } from 'react-router'

class Main extends React.Component {
    constructor(props){
        super(props);
         this.state = {
            borderWidth : 0,
            borderColor : 'transparent',
            visibility : 'hidden'
        };
        this.buttonChange = this.buttonChange.bind(this);
    }
    buttonChange(){
        this.setState ({
             borderWidth : 5,
             borderColor : 'black',
             visibility : 'visible'
        })
    }
    render(){

        var backgroundStyle = {
           cursor: 'url(./image/star.png), pointer',
           location:'absolute',
           width:window.innerWidth,
           height:window.innerHeight,
           backgroundRepeat: 'noRepeat'

        }
        var selectButtonStyle = {

            background : 'transparent',
            fontSize : 50,
            position : 'absolute',
            left : window.innerWidth / 4.2,
            top : window.innerHeight / 7,
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

            <div style = {backgroundStyle} >
                    <img src = './image/image2.png' style = {{width:window.innerWidth, height:window.innerHeight}}/>
                    <button style = {selectButtonStyle} onClick = {this.buttonChange}>
                        흥부와 놀부 </button>
                    <img src = './image/image3.png' style = {imageStyle}/>
                    <Link to = "/Window">
                        <button style = {nextButtonStyle}>시작하기</button>
                    </Link>
            </div>
        );
    }
}

export default Main;
