import React from 'react';
import Window from './Window'
import Start from './Start'
import Main from './Main'
import Game from './game'
import CureSwallow from './cureSwallow'
import AvoidBat from './avoidBat';
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
                <Match exactly pattern="/" component={Window} />
                <Match pattern = "/Main" component={Main} />
                <Match pattern = "/Window" component = {Window}/>
            </div>
        </Router>
        )
    }
}

export default App;