import React, { PropType } from 'react';
import Game from './game';
import AvoidBat from './avoidBat';

export default class GameContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentGame: ()=><AvoidBat/>
    }
    this.newGame = this.newGame.bind(this);
  }

  componentWillMount(){
    let component;
    switch(this.props.params.name){
    case "AvoidBat":
      component = () => <AvoidBat/>
      break;
    case "Game":
      component = () => <Game/>
      break;
    }
    this.setState({currentGame: component})
  }

  newGame() {
    let component;
    switch(this.props.params.name){
    case "AvoidBat":
      component = () => <AvoidBat/>
      break;
    case "Game":
      component = () => <Game/>
      break;
    }
    this.setState({currentGame: component})
  }
  render() {
    let Game = this.state.currentGame;
    return (
      <div>
        <button style = {{position: 'absolute', bottom: '5%', left: '30%', width: 50, height: 50}}
                onClick = {()=>this.newGame()}> Retry </button>
        <Game/>
      </div>
    )
  }
}
