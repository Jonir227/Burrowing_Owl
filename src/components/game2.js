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

export default class Game2 extends React.Component{


    constructor(props){
        super(props);
        this.state = {
            status : "start",
            correctCount : 0,
            correctNum : 3,
            selectImg : null,
            width : window.innerWidth * 0.99,
            height : window.innerHeight * 0.98
        }
        
        this.renderBtn = this.renderBtn.bind(this);
        this.renderOX = this.renderOX.bind(this);
        this.renderCorrectImg = this.renderCorrectImg.bind(this);
        this.renderText = this.renderText.bind(this);
        this.onResize = this.onResize.bind(this);
    }
    componentDidMount(){
        
    }
    onResize() {
        this.setState({
            width: window.innerWidth * 0.99,
            height: window.innerHeight * 0.98
        })

    }
    renderBtn(styles){
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
    renderText(styles){
      
        
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

    render(){
        var styles = {
            boxStyle: {
                background : 'white',
                padding : 10,
                borderWidth : 5,
                borderColor : 'black',
                borderStyle : 'solid',
                height : this.state.height * 0.1
            },
            imgStyle : {
                borderWidth : 1,
                borderColor : 'black',
                borderStyle : 'solid',
                width : this.state.width * 0.08,
                height : this.state.height * 0.1,
                marginLeft : '2.5%'
            },
            correctImgStyle : {
                width : this.state.width * 0.15,
                height : this.state.height * 0.1,
                top : this.state.height * 0.6,
                left : this.state.width * 0.7,
                position : 'absolute'
            },
            textStyle : {
                top : this.state.height * 0.05,
                left : this.state.width * 0.6,
                fontSize : this.state.height * 0.05,
                position : 'absolute',
                fontAlign : 'center',
                fontFamily : 'Arial'
            }
        }
        return (
            <Resizable onResize={this.onResize}>
                <div style = {{ width : this.state.width, height : this.state.height*0.95}}>
                    <img src = {this.props.image} style = {{  width : this.state.width ,height : this.state.height*0.85,position : 'relative'}}/>
                    {this.renderText(styles)}
                    {this.renderCorrectImg(styles)}
                    {this.renderOX(styles)}
                    <div style = {styles.boxStyle}>
                        {this.renderBtn(styles)}
                    </div>
                </div>
            </Resizable>
        );
    }


}
Game2.defaultProps = {
    image : './image/image6.png'
};