import React from 'react';
import Window from './Window'
import Start from './Start'
import Main from './Main'
import Game from './game'
import Game2 from './game2'
import AvoidBat from './avoidBat';
import GameContainer from './gameContainer';
import { BrowserRouter as Router, Link, Match, Miss } from 'react-router'

class App extends React.Component {

    render(){

        var divStyle = {
         location:'absolute',
         margin : 'hidden'

        }

      return (
        <Router>
            <div style = {divStyle}>
                <Match exactly pattern="/" component={Game2} />
                <Match pattern = "/Main" component={Main} />
                <Match pattern = "/Window" component = {Window}/>
                <Match pattern = "/Game" component = {Game}/>
                <Match pattern = "/Game2" component = {Game2}/>
                <Match pattern = "/GameContainer/:name" component = {GameContainer}/>

            </div>
        </Router>
        )
    }
}

export default App;
