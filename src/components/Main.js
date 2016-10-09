import React from 'react';
import LetterBox from './LetterBox'
import { BrowserRouter as Router, Link, Match, Miss } from 'react-router'

class Main extends React.Component {
    constructor(props){
        super(props);
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
         
            <div style = {backgroundStyle} >
                <Button style = {buttonStyle}>흥부와 놀부 
                
       
        );
    }
}

export default Main;