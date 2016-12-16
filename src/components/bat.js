import React, { PropType } from 'react';

export default class Bat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      positionX: Math.floor((Math.random() * window.innerWidth / 20)),
      positionY: 0,
      speed: Math.floor((Math.random() * 5) + 1),
      done: false
    }
    this.enemyInterval = undefined;
  }
  componentDidMount() {
    this.enemyInterval = setInterval(() => {
      if(this.state.positionX < window.innerWidth - this.state.speed * 10) this.setState({positionY: this.state.positionY + (this.state.speed * 10)})
      else if(this.state.positionX <= window.innerWidth) this.setState({positionY: window.innerWidth - 1});
      if(this.state.positionY >= window.innerHeight) {
        this.setState({positionY: 0, speed: Math.floor((Math.random() * 5) + 1), positionX: Math.floor((Math.random() * window.innerWidth / 20))});
      }
      if(window.innerHeight - 250 <= this.state.positionY && this.state.positionX * 20 -50 <= this.props.heroPosition  && this.state.positionX * 20 + 50 >= this.props.heroPosition)
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
        <img src = "./image/magicBat.jpg"
             style = {{width: 50, height: 60, opacity: (this.state.done) ? 0 : 1, position: 'absolute', left: this.state.positionX * 20, top: this.state.positionY}}/>
      </div>
    )
  }
}
