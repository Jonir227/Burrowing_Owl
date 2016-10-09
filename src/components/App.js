import React from 'react';
import Router from 'react-router/BrowserRouter';
import Match from 'react-router/Match';
import Link from 'react-router/Link';
import ImageLoader from './ImageLoader';
import LetterBox from './LetterBox';
import Start from './Start';

class App extends React.Component {
    
    render(){
    
        var divStyle = {
         margin : 'hidden'
        }
       return (
           <Router>
         <div style = {divStyle}>
           <Match exactly pattern="/" component={Start} />
           <Match pattern = "/LetterBox" component = {LetterBox}/>
         </div>
         </Router>
        )
    }
}

export default App;