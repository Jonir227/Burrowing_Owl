import React, { PropType } from 'react';
import Router from 'react-router/BrowserRouter';
import Match from 'react-router/Match';
import Link from 'react-router/Link';
import JsonData from './subtitle.json';

class ImageLoader extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        
        var backgroundStyle = {
           width:1920,
           height:1080,
         
           backgroundImage: 'url('+ this.props.image +')',
           backgroundRepeat: 'noRepeat'
           
        }
        var buttonStyle = {
            width:1920,
            height:1080,
            background : 'transparent',
            fontSize : 100
            
        }
       
        return (
           
            <div style = {backgroundStyle} /> 

        );
    }
}

ImageLoader.defaultProps = {
    image : './image1.png'
};

export default ImageLoader;