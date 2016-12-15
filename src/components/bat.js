import React, { PropType } from 'react';

export default class Bat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      positionX: Math.floor((Math.random() * 25)),
      positionY: 0,
      speed: Math.floor((Math.random() * 5) + 1),
      done: false
    }
    this.enemyInterval = undefined;
  }
  componentDidMount() {
    this.enemyInterval = setInterval(() => {
      if(this.state.positionX < 450 - this.state.speed * 10) this.setState({positionY: this.state.positionY + (this.state.speed * 10)})
      else if(this.state.positionX <= 450) this.setState({positionY: 449});
      if(this.state.positionY >= 450) {
        this.setState({positionY: 0, speed: Math.floor((Math.random() * 5) + 1), positionX: Math.floor((Math.random() * 25))});
      }
      if(400 <= this.state.positionY && this.state.positionX * 20 - 3<= this.props.heroPosition  && this.state.positionX * 20 + 28 >= this.props.heroPosition)
        this.props.toggleBusy();
      if(!this.props.busy) clearInterval(this.enemyInterval);
    }, 100);
  }

  componentWillUnmount() {
    clearInterval(this.enemyInterval);
  }
  render() {
    return (
      <div>
        <img src = "../image/magicBat.jpg"
  render() {
    return (
      <div>
        <img src = "./image/magicBat.jpg"
             style = {{width: 20, height: 60, opacity: (this.state.done) ? 0 : 1, position: 'absolute', left: this.state.positionX * 20, top: this.state.positionY}}/>
      </div>
    )
  }
}
