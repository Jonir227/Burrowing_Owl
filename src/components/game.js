import React, { PropType } from 'react';

const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0) - 30;

export default class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      x: 100,
      y: 100,
      xDirection: true,
      yDirection: true,
      message: '',
      count: 0,
    }
    this.lotateRhythm = this.lotateRhythm.bind(this);
    this.lotateRhythm();
    this.keyboardListener = this.keyboardListener.bind(this);
  }

  componentDidMount(){
    window.addEventListener('keydown', this.keyboardListener);
  }

  componentWillUnmount(){
    window.removeEventListener('keydown', this.keyboardListener);
  }

  lotateRhythm(){
    let interval = setInterval(()=>{
      if(this.state.x == width - 100 || this.state.x == 100) this.setState({xDirection: !this.state.xDirection});
      if(this.state.y == width - 100 || this.state.y == 100) this.setState({yDirection: !this.state.yDirection});
      (this.state.xDirection) ? (this.state.x + 5 > width - 100) ? this.setState({x: width - 100}) : this.setState({x: this.state.x + 5})
      : (this.state.x - 5 < 100) ? this.setState({x: 100}) : this.setState({x: this.state.x - 5})
      if(this.state.yDirection){
        (this.state.y + 20 > width - 100) ? this.setState({y: width - 100}) : this.setState({y: this.state.y + 20})
      }
      else {
        (this.state.y - 20 < 100) ? this.setState({y: 100}) : this.setState({y: this.state.y - 20});
      }
      if(this.state.count >= 5) {
        clearInterval(interval);
        alert("congraturation!!");
      }
    }, 30);
  }

  keyboardListener(event) {
    if (event.keyCode === 37) {
      (this.state.x <= 150 && this.state.y <= 150) ? this.setState({count: this.state.count + 2, message: "Wow!!!"}) :
      (this.state.x <= 150 || this.state.y <= 150) ? this.setState({count: this.state.count + 1, message: "Good!!!"}) :
      this.setState({count: this.state.count - 1, message: "Try hard"})
    }
    if (event.keyCode === 39) {
      (this.state.x >= 1260 && this.state.y >= 1260) ? this.setState({count: this.state.count + 2, message: "Wow!!!"}) :
      (this.state.x >= 1260 || this.state.y >= 1260) ? this.setState({count: this.state.count + 1, message: "Good!!!"}) :
      this.setState({count: this.state.count - 1, message: "Try hard"})
    }
    if(this.state.count >= 10) window.removeEventListener('keydown', this.keyboardListener);
  }

  render(){
    return (
      <div>
        <div style = {{width: width, height: 100, background: 'black'}}>
          <button style = {{width: 100, height: 100, position: 'absolute', left: 0}}
                  onClick = {() => {
                    (this.state.x <= 150 && this.state.y <= 150) ? this.setState({count: this.state.count + 2, message: "Wow!!!"}) :
                    (this.state.x <= 150 || this.state.y <= 150) ? this.setState({count: this.state.count + 1, message: "Good!!!"}) :
                    this.setState({count: this.state.count - 1, message: "Try hard"})
                  }}/>
          <div style = {{width: 30, height: 100, position: 'absolute', background: 'pink', left: this.state.x}}/>
          <div style = {{width: 30, height: 100, position: 'absolute', background: 'red', left: this.state.y}}/>
          <div style = {{width: 30, height: 100, position: 'absolute', background: 'yellow', left: 150}}/>
          <div style = {{width: 30, height: 100, position: 'absolute', background: 'yellow', left: 1260}}/>
          <button style = {{width: 100, height: 100, position: 'absolute', right: 0}}
                  onClick = {() => {
                    (this.state.x >= 1260 && this.state.y >= 1260) ? this.setState({count: this.state.count + 2, message: "Wow!!!"}) :
                    (this.state.x >= 1260 || this.state.y >= 1260) ? this.setState({count: this.state.count + 1, message: "Good!!!"}) :
                    this.setState({count: this.state.count - 1, message: "Try hard"})
                  }}/>
        </div>
        <img src = './image/image7.png'
             style = {{width: width, height : 500}}/>
        <div style = {{width: width, fontSize: 20, textAlign: 'center'}}> {this.state.message} 현재 점수는 {this.state.count} 입니다! </div>
      </div>
    )
  }
}
