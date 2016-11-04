import React, { PropType } from 'react';
import JsonData from './subtitle.json';

class ImageLoader extends React.Component {

    constructor(props){
        super(props);
        this.updateCanvas = this.updateCanvas.bind(this);
    }
    componentDidMount(){
        this.updateCanvas();
        console.log(JSON.stringify(this.props));
    }
    updateCanvas(base_image) {
        const ctx = this.refs.canvas.getContext('2d');
        var base_image = new Image();
        base_image.src = this.props.image;
        let imgWidth = window.innerWidth;
        let imgHeight = window.innerHeight;
        base_image.onload = function(){

            base_image.src = this.props.image;
            ctx.drawImage(base_image, 0, 0, imgWidth, imgHeight);

        }.bind(this);
    }

    render(){

        return (
                <canvas ref="canvas" width={window.innerWidth} height={window.innerHeight}/>
        );
    }
}

ImageLoader.defaultProps = {
    image : './image1.png'
};

export default ImageLoader;
