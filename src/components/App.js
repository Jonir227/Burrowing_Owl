import React from 'react';
import ImageLoader from './ImageLoader'
import LetterBox from './LetterBox'
import Start from './Start'
class App extends React.Component {
    
   
   
    render(){
    
      
        var divStyle = {
            margin : 'hidden'
        }

      return (
               <div style = {divStyle}>
                   <Start/>
              </div>
          )
    

    
      
  
    }
}

export default App;