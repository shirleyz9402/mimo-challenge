import React from 'react'

export default class Lesson extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      text: [],
      color:[],
      input: null,
      answer:'',
      start: null
    }
  }
    componentDidMount(){
      this.fetchData()
    }
    fetchData = () =>{
      fetch('https://file-bzxjxfhcyh.now.sh/')
      .then(r => r.json())
      .then(r => r.lessons.filter(lesson => lesson.id === this.props.currentLesson)[0].content.forEach(
        pt => this.setState(
        {
          text: [...this.state.text, pt.text],
          color: [...this.state.color, pt.color],
          start: Date.now()
        })
      )).then(this.hasInput())
    }

    componentWillReceiveProps(nextProps){
      if (nextProps.currentLesson !== this.props.currentLesson){
        this.setState({
          text: [],
          color:[],
          input: null,
          answer:'',
          start: null
        })
        this.fetchData()
      }
    }
    hasInput = () => {
      let startIndex = null
      let endIndex = null
      fetch('https://file-bzxjxfhcyh.now.sh/')
      .then(r => r.json())
      .then(r => {
        let input = r.lessons.filter(lesson => lesson.id === this.props.currentLesson)[0].input
        if (input){
          startIndex = input.startIndex + 1
          endIndex = input.endIndex + 1
          this.setState({input: this.state.text.join(" ").slice(startIndex,endIndex)})
        }
      })
    }

    handleAnswer = event => {
      this.setState({answer: event.target.value})
    }
    handleComplete = () => {
      let data = {
        lesson: this.props.currentLesson,
        start: this.state.start,
        finish: Date.now()
      }
      this.setState({currentLesson: this.state.currentLesson+1})
      this.props.isCompleted(data)
    }
  render(){
    console.log('-----LESSON STATE',this.state)
    console.log('-----LESSON PROPS',this.props)
    const renderText = !this.state.input ?
        this.state.text.map((text,index) => {
          return (
          <div style={{backgroundColor:this.state.color[index]}}>{text}</div>
        )
      }) : this.state.text.map((text, index) => {
        if (text.includes(this.state.input)){
          return (
            <div style={{backgroundColor:this.state.color[index]}}>
              <input onChange={this.handleAnswer}/>{text.slice(-(text.length - this.state.input.length))}
            </div>
          )
        }
        else {
          return (
            <div style={{backgroundColor:this.state.color[index]}}>{text}</div>
          )
        }
      })
      const renderButton = !this.state.input ? <button onClick={this.handleComplete}>Continue</button> :
      this.state.input === this.state.answer ? <button onClick={this.handleComplete}>Continue</button> :
      <button disabled>Continue</button>
    return(
      <div>
        {renderText}
        {renderButton}
      </div>
    )
  }
}
