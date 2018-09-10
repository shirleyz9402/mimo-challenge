import React, { Component } from 'react';
import Lesson from './Lesson.js'

import './App.css'

class App extends Component {
  state = {
    currentLesson: 5,
    lastCompleted: null,
    completedLessons:[]
  }

  handleComplete = (data) => {
    if (this.state.lastCompleted === null){
      this.setState({
        currentLesson: this.state.currentLesson + 1,
        lastCompleted: 5,
        completedLessons: [...this.state.currentLesson, data]
      })
    }
    else {
      this.setState({
        currentLesson: this.state.currentLesson+1,
        lastCompleted: this.state.lastCompleted+1
      })
    }
  }

  render() {
    console.log('-----APP STATE', this.state)
    return (
      <div className="App">
      {this.state.currentLesson && this.state.currentLesson <= 7 ?
        <Lesson isCompleted={this.handleComplete} currentLesson={this.state.currentLesson}/> :
        <p>done</p>
      }
      </div>
    );
  }
}

export default App;
