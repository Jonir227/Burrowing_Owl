import React, { PropType } from 'react';
import JsonData from './subtitle.json';



class ImageLoader extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            imgWidth : window.innerWidth,
            imgHeight : window.innerHeight*0.85,
            chgWidth : 0,
            chgHeight : 0,
            currentX : 0,
            currentY : 0,
            currentRatio : 1,
            zoomDone : false,
            prevX : 0,
            prevY : 0,
            xDone : false,
            yDone : false
        }

        
        this.updateCanvas = this.updateCanvas.bind(this);
        this.zoomImage = this.zoomImage.bind(this);
        this.zoomoutImage = this.zoomoutImage.bind(this);
    }

    componentDidMount(){
       
        this.state.imgWidth = window.innerWidth;
        this.state.imgHeight = window.innerHeight*0.85;
        this.updateCanvas();
    }
    componentWillReceiveProps(nextProps)
    {
        this.updateCanvas();
        this.state.xDone = false;
        this.state.yDone = false;

        if(this.props.image === nextProps.image){
            this.state.prevX = this.state.chgWidth;
            this.state.prevY = this.state.chgHeight;
            
            return;
        }

        this.state.imgWidth = window.innerWidth;
        this.state.imgHeight = window.innerHeight*0.85;
        this.state.chgWidth = 0;
        this.state.chgHeight = 0;
        this.state.currentX = 0;
        this.state.currentY = 0;
        this.state.currentRatio = 1;
        this.state.prevX = 0;
        this.state.prevY = 0;
        this.state.zoomDone = false;

    }
    
    



    updateCanvas(base_image) {

        
        const ctx = this.refs.canvas.getContext('2d');
        var base_image = new Image();
        
        let interval = setInterval(()=>{
                base_image.src = this.props.image;
                base_image.onload = function(){     
                    ctx.drawImage(base_image, this.state.chgWidth, this.state.chgHeight, this.state.imgWidth , this.state.imgHeight);
                
                    if(this.props.isZoom[this.props.scriptPage].zoom) {
                        this.setState({
                            currentX : this.props.isZoom[this.props.scriptPage].xPosition,
                            currentY : this.props.isZoom[this.props.scriptPage].yPosition,
                            currentRatio : this.props.isZoom[this.props.scriptPage].ratio
                        })
                        this.zoomImage(this.props.isZoom[this.props.scriptPage].xPosition,this.props.isZoom[this.props.scriptPage].yPosition,this.props.isZoom[this.props.scriptPage].ratio);
                    }
                    else if(!this.props.isZoom[this.props.scriptPage].zoom){
                    this.zoomoutImage(this.state.currentX,this.state.currentY,this.state.currentRatio)

                }
        }.bind(this)},1000/60);
        
    }

    

    zoomImage(xPosition, yPosition, ratio){
        /*
        this.setState({
            chgWidth : -xPosition*window.innerWidth/1920,
            chgHeight : -yPosition*window.innerHeight/1000*0.85,
            imgWidth : window.innerWidth*ratio,
            imgHeight :window.innerHeight*ratio*0.85,
            zoomDone : true

        })
        */
        
        if(Math.floor(this.state.chgWidth) != Math.floor(-xPosition*window.innerWidth/1920) ){
            if(this.state.chgWidth > -xPosition*window.innerWidth/1920){
                this.setState({
                    chgWidth : this.state.chgWidth - xPosition*(window.innerWidth + this.state.prevX)/1920/1000
                });
            }
            else{
                this.setState({
                    chgWidth : this.state.chgWidth + xPosition*(window.innerWidth - this.state.prevX)/1920/1000
                });
            }
                
        }

        if(Math.floor(this.state.chgHeight) != Math.floor(-yPosition*window.innerHeight/1080*0.85)){
            if(this.state.chgHeight > -yPosition*window.innerHeight/1080*0.85){
                this.setState({
                    chgHeight : this.state.chgHeight - yPosition*(window.innerHeight*0.85 + this.state.prevY)/1080/1000
                });
            }
            else{
                this.setState({
                    chgHeight : this.state.chgHeight + yPosition*(window.innerHeight*0.85 - this.state.prevY)/1080/1000
                });
            }
                
        }
        
        
       
        
        if(this.state.imgWidth <= window.innerWidth*ratio || this.state.imgHeight <= window.innerHeight*ratio*0.85){
                this.setState({
                    imgWidth : this.state.imgWidth + (window.innerWidth*ratio - window.innerWidth)/1000,
                    imgHeight : this.state.imgHeight + (window.innerHeight*ratio - window.innerHeight)*0.85/1000
                });
        }
    
    }
    zoomoutImage(xPosition, yPosition,ratio){

        if(this.state.chgWidth <= 0 || this.state.chgHeight <= 0){
                this.setState({
                    chgWidth : this.state.chgWidth + xPosition*window.innerWidth/1920/1000,
                    chgHeight : this.state.chgHeight + yPosition*window.innerHeight/1080*0.85/1000
                });

        }
        
        if(this.state.imgWidth >= window.innerWidth || this.state.imgHeight >= window.innerHeight*0.85){
                this.setState({
                    imgWidth : this.state.imgWidth - (window.innerWidth*ratio - window.innerWidth)/1000,
                    imgHeight : this.state.imgHeight - (window.innerHeight*ratio - window.innerHeight)*0.85/1000


                });
        }

    }

    render(){

        return (
                <div style ={{width : window.innerWidth, height : window.innerHeight * 0.85, left : 0, top : 0, padding : 0}}>
                    <canvas ref="canvas" width={window.innerWidth} height={window.innerHeight*0.85}/>
                </div>
        );
    }
}

ImageLoader.defaultProps = {
    image : './image/image1.png'
};

export default ImageLoader;
