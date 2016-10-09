import React from 'react';
import ImageLoader from './ImageLoader'
import LetterBox from './LetterBox'
class App extends React.Component {
    render(){

        return (

                <div>
                    <ImageLoader image = './image1.png'/>
                    <LetterBox/>
                </div>
        );
    }
}

export default App;
