import React, { PropType } from 'react';
import Router from 'react-router/BrowserRouter'
import Match from 'react-router/Match'
import Link from 'react-router/Link'
import App from './App'


class Start extends React.Component {
     
    constructor(props){
        super(props);
        this.nextPage = this.nextPage.bind(this);
        
    }
    nextPage(){
 
      
    }
    render(){
        
        var backgroundStyle = {
           width:1920,
           height:1080,
         
           backgroundImage: 'url('+ './image2.png' +')',
           backgroundRepeat: 'noRepeat'
           
        }
        var buttonStyle = {
            width:1920,
            height:1080,
            background : 'transparent',
            fontSize : 100
            
        }
         return (
           <Link to = "/LetterBox">
            <div style = {backgroundStyle} >
            <button style = {buttonStyle} onClick = {this.nextPage}>흥부와 놀부</button>
            </div>
            <hr/>
            </Link>
         );
       
            
    }
}

export default Start;