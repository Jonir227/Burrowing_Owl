import React, { PropType } from 'react';
import LetterBox from './LetterBox'
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
           location:'absolute',
           width:1920,
           height:1080,
         
           backgroundImage: 'url('+ './image2.png' +')',
           backgroundRepeat: 'noRepeat'
           
        }
        var selectButtonStyle = {
            
            background : 'transparent',
            fontSize : 50,
            position : 'absolute',
            left : 500,
            top : 160,
            borderWidth : this.state.borderWidth,
            borderColor : this.state.borderColor
            
        }
       var nextButtonStyle = {

           background : 'transparent',
           fontSize : 50,
           position : 'absolute',
           top : 730,
           left : 1300,
           visibility : this.state.visibility,
           borderColor : 'transparent'
       }
       var imageStyle = {
           position : 'absolute',
           visibility : this.state.visibility,
           width : 570,
           height : 550,
           top :150,
           left : 1010
           
       }
       
       
        return (
         
            <div style = {backgroundStyle} >
                
                    <button style = {selectButtonStyle} onClick = {this.buttonChange}>
                        흥부와 놀부 </button>
                    <img src = './image3.png' style = {imageStyle}/>

                    <Link to = "/LetterBox">
                        <button style = {nextButtonStyle}>시작하기</button>
                    </Link>
            </div>
         
       
        );
    }
}

export default Main;