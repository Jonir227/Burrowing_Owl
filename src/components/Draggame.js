import React, { PropType } from 'react';
import { Draggable, Droppable } from 'react-drag-and-drop';

export default class Draggame extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            cursor: 'initial',
            message: "알맞는 구멍에 씨앗을 넣어보자!",
            score: 0,
            opacity: 1,
            opacity2: 1,
            opacity3: 1,
            opacity4: 1,

            index: 0,
            b1: 'none',
            b2: 'none',
            b3: 'none',
            b4: 'none',
            count: 0
        }
        this.seedDropped = this.seedDropped.bind(this);
        this.seedEntered = this.seedEntered.bind(this);
        this.seedLeaved = this.seedLeaved.bind(this);
    }



    seedDropped(data) {
        this.setState({isGoal: true, message: "잘했어!! 다음 씨앗을 뿌려보자구!", cursor: 'default'})
        this.state.score += 50;
        this.setState({score: this.state.score})

       if (this.state.index == 1) {
           this.setState({opacity: 0})
           this.state.count += 1;
           this.setState({count: this.state.count})
       }
       if (this.state.index == 2) {
           this.setState({opacity2: 0})
           this.state.count += 1;
           this.setState({count: this.state.count})
       }
       if (this.state.index == 3) {
           this.setState({opacity3: 0})
           this.state.count += 1;
           this.setState({count: this.state.count})
       }
       if (this.state.index == 4) {
           this.setState({opacity4: 0})
           this.state.count += 1;
           this.setState({count: this.state.count})
       }
       console.log(this.state.count);
       if (this.state.count == 4) {
           this.setState({message: "다 넣었구나! 다음 이야기로 넘어가보자!"})
       }
    }
    seedEntered() {
        this.setState({isGoal : false})
        this.setState({message: "그 씨앗은 어디로 가는게 좋을까?"})
    }
    seedLeaved() {
        if (!this.state.isGoal) {this.setState({message: "거긴 아닌거 같아! 다시 시도해봐.", cursor: 'initial'})
                                 this.state.score -= 50;
                                 this.setState({score: this.state.score})}
    }
    render() {
        var faceStyle = {
            top: 10,
            left: 900,
            width: 80,
            height: 80,
            position: 'absolute'
        }
        var messageStyle = {
            top: 10,
            left: 600,
            width: 300,
            height: 100,
            position: 'absolute',
            border: '2px double black'
        }
        var scoreStyle= {
            top: 200,
            left: 600,
            width: 100,
            height: 100,
            position: 'absolute',
            border: '2px solid black'
        }
        var backgroundStyle = {
            cursor: this.state.cursor,
            backgroundImage: 'url("./seedimage/background.jpg")',
            width: 500,
            height: 500,
        }
        var seedBox = {
            cursor: this.state.cursor,
            display: 'block',
            width: 500,
            height: 70,
            border: '2px solid black',
            borderWidth: 3
        }
        var seed1 = {
            width: 50,
            height: 50
        }
        var SeedHole1 = {
            width: 50,
            height: 50,
            position: 'absolute',
            top: 100,
            left: 200,
            opacity: this.state.opacity,
            border : this.state.b1
        }
        var SeedHole2 = {
            width: 50,
            height: 50,
            position: 'absolute',
            top: 200,
            left : 100,
            opacity: this.state.opacity2,
            border: this.state.b2,
        }
        var SeedHole3 = {
            width: 50,
            height: 50,
            position: 'absolute',
            top: 400,
            left: 400,
            opacity: this.state.opacity3,
            border:this.state.b3,
        }
        var SeedHole4 = {
            width: 50,
            height: 50,
            position: 'absolute',
            top: 300,
            left: 100,
            opacity: this.state.opacity4,
            border:this.state.b4,
        }

        return(
        <div>

        
            <div style={backgroundStyle}>
            { (this.state.opacity) ?
             <Droppable style ={SeedHole1}
                        types={['seed1']}
                        onDragOver={() => {
                            this.setState({b1: '2px solid red'})
                        }}
                        onDragLeave={() => {
                            this.setState({b1: 'none'})
                        }}
                        onDrop={this.seedDropped.bind(this)}>
               <img src='./seedimage/seed1.png' style={seed1}/>
             </Droppable>
            : null }
            
            { (this.state.opacity2) ? 
            <Droppable style ={SeedHole2}
                       types={['seed2']}
                       onDrop={this.seedDropped.bind(this)}>
                <img src='./seedimage/seed2.png' style={seed1}/>
            </Droppable>
            : null }

            { (this.state.opacity3) ? 
            <Droppable style ={SeedHole3}
                       types={['seed3']}
                       onDrop={this.seedDropped.bind(this)}>
                <img src='./seedimage/seed3.png' style={seed1}/>
            </Droppable>
            : null }

            { (this.state.opacity4) ? 
            <Droppable style ={SeedHole4}
                       types={['seed4']}
                       onDrop={this.seedDropped.bind(this)}>
                <img src='./seedimage/seed4.png' style={seed1}/>
            </Droppable>
            : null }
            </div>
            <div>
             <table style={seedBox}>
              <tr>
               { (this.state.opacity) ? 
               <td style={{width: 90}}> <Draggable type="seed1" data="1"
                                            onMouseEnter={()=> {
                                                this.setState({index: 1, cursor: 'pointer'})
                                            }}
                                            onMouseLeave={()=> {
                                                this.setState({index: 0, cursor: 'initial'})
                                            }}
                                            onDragStart={this.seedEntered.bind(this)}
                                            onDragEnd={this.seedLeaved.bind(this)}>
                                            <img src='./seedimage/seed1.png' style={seed1}/></Draggable></td>
               : null }
               { (this.state.opacity2) ?
               <td style={{width: 90}}> <Draggable type="seed2" data="seed2"
                                            onMouseEnter={()=> {
                                                this.setState({index: 2})
                                            }}
                                            onMouseLeave={()=> {
                                                this.setState({index: 0})
                                            }}
                                            onDragStart={this.seedEntered.bind(this)}
                                            onDragEnd={this.seedLeaved.bind(this)}>
                                            <img src='./seedimage/seed2.png' style={seed1}/></Draggable></td>
               : null }
               { (this.state.opacity3) ?
               <td style={{width: 90}}> <Draggable type="seed3" data="seed3"
                                            onMouseEnter={()=> {
                                                this.setState({index: 3})
                                            }}
                                            onMouseLeave={()=> {
                                                this.setState({index: 0})
                                            }}
                                            onDragStart={this.seedEntered.bind(this)}
                                            onDragEnd={this.seedLeaved.bind(this)}>
                                            <img src='./seedimage/seed3.png' style={seed1}/></Draggable></td>
               : null }
               { (this.state.opacity4) ?
               <td style={{width: 90}}> <Draggable type="seed4" data="seed4"
                                            onMouseEnter={()=> {
                                                this.setState({index: 4})
                                            }}
                                            onMouseLeave={()=> {
                                                this.setState({index: 0})
                                            }}
                                            onDragStart={this.seedEntered.bind(this)}
                                            onDragEnd={this.seedLeaved.bind(this)}>
                                            <img src='./seedimage/seed4.png' style={seed1}/></Draggable></td>
               : null }
              </tr>
             </table>
            </div>

            <div>
             <img src = './seedimage/face.png' style={faceStyle}/>
            </div>
            <div style={messageStyle}> {this.state.message}
            </div>

            <div style = {scoreStyle}>
                점수 : {this.state.score}
            </div>
        </div>
        );
    }
}