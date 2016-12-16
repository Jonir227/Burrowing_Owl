import React, { PropType } from 'react';
import Bat from './bat';
export default class AvoidBat extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      n: 20,
      heroPosition: window.innerHeight * 0.85,
      busy: true,
      start: 0,
      time: ''
    }
    this.renderHero = this.renderHero.bind(this);
    this.keyboardListener = this.keyboardListener.bind(this);
    this.toggleBusy = this.toggleBusy.bind(this);
    this.formatTime = this.formatTime.bind(this);
    this.pad = this.pad.bind(this);
  }
  componentDidMount() {
    window.addEventListener('keydown', this.keyboardListener);
    this.setState({start: (new Date()).getTime()})
    let clockTimer = setInterval(()=>{
      this.formatTime((new Date()).getTime() - this.state.start);
      if(!this.state.busy) clearInterval(clockTimer);
    }, 1);
  }

  pad(num, size) {
  	var s = "0000" + num;
  	return s.substr(s.length - size);
  }


  formatTime(time) {
    let h = 0, m = 0, s = 0, ms = 0;
  	let newTime = '';
  	h = Math.floor( time / (60 * 60 * 1000) );
  	time = time % (60 * 60 * 1000);
  	m = Math.floor( time / (60 * 1000) );
  	time = time % (60 * 1000);
  	s = Math.floor( time / 1000 );
  	ms = time % 1000;
  	newTime = this.pad(h, 2) + ':' + this.pad(m, 2) + ':' + this.pad(s, 2) + ':' + this.pad(ms, 3);
    this.setState({time: newTime});
  }

  componentWillUnmount(){
    window.removeEventListener('keydown', this.keyboardListener);
    clearInterval(clockTimer);
  }

  componentWillUpdate(nextProps, nextState) {
    if(!nextState.busy) window.removeEventListener('keydown', this.keyboardListener);
  }

  toggleBusy() {
    this.setState({busy: false});
  }
  keyboardListener(event) {
    if (event.keyCode === 37) {
      if(this.state.heroPosition >= 10) this.setState({heroPosition: this.state.heroPosition - 10})
      else if(this.state.heroPosition > 0) this.setState({heroPosition: 0})
    }
    if (event.keyCode === 39) {
      if(this.state.heroPosition <= window.innerWidth - 10) this.setState({heroPosition: this.state.heroPosition + 10})
      else if(this.state.heroPosition < window.innerWidth) this.setState({heroPosition:window.innerWidth + 10})
    }
    if(this.state.count >= 10) window.removeEventListener('keydown', this.keyboardListener);
  }


  renderHero() {
    return (
      <img src = '../image/hero1.png'
           style = {{top:  window.innerHeight * 0.8, left: this.state.heroPosition, width: 100, height: 200, position: 'absolute'}}/>
    )
  }
  render() {
    let bats = [];
    for(let i = 0; i < this.state.n; i++){
      bats.push(<Bat key = {i}
                     toggleBusy = {this.toggleBusy}
                     heroPosition = {this.state.heroPosition}
                     busy = {this.state.busy}/>)
    }
    return (
      <div>
        
        <div style = {{background: 'green', width: window.innerWidth, height: window.innerHeight, position: 'relative'}}>
          {bats}
          {this.renderHero()}
        </div>
        <div style = {{left: '5%', position: 'absolute'}}> Time: {this.state.time}</div>
      </div>
    );
  }
}
