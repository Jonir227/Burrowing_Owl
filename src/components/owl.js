import React, { PropType } from 'react';

export default class Owls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    }
    this.interval = undefined;
  }

  componentDidMount() {
    this.interval = setInterval(()=>{
      if(this.state.index < this.props.scripts.length - 1) this.setState({index: this.state.index + 1});
      else this.setState({index: 0});
      if(this.props.isDone === true) clearInterval(this.interval);
    }, 3000);
  }

  render() {
    let x = window.innerWidth * 0.99;
    let y = window.innerHeight * 0.98;
    return (
      <div>
        <img src = './image/부엉이.png'
           style = {{ width: x * 0.2, height: y * 0.3, position: 'absolute', left: x * 0.63, top: y * 0.6 - (y * 0.1)}}/>
         <img src = './image/speachBubble.png'
            style = {{ width: x * 0.3, height: y * 0.3, position: 'absolute', left: x * 0.56, top: y * 0.3 - (y * 0.1)}}/>
         <div style = {{ width: x * 0.27, height: y * 0.25, position: 'absolute', left: x * 0.58, top: y * 0.35 - (y * 0.1), fontSize: 30, fontWeight: 'bold'}}>
            {this.props.scripts[this.state.index]}
         </div>
      </div>
    )
  }
}
