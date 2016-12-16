import React from 'react';
import Window from './Window'
import Start from './Start'
import Main from './Main'
import Game from './game'
<<<<<<< HEAD
import Draggame from './Draggame'
=======
import Game2 from './game2'
>>>>>>> 9d7b973b0fa0190970f236a420fd7c06c939fb05
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
                <Match exactly pattern="/" component={Start} />
                <Match pattern = "/Main" component={Main} />
                <Match pattern = "/Window" component = {Window}/>
                <Match pattern = "/Game" component = {Game}/>
<<<<<<< HEAD
                <Match pattern = "/Draggame" component = {Draggame}/>
=======
                <Match pattern = "/Game2" component = {Game2}/>
                <Match pattern = "/GameContainer/:name" component = {GameContainer}/>

>>>>>>> 9d7b973b0fa0190970f236a420fd7c06c939fb05
            </div>
        </Router>
        )
    }
}

export default App;
