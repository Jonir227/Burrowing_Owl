import React, { PropType } from 'react';
import { BrowserRouter as Router, Link, Match, Miss } from 'react-router'


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
         
           backgroundImage: 'url('+ './image1.png' +')',
           backgroundRepeat: 'noRepeat'
           
        }
        var buttonStyle = {
            width:1920,
            height:1080,
            background : 'transparent',
            fontSize : 100
            
        }
         return (
           <Link to = "/Main">
                <div style = {backgroundStyle} >
                    <button style = {buttonStyle} onClick = {this.nextPage}>흥부와 놀부</button>
                </div>
           
           </Link>
         );
       
            
    }
}

export default Start;