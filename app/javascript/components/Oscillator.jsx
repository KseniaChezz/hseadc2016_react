import React from 'react'

const audioContext = new (window.AudioContext || window.webkitAudioContext)()
const oscillator = audioContext.createOscillator()

export default class Oscillator extends React.Component {
  constructor(props) {
    super(props)

    this.handleDownClick = this.handleDownClick.bind(this)
    this.handleUpClick = this.handleUpClick.bind(this)
    this.handlePlayClick = this.handlePlayClick.bind(this)

  }

  componentDidMount() {
    const { frequency } = this.props

    oscillator.type = 'square'
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)
    oscillator.connect(audioContext.destination)
  }

  componentDidUpdate() {
    const { play } = this.props

    if (play) {
      oscillator.connect(audioContext.destination)
      oscillator.start()
    } else {
      oscillator.stop()
    }
  }

  handleDownClick() {
    this.props.handleDownClick(this.props.index)
  }

  handleUpClick() {
    this.props.handleUpClick(this.props.index)
  }

  handlePlayClick() {
    this.props.handlePlayClick(this.props.index)
  }

  render() {
    const { title, frequency } = this.props

    return(
      <div className="Oscillator">
        <h1>{ title }</h1>
        <div className="play" onClick={ this.handlePlayClick }>Play</div>

        <div className="down" onClick={ this.handleDownClick }>-</div>

        <div className="result">
          { frequency }
        </div>

        <div className="up" onClick={ this.handleUpClick }>+</div>
      </div>
    )
  }
}
