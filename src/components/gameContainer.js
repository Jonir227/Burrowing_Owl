import React, { PropType } from 'react';
import { BrowserRouter as Router, Link, Match, Miss } from 'react-router'
import Game from './game';
import Game2 from './game2';
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
    case "Game2":
      component = () => <Game2/>
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
    case "Game2":
      component = () => <Game2/>
      break;
    }
    this.setState({currentGame: component})
  }
  render() {

    return (
      <div>
        <button style = {{position: 'absolute', bottom: '5%', left: '30%', width: 50, height: 50}}
                onClick = {()=>this.newGame()}> Retry </button>
        <this.state.currentGame/>
        
        
        <Link to = '/Window'>
          <button style = {{position : 'absolute', bottom: '5%', right: '30%', width: 50, height: 50}}
                >Skip
          </button>
        </Link>
        
        
      </div>
    )
  }
}
