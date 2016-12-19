import React, { PropType } from 'react';
import { Draggable, Droppable } from 'react-drag-and-drop';
import Resizable from 'react-component-resizable';

export default class Draggame extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            width: window.innerWidth,
            height: window.innerHeight,
            message: "알맞는 구멍에 씨앗을 넣어보자!",
            border1: 'none',
            border2: 'none',
            border3: 'none',
            border4: 'none',
            border5: 'none',

            opacity: 1,
            opacity2: 1,
            opacity3: 1,
            opacity4: 1,
            opacity5: 1,

            isGoal: false,
            isGoal2: false,
            isGoal3: false,
            isGoal4: false,
            isGoal5: false,

            index: 0,
            count: 0
        }
        this.onResize = this.onResize.bind(this);
    }

    onResize() {
        this.setState({
            width: window.innerWidth,
            height: window.innerHeight,
        })
    }
    onDragLeave() {
        this.setState({
            border1: 'none',
            border2: 'none',
            border3: 'none',
            border4: 'none',
            border5: 'none',

        })
    }
    seedDropped() {
       if (this.state.index == 1) {
           this.state.count += 1;
           this.setState({opacity: 0, count: this.state.count, isGoal: true})
       }
       if (this.state.index == 2) {
           this.state.count += 1;
           this.setState({opacity2: 0, count: this.state.count, isGoal2: true})
       }
       if (this.state.index == 3) {
           this.state.count += 1;
           this.setState({opacity3: 0, count: this.state.count, isGoal3: true})
       }
       if (this.state.index == 4) {
           this.state.count += 1;
           this.setState({opacity4: 0, count: this.state.count, isGoal4: true})
       }
       if (this.state.index == 5) {
           this.state.count += 1;
           this.setState({opacity5: 0, count: this.state.count, isGoal5: true})
       }
       if (this.state.count == 5) {
           alert("WELL DONE. MISSION COMPLETE");
       }
    }
    render() {
        var SeedHole1 = {
            border: this.state.border1,
            borderRadius: 200,
            width: this.state.width * 0.1,
            height: this.state.height * 0.15,
            position: 'absolute',
            top: this.state.height * 0.1,
            left: this.state.width * 0.15,
            opacity: this.state.opacity
        }
        var SeedHole2 = {
            border: this.state.border2,
            borderRadius: 200,
            width: this.state.width * 0.1,
            height: this.state.height * 0.15,
            position: 'absolute',
            top: this.state.height * 0.4,
            left: this.state.width * 0.35,
            opacity: this.state.opacity2
        }
        var SeedHole3 = {
            border: this.state.border3,
            borderRadius: 200,
            width: this.state.width * 0.1,
            height: this.state.height * 0.15,
            position: 'absolute',
            top: this.state.height * 0.53,
            left: this.state.width * 0.09,
            opacity: this.state.opacity3
        }
        var SeedHole4 = {
            border: this.state.border4,
            borderRadius: 200,
            width: this.state.width * 0.1,
            height: this.state.height * 0.15,
            position: 'absolute',
            top: this.state.height * 0.75,
            left: this.state.width * 0.5,
            opacity: this.state.opacity4
        }
        var SeedHole5 = {
            border: this.state.border5,
            borderRadius: 200,
            width: this.state.width * 0.1,
            height : this.state.height * 0.15,
            position : 'absolute',
            top: this.state.height * 0.1,
            left: this.state.width * 0.4,
            opacity: this.state.opacity5,
        }
        var SeedStart = {
            width: this.state.width * 0.1,
            height: this.state.height * 0.15,
            position: 'absolute',
            top: this.state.height * 0.66,
            left: this.state.width * 0.76,
        }

        return(
        <div>

            <div>
             <Resizable onResize={this.onResize}> 
                <img src="./seedimage/background.png" style={{
                    width: this.state.width * 0.98,
                    height: this.state.height * 0.98,
                }}/>
                
             <Droppable style ={SeedHole1}
                        types={['seed1']}
                        onDrop={this.seedDropped.bind(this)}>
                    <img src='./seedimage/seedhole1.png' style={{
                        width: this.state.width * 0.1,
                        height: this.state.height * 0.15
                    }}
                    onDragEnter={()=>{
                    this.setState({border1: '7px solid red'})
                    }}
                    onDragLeave={()=>{
                    this.setState({border1: 'none'})
                    }}/>
             </Droppable>

            <Droppable style ={SeedHole2}
                       types={['seed2']}
                       onDrop={this.seedDropped.bind(this)}>
                <img src='./seedimage/seedhole2.png' style={{
                    width: this.state.width * 0.1,
                    height: this.state.height * 0.15,
                }}
                onDragEnter={()=>{
                    this.setState({border2: '7px solid red'})
                }}
                onDragLeave={()=>{
                    this.setState({border2: 'none'})
                }}/>
            </Droppable>

            <Droppable style ={SeedHole3}
                       types={['seed3']}
                       onDrop={this.seedDropped.bind(this)}>
                <img src='./seedimage/seedhole3.png' style={{
                    width: this.state.width * 0.1,
                    height: this.state.height * 0.15
                }}
                onDragEnter={()=> {
                  this.setState({border3: '7px solid red'})  
                }}
                onDragLeave={()=>{
                    this.setState({border3: 'none'})
                }}/>
            </Droppable>

            <Droppable style ={SeedHole4}
                       types={['seed4']}
                       onDrop={this.seedDropped.bind(this)}>
                <img src='./seedimage/seedhole4.png' style={{
                    width: this.state.width * 0.1,
                    height: this.state.height * 0.15,
                }}
                onDragEnter={()=>{
                    this.setState({border4: '7px solid red'})
                }}
                onDragLeave={()=>{
                    this.setState({border4: 'none'})
                }}/>
            </Droppable>

            <Droppable style ={SeedHole5}
                       types={['seed5']}
                       onDrop={this.seedDropped.bind(this)}>
                <img src='./seedimage/seedhole5.png' style={{
                    width: this.state.width * 0.1,
                    height: this.state.height * 0.15,
                }}
                onDragEnter={()=>{
                    this.setState({border5: '7px solid red'})
                }}
                onDragLeave={()=>{
                    this.setState({border5: 'none'})
                }}/>
            </Droppable>


            <div style={SeedStart}>

                {(!this.state.isGoal) ?
                <Draggable type="seed1" data="seed1">
                <img src='./seedimage/seed1.png'
                    onMouseEnter={()=> {
                        this.setState({index: 1})  
                    }}
                    onMouseLeave={()=>{
                        this.setState({index: 0})
                    }}
                    onDragEnd={this.onDragLeave.bind(this)}
                    style = {{
                        width: this.state.width * 0.1,
                        height: this.state.height * 0.15,
                        position: 'absolute'
                    }}/> </Draggable> :
                null }
                {(this.state.isGoal && !this.state.isGoal2) ? 
                <Draggable type="seed2" data="seed2">
                <img src='./seedimage/seed2.png'
                 onMouseEnter={()=> {
                        this.setState({index: 2})  
                    }}
                    onMouseLeave={()=>{
                        this.setState({index: 0})
                    }}
                    onDragEnd={this.onDragLeave.bind(this)}
                    style = {{
                        width: this.state.width * 0.1,
                        height: this.state.height * 0.15,
                        position: 'absolute'
                    }}/> </Draggable> :
                null }

                {(this.state.isGoal2 && !this.state.isGoal3) ?
                <Draggable type="seed3" data="seed3">
                <img src='./seedimage/seed3.png'
                    onMouseEnter={()=> {
                        this.setState({index: 3})  
                    }}
                    onMouseLeave={()=>{
                        this.setState({index: 0})
                    }}
                    onDragEnd={this.onDragLeave.bind(this)}
                    style = {{
                        width: this.state.width * 0.1,
                        height: this.state.height * 0.15,
                        position: 'absolute'
                    }}/> </Draggable> :
                null }
               
               {(this.state.isGoal3 && !this.state.isGoal4) ? 
                <Draggable type="seed4" data="seed4"> 
                <img src = './seedimage/seed4.png'
                    onMouseEnter={()=> {
                        this.setState({index: 4})
                    }}
                    onMouseLeave={()=> {
                        this.setState({index: 0})
                    }}
                    onDragEnd={this.onDragLeave.bind(this)}
                    style= {{
                        width: this.state.width * 0.1,
                        height: this.state.height * 0.15,
                        position: 'absolute'
                    }}/> </Draggable> :
               null}

               {(this.state.isGoal4 && !this.state.isGoal5) ? 
                <Draggable type="seed5" data="seed5"> 
                <img src = './seedimage/seed5.png'
                    onMouseEnter={()=> {
                        this.setState({index: 5})
                    }}
                    onMouseLeave={()=> {
                        this.setState({index: 0})
                    }}
                    onDragEnd={this.onDragLeave.bind(this)}
                    style= {{
                        width: this.state.width * 0.1,
                        height: this.state.height * 0.15,
                        position: 'absolute'
                    }}/> </Draggable> :
               null}
            </div>

            </Resizable>
            </div>
        </div>
        );
    }
}
