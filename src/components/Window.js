import React, { PropType } from 'react';
import ImageLoader from './ImageLoader';
import LetterBox from './LetterBox';
import JsonData from './subtitle.json';

export default class Window extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      page : 0,
      max : JsonData.HeungbooNolboo.page,
      done : false
    }
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    console.log("Im in");
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
    return (
      <div>
        <ImageLoader image = {JsonData.HeungbooNolboo.data[this.state.page].image}/>
        <LetterBox script = {JsonData.HeungbooNolboo.data[this.state.page].script}
                   nextPage = {this.nextPage}
                   prevPage = {this.prevPage}/>
      </div>
    )
  }
}
