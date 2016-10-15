import React, { PropType } from 'react';
import JsonData from './subtitle.json';

class ImageLoader extends React.Component {
    constructor(props){
        super(props);
    }
    render(){

        var backgroundStyle = {
           location : 'absolute',
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
            <div style = {backgroundStyle}/ >
        );
    }
}

ImageLoader.defaultProps = {
    image : './image1.png'
};

export default ImageLoader;
