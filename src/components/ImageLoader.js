import React, { PropType } from 'react';
import JsonData from './subtitle.json';

class ImageLoader extends React.Component {
    constructor(props){
        super(props);

        //this.zoomoutImage = this.zoomoutImage.bind(this);
        this.state = {
            imgWidth : window.innerWidth,
            imgHeight : window.innerHeight*0.85,
            chgWidth : 0,
            chgHeight : 0
        }

        this.updateCanvas = this.updateCanvas.bind(this);
        this.zoomImage = this.zoomImage.bind(this);
    }

    componentDidMount(){
        this.updateCanvas();
    }
    componentWillReceiveProps(nextProps)
    {
        if(this.props.image === nextProps.image) return;


        this.state.imgWidth = window.innerWidth;
        this.state.imgHeight = window.innerHeight*0.85;
        this.state.chgWidth = 0;
        this.state.chgHeight = 0;

    }



    updateCanvas(base_image) {


        const ctx = this.refs.canvas.getContext('2d');
        var base_image = new Image();
        base_image.src = this.props.image;
        base_image.onload = function(){
            base_image.src = this.props.image;
            ctx.drawImage(base_image, this.state.chgWidth, this.state.chgHeight, this.state.imgWidth , this.state.imgHeight);
            if(this.props.isZoom[this.props.scriptPage].zoom){
                this.zoomImage(this.props.isZoom[this.props.scriptPage].xPosition,this.props.isZoom[this.props.scriptPage].yPosition,this.props.isZoom[this.props.scriptPage].ratio, ctx);
            }
        }.bind(this);


    }
    zoomImage(xPosition, yPosition, ratio, ctx){
        /*
        ctx.translate(xPosition, yPosition);
        ctx.scale(ratio,ratio);
        ctx.translate(-xPosition, -yPosition);
        */
        if(this.state.chgWidth >= -xPosition*window.innerWidth/1920 && this.state.chgHeight >= -yPosition*window.innerHeight/1080*0.85){
                this.setState({
                    chgWidth : this.state.chgWidth - xPosition*window.innerWidth/1920/1000.0,
                    chgHeight : this.state.chgHeight - yPosition*window.innerHeight/1080*0.85/1000.0
                });

        }

        if(this.state.imgWidth <= window.innerWidth*ratio && this.state.imgHeight <= window.innerHeight*ratio*0.85){
                this.setState({
                    imgWidth : this.state.imgWidth + (window.innerWidth*ratio - window.innerWidth)/1000.0,
                    imgHeight : this.state.imgHeight + (window.innerHeight*ratio - window.innerHeight)*0.85/1000.0
                });
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
