import React, { PropType } from 'react';
import Resizable from 'react-component-resizable';
import {Motion, spring, presets, precision} from 'react-motion';

const defaultConfig = {
  stiffness: 60
};

export default class CureSwallow extends React.Component{


    constructor(props){
        super(props);
        this.state = {
            status : "start",
            correctCount : 0,
            correctNum : 3,
            selectImg : null,
            width : window.innerWidth * 0.99,
            height : window.innerHeight * 0.98,
            hintVisible : false,
            hintImg : './image/game2/hintOff.png'
        }

        this.renderBtn = this.renderBtn.bind(this);
        this.renderOX = this.renderOX.bind(this);
        this.renderCorrectImg = this.renderCorrectImg.bind(this);
        this.renderText = this.renderText.bind(this);
        this.renderHint = this.renderHint.bind(this);
        this.onResize = this.onResize.bind(this);
        this.btnUrl = [['./image/game2/가위.png',true]
                        ,['./image/game2/와인.png',false]
                        ,['./image/game2/붕대.png',true]
                        ,['./image/game2/칼.png',false]
                        ,['./image/game2/폭탄.png',false]
                        ,['./image/game2/약.png',true]
                        ,['./image/game2/핸드폰.png',false]];

    }
    onResize() {
        this.setState({
            width: window.innerWidth * 0.99,
            height: window.innerHeight * 0.98
        })



    }
    renderBtn(styles){
        return(
            <div>{this.btnUrl.map((value,i)=>{
                return(
                    <img src = {this.btnUrl[i][0]} style ={styles.imgStyle}
                    onClick = {()=>{
                        this.setState({
                            status : this.btnUrl[i][1],
                            selectImg : this.btnUrl[i][0]
                        })
                        if(this.btnUrl[i][1]){
                          if(this.state.correctCount == this.state.correctNum - 1) {
                            this.setState({status : "done"});
                            this.props.setGameDone();
                            this.props.setGameSuccess();
                            this.props.setScore(-1);
                          }
                          this.btnUrl.splice(i,1);
                          this.setState({correctCount : this.state.correctCount + 1});
                        }
                    }}/>
                );
            })}</div>
        )
    }
    renderText(styles){
        if(this.state.status == "start")
            return <h1 style = {styles.textStyle}>알맞은 도구를 클릭 해봐!</h1>
        else if(this.state.status == "done")
            return <h1 style = {styles.textStyle}>모든 도구를 찾았어!</h1>
        else if(!this.state.status)
            return <h1 style = {styles.textStyle}>틀렸어! 다른 도구를 찾아봐!</h1>
        else if(this.state.status)
            return <h1 style = {styles.textStyle}>정답이야! 다음 도구도 찾아봐!</h1>
    }
    renderCorrectImg(styles){
        if(this.state.status != "start")
            return <img src = {this.state.selectImg} style = {styles.correctImgStyle}/>
        else
            return <img src = './image/game2/selectImg.png' style = {styles.correctImgStyle}/>
    }
    renderOX(styles){
        if(this.state.status != "start")
            if(this.state.status)
                return  <img src = './image/game2/o.png' style = {styles.correctImgStyle}/>
            else if(!this.state.status)
                return  <img src = './image/game2/x.png' style = {styles.correctImgStyle}/>

    }
    renderHint(){
        return(
            <Motion defaultStyle = {{opacitiy : 0, width : 0, height : 0, left : '4%', top : '5%', position : 'absolute', borderRadius: 15}} 
                            style = {{opacity : spring((this.state.hintVisible ? 1 : 0), defaultConfig ), width : spring(this.state.width * 0.4, defaultConfig), height : spring(this.state.height * 0.4, defaultConfig), left : '4%', top : '5%', position : 'absolute', borderRadius: 15}}>
                    {interpolated =>
                        <img src = './image/game2/hint.png' style = {interpolated}></img>}</Motion>
        )
    }
    render(){
        var styles = {
            boxStyle: {
                background : 'white',
                borderWidth : 5,
                padding : 10,
                borderColor : 'black',
                borderStyle : 'solid',
                width : this.state.width * 0.98,
                height : this.state.height * 0.1
            },
            imgStyle : {
                borderWidth : 1,
                borderColor : 'black',
                borderStyle : 'solid',
                width : this.state.width * 0.08,
                height : this.state.height * 0.1,
                marginLeft : (12 - this.btnUrl.length) + '%'
            },
            correctImgStyle : {
                width : this.state.width * 0.15,
                height : this.state.height * 0.1,
                top : this.state.height * 0.6,
                left : this.state.width * 0.7,
                position : 'absolute'
            },
            textStyle : {
                borderWidth : 5,
                borderColor : 'black',
                background : 'white',
                borderStyle : 'solid',
                top : '35%',
                left : '2%',
                fontSize : this.state.height * 0.05,
                position : 'absolute',
                fontAlign : 'center',
                fontFamily : 'Arial'
            },
            modalStyle : {
                content : {
                width : this.state.width * 0.5,
                height : this.state.height * 0.5,
                top : 0,
                left : 0
                }
            }
        }
        return (
            <Resizable onResize={this.onResize} > 
                
                <img src = './image/game2/swallow.png' style = {{  width : this.state.width * 0.99 ,height : this.state.height*0.85, position : 'relative', left : 0, top : 0}}/>
                <img src = './image/game2/hand.png' style = {{  position : 'absolute', width : this.state.width * 0.3, height : this.state.height * 0.4, left : '60%', top : '40%' }}/>
                <img src = './image/game2/부엉이.png' style = {{  position : 'absolute', width : this.state.width * 0.2, height : this.state.height * 0.3, left : '7%', top : '50%' }}/>
                
                <div>
                    <img src = {this.state.hintImg} 
                        onMouseEnter={()=> {this.setState({hintImg : './image/game2/hintOn.png', hintVisible : true})}}
                        onMouseLeave={()=> {this.setState({hintImg : './image/game2/hintOff.png', hintVisible : false})}}
                        style = {{position : 'absolute', width : this.state.width * 0.03, height : this.state.height * 0.05, left : '1%', top: '3%'}}/>
                    
                </div>
                    {this.renderText(styles)}
                    {this.renderCorrectImg(styles)}
                    {this.renderOX(styles)}
                <div style = {styles.boxStyle}>
                    {this.renderBtn(styles)}
                </div>

                {this.state.hintVisible && this.renderHint()}
                
            </Resizable>
            
        );
    }


}
CureSwallow.defaultProps = {
    image : './image/image6.png'
};
