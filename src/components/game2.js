import React, { PropType } from 'react';
const btnUrl = [['./image/game2/btn1.png',true]
                ,['./image/game2/btn2.png',false]
                ,['./image/game2/btn3.png',true]
                ,['./image/game2/btn4.png',false]
                ,['./image/game2/btn5.png',false]
                ,['./image/game2/btn6.png',true]
                ,['./image/game2/btn7.png',false]
                ,['./image/game2/btn8.png',false]
                ,['./image/game2/btn9.png',false]];
const styles = {
    boxStyle: {
        background : 'white',
        padding : 10,
        borderWidth : 5,
        borderColor : 'black',
        borderStyle : 'solid',
        location : 'relative'
    },
    canvasStyle: {
        width:  '100%',
        height: '85%',
        margin: 0,
        location : 'relative'
    },
    imgStyle : {
        borderWidth : 1,
        borderColor : 'black',
        borderStyle : 'solid',
        width : 100,
        height : 100,
        marginLeft : '5%'
    }
}
export default class Game2 extends React.Component{


    constructor(props){
        super(props);
        this.state = {
            status : "start",
            correctCount : 0,
            correctNum : 3,
            imgWidth : window.innerWidth,
            imgHeight : window.innerHeight*0.85,
            selectImg : null
        }
        this.updateCanvas = this.updateCanvas.bind(this);
        this.drawText = this.drawText.bind(this);
        this.drawCorrectImg = this.drawCorrectImg.bind(this);
        this.renderBtn = this.renderBtn.bind(this);
    }

    componentDidMount(){

        this.state.imgWidth = window.innerWidth;
        this.state.imgHeight = window.innerHeight*0.85;
        this.updateCanvas();
    }
    componentDidUpdate(){
        this.updateCanvas();
    }
    updateCanvas(){
        const ctx = this.refs.canvas.getContext('2d');
        var base_image = new Image();
        base_image.src = this.props.image;


        base_image.onload = function(){
            ctx.drawImage(base_image, 0, 0, this.state.imgWidth, this.state.imgHeight);

            if(this.state.correctCount == this.state.correctNum)
                this.setState({status : "done"});

            this.drawText(this.state.status, ctx);

            if(this.state.status != "start")
                this.drawCorrectImg(this.state.status, ctx);

        }.bind(this);
    }
    drawText(status, ctx){
        ctx.font = "50px Arial";
        if(status == "start")
            ctx.fillText("알맞은 도구를 클릭 해봐!",1100, 120);
        else if(status == "done")
            ctx.fillText("모든 도구를 찾았어!", 1100, 120);
        else if(!status)
            ctx.fillText("틀렸어! 다시 찾아봐!", 1200, 120);
        else if(status)
            ctx.fillText("정답이야! 다음 도구도 찾아봐!", 1100, 120);

    }
    drawCorrectImg(status, ctx){

        var select_image = new Image();
        select_image.src = this.state.selectImg;
        ctx.drawImage(select_image, 1370, 520, 150, 150);

        if(status){
            ctx.beginPath();
            ctx.arc(1450, 600, 80, 0, 2 * Math.PI, false);
            ctx.lineWidth = 10;
            ctx.strokeStyle = 'red';
            ctx.stroke();
        }
        else if(!status){
            ctx.beginPath();

            ctx.moveTo(1450 - 50, 600 - 50);
            ctx.lineTo(1450 + 50, 600 + 50);
            ctx.moveTo(1450 + 50, 600 - 50);
            ctx.lineTo(1450 - 50, 600 + 50);

            ctx.lineWidth = 10;
            ctx.strokeStyle = 'red';

            ctx.stroke();
        }

    }
    renderBtn(){
        return(
            <div>{btnUrl.map((value,i)=>{
                return(
                    <img src = {btnUrl[i][0]} style ={styles.imgStyle}
                    onClick = {()=>{
                        this.setState({
                            status : btnUrl[i][1],
                            selectImg : btnUrl[i][0]
                        })
                        if(btnUrl[i][1]){
                            btnUrl.splice(i,1);
                            this.setState({correctCount : this.state.correctCount + 1});
                        }

                    }}/>
                );
            })}</div>
        )
    }

    render(){
        return (

            <div>
                <canvas style = {styles.canvasStyle} ref="canvas" width={window.innerWidth} height={window.innerHeight*0.85}/>
                <div style = {styles.boxStyle}>
                    {this.renderBtn()}
                </div>
            </div>
        );
    }


}
Game2.defaultProps = {
    image : './image/image6.png'
};
