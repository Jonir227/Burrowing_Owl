import React, { PropType } from 'react';

export default class Bat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      positionX: Math.floor((Math.random() * window.innerWidth * 0.99 - 50 )),
      positionY: 0,
      speed: Math.floor((Math.random() * 10) + 1),
      done: false
    }
    this.enemyInterval = undefined;
  }
  componentDidMount() {
    this.enemyInterval = setInterval(() => {
      if(this.state.positionX < window.innerWidth * 0.99 ) this.setState({positionY: this.state.positionY + (this.state.speed * 10)})
      else if(this.state.positionX <= window.innerWidth * 0.99) this.setState({positionY: window.innerHeight * 0.98});
      if(this.state.positionY >= window.innerHeight * 0.98 - this.state.speed * 10) {
        this.setState({positionY: 0, speed: Math.floor((Math.random() * 10) + 1), positionX: Math.floor((Math.random() *window.innerWidth * 0.99 ))});
      }
      if(window.innerHeight * 0.98 - 250 <= this.state.positionY && this.state.positionX -100 <= this.props.heroPosition  && this.state.positionX + 50 >= this.props.heroPosition)
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
             style = {{width: 50, height: 100, opacity: (this.state.done) ? 0 : 1, position: 'absolute', left: this.state.positionX, top: this.state.positionY}}/>
      </div>
    )
  }
}
