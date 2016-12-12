import React, { PropType } from 'react';
import { BrowserRouter as Router, Link, Match, Miss } from 'react-router'
import Modal from 'react-modal'

export default class MessageBox extends React.Component {
  render() {
    return (
      <Modal isOpen={this.props.boxVisible}
             style={this.props.customStyles}>
              <h1>{this.props.title}</h1>
              { (this.props.isLink) ?
                <Link to = {this.props.path}>
                  <button style={{position:'absolute', left: 30}}>예</button>
                </Link>
                :
                <button style={{position:'absolute', left: 30}}
                        onClick = {this.props.leftButtonEvent}>예</button>
              }
              <button onClick={this.props.rightButtonEvent}
                      style={{position:'absolute', right: 30}}>아니요</button>
            </Modal>
    );
  }
}
