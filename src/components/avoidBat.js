import React, { PropType } from 'react';
import Bat from './bat';
export default class AvoidBat extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      n: 15,
      heroPosition: window.innerWidth * 0.99 / 2 - 50,
      busy: true,
      start: 0,
      time: '',
      recordTime : '',
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
    let recordTime = '';
  	h = Math.floor( time / (60 * 60 * 1000) );
  	time = time % (60 * 60 * 1000);
  	m = Math.floor( time / (60 * 1000) );
  	time = time % (60 * 1000);
  	s = Math.floor( time / 1000 );
  	ms = time % 1000;
  	newTime = this.pad(h, 2) + ':' + this.pad(m, 2) + ':' + this.pad(s, 2) + ':' + this.pad(ms, 3);
    recordTime = this.pad(h, 2) + ':' + this.pad(m, 2) + ':' + this.pad(s, 2);
    this.setState({time: newTime});
    this.setState({recordTime : recordTime});
  }

  componentWillUpdate(nextProps, nextState) {
    if(!nextState.busy) window.removeEventListener('keydown', this.keyboardListener);
  }

  toggleBusy() {
    let score = this.state.time[6] * 10 + this.state.time[7] * 1;
    this.setState({busy: false});
    this.props.setGameDone();
    this.props.setScore(score);
    if(score >= 5) this.props.setGameSuccess();
    
  }
  keyboardListener(event) {
    if (event.keyCode === 37) {
      if(this.state.heroPosition >= 30) this.setState({heroPosition: this.state.heroPosition - 30})
      else if(this.state.heroPosition >= 0) this.setState({heroPosition: 0})
    }
    if (event.keyCode === 39) {
      if(this.state.heroPosition <= window.innerWidth * 0.99 - 30) this.setState({heroPosition: this.state.heroPosition + 30})
      else if(this.state.heroPosition < window.innerWidth * 0.99) this.setState({heroPosition: window.innerWidth * 0.99})
    }
    if(this.state.count >= 30) window.removeEventListener('keydown', this.keyboardListener);
  }


  renderHero() {
    return (
      <img src = './image/game/hero.png'
           style = {{top:  window.innerHeight * 0.98 - 150, left: this.state.heroPosition, width: 100, height: 150, position: 'absolute'}}/>
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
      <div style ={{width : window.innerWidth * 0.99, height : window.innerHeight * 0.98, overflow : 'hidden'}}>
       
        <div style = {{background: "url(" + "./image/game/background.png" + ")", width: window.innerWidth * 0.99, height: window.innerHeight * 0.98, position: 'absolute', top: 0, left: 0}}>
          {bats}
          {this.renderHero()}
        </div>
         <div style = {{left: '3%', position: 'absolute', top: '3%'}}> Time: {this.state.time}</div>
      </div>
    );
  }
}
