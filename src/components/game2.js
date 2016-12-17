import React, { PropType } from 'react';
import Resizable from 'react-component-resizable';
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
        borderStyle : 'solid'
    },
    imgStyle : {
        borderWidth : 1,
        borderColor : 'black',
        borderStyle : 'solid',
        width : 100,
        height : 100,
        marginLeft : '5%'
    },
    correctImgStyle : {
        width : 150,
        height : 150,
        top : '60%',
        left : '70%',
        position : 'absolute'
    },
    textStyle : {
        top : '5%',
        left : '55%',
        position : 'absolute',
        fontSize : 50,
        fontAlign : 'center',
        fontFamily : 'Arial'
    }
}
export default class Game2 extends React.Component{


    constructor(props){
        super(props);
        this.state = {
            status : "start",
            correctCount : 0,
            correctNum : 3,
            selectImg : null
        }
        
        this.renderBtn = this.renderBtn.bind(this);
        this.renderOX = this.renderOX.bind(this);
        this.renderCorrectImg = this.renderCorrectImg.bind(this);
        this.renderText = this.renderText.bind(this);
    }

    componentDidMount(){


       
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
    renderText(){
      
        
        if(this.state.correctCount == this.state.correctNum)
                this.setState({status : "done"});

        if(this.state.status == "start")
            return <h1 style = {styles.textStyle}>알맞은 도구를 클릭 해봐!</h1>
        else if(this.state.status == "done")
            return <h1 style = {styles.textStyle}>모든 도구를 찾았어!</h1>
        else if(!this.state.status)
            return <h1 style = {styles.textStyle}>틀렸어! 다른 도구를 찾아봐!</h1>
        else if(this.state.status)
            return <h1 style = {styles.textStyle}>정답이야! 다음 도구도 찾아봐!</h1>
    }
    renderCorrectImg(){
        if(this.state.status != "start")
            return <img src = {this.state.selectImg} style = {styles.correctImgStyle}/>
        else   
            return <img src = './image/game2/selectImg.png' style = {styles.correctImgStyle}/>
    }
    renderOX(){
        if(this.state.status != "start")
            if(this.state.status)
                return  <img src = './image/game2/o.png' style = {styles.correctImgStyle}/>
            else if(!this.state.status)
                return  <img src = './image/game2/x.png' style = {styles.correctImgStyle}/>
                
    }

    render(){
        return (

            <div style = {{ position : 'absolute'}}>
                <img src = {this.props.image} style = {{  width : 'auto',height : 'auto',position : 'relative'}}/>
                {this.renderText()}
                {this.renderCorrectImg()}
                {this.renderOX()}
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