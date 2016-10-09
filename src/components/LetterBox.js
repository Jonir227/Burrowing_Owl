import React, { PropType } from 'react';
import Router from 'react-router/BrowserRouter'
import Match from 'react-router/Match'
import Link from 'react-router/Link'
import ImageLoader from './ImageLoader';
import Start from './Start';
import JsonData from './subtitle.json';

 
export default class LetterBox extends React.Component {


    constructor(props){
        super(props);
        this.state = {
            page : 0,
            max : JsonData.HeungbooNolboo.page,
            done : false
        }
        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
    }
    nextPage(){
        if(this.state.page == this.state.max - 1) return;
        this.setState({
        page : this.state.page+1
        })
        console.log(this.state.page);
    }
    prevPage(){
        if(this.state.page < 1) return;
        this.setState({
        page:this.state.page-1
        })
        console.log(this.state.page);
    }
    
        render(){
            

            var boxStyle = {
            
            background : 'black',
            padding : 10,
            borderWidth : 1,
            borderColor : 'white',
            borderStyle : 'solid',
            location : 'absolute'
            }
            var letterStyle = {
                fontFamily : "맑은 고딕",
            fontSize : 50,
            color : 'white',
            textAlign: 'center'
            }
        
        var buttonStyleRight = {
                float : 'right',
                background : 'white',
                marginRight: 10,
                fontSize : 20,
                borderColor : 'black'
            }
            var buttonStyleLeft = {
            background : 'white',
            float: 'right',
            fontSize : 20,
            borderColor : 'black'
            }
           
                return (
                    <div>
                    <ImageLoader
                        image = {JsonData.HeungbooNolboo.data[this.state.page].image}/>
                    
                    <div style = {boxStyle}>
                        <div style = {letterStyle}>{JsonData.HeungbooNolboo.data[this.state.page].script}</div>
                            <button style = {buttonStyleRight} onClick = {this.nextPage}> next </button>
                            <button style = {buttonStyleLeft} onClick = {this.prevPage}> prev </button>   
                        </div>
                </div>
                );
            
           
                
        }
}


