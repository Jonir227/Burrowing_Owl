import React, { PropType } from 'react';
import JsonData from './subtitle.json';

class ImageLoader extends React.Component {
    constructor(props){
        super(props);
        this.updateCanvas = this.updateCanvas.bind(this);
        this.zoomImage = this.zoomImage.bind(this);
        this.state = {
            imgWidth : window.innerWidth,
            imgHeight : window.innerHeight*0.85,
            chgWidth : 0,
            chgHeight : 0
        }
    }
    componentDidMount(){
        this.updateCanvas();
        this.zoomImage();
        console.log(JSON.stringify(this.props));
    }
    componentWillReceiveProps()
    {
        this.state.imgWidth = window.innerWidth;
        this.state.imgHeight = window.innerHeight*0.85;
        this.state.chgWidth = 0;
        this.state.chgHeight = 0;
    }

    updateCanvas(base_image) {


        const ctx = this.refs.canvas.getContext('2d');
        var base_image = new Image();
        base_image.src = this.props.image;
        console.log(this.refs.canvas.width);
        base_image.onload = function(){
            base_image.src = this.props.image;
            ctx.drawImage(base_image, this.state.chgWidth, this.state.chgHeight, this.state.imgWidth , this.state.imgHeight);
            if(this.props.isZoom.zoom)
                this.zoomImage(this.props.isZoom.xPosition,this.props.isZoom.yPosition,this.props.isZoom.ratio);

        }.bind(this);


    }
    zoomImage(xPosition, yPosition, ratio){

        if(this.state.chgWidth >= -xPosition*window.innerWidth/1920 && this.state.chgHeight >= -yPosition*window.innerHeight/1080*0.85){
                this.state.chgWidth -= xPosition*window.innerWidth/1920/10000.0;
                this.state.chgHeight -= yPosition*window.innerHeight/1080*0.85/10000.0;

        }
        if(this.state.imgWidth <= window.innerWidth*ratio && this.state.imgHeight <= window.innerHeight*ratio*0.85){
                this.state.imgWidth +=  (window.innerWidth*ratio - window.innerWidth)/10000.0;
                this.state.imgHeight += (window.innerHeight*ratio - window.innerHeight)*0.85/10000.0;
        }
    }
    render(){

        return (
                <canvas ref="canvas" width={window.innerWidth} height={window.innerHeight*0.85}/>
        );
    }
}

ImageLoader.defaultProps = {
    image : './image/image1.png'
};

export default ImageLoader;
