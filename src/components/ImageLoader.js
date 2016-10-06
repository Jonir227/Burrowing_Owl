import React from 'react';
import JsonData from './subtitle.json';

class ImageLoader extends React.Component {
   
    render(){

        var imageStyle = {
                width: '100%',
                height : 'auto'         
        };
        
        return (
           
            <div>
                <img style = {imageStyle} src = {this.props.image.image}/>
            </div>
        );
    }
}



export default ImageLoader;