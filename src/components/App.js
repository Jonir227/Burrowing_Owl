import React from 'react';
import LetterBox from './LetterBox'
import Start from './Start'
import { BrowserRouter as Router, Link, Match, Miss } from 'react-router'



class App extends React.Component {
    
   
   
    render(){
    
      
        var divStyle = {
            margin : 'hidden'
        }
     

      return (
          
           
        <Router>
            <div style = {divStyle}>
                <Match exactly pattern="/" component={Start} />
                <Match pattern = "/Main" component={Main} />
                <Match pattern = "/LetterBox" component = {LetterBox}/>
            </div>
        </Router>
        )
          
       
    

    
      
  
    }
}

export default App;