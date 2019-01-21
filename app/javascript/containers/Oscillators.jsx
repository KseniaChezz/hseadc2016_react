import React from 'react'
import $ from 'jquery'

import Oscillator from '../components/Oscillator'

export default class Oscillators extends React.Component {
  constructor(props) {
    super(props)

    let oscillators = []

    props.oscillators.map(oscillator => {
      oscillator.play = false
      oscillators.push(oscillator)
    })

    this.state = {
      oscillators: oscillators
    }

    this.handleDownClick = this.handleDownClick.bind(this)
    this.handleUpClick = this.handleUpClick.bind(this)
    this.handlePlayClick = this.handlePlayClick.bind(this)
  }

  handleDownClick(index) {
    this.updateFrequency(index, 'down')
  }

  handleUpClick(index) {
    this.updateFrequency(index, 'up')
  }

  handlePlayClick(index) {
    let { oscillators } = this.state

    oscillators.map ((oscillator, i) => {
      if (index == i) {
        oscillator.play = !oscillator.play
      }
    })

    this.setState({
      oscillators: oscillators
    })
  }

  updateFrequency(index, actionType) {
    let { oscillators } = this.state

    oscillators.map ((oscillator, i) => {
      if (index == i) {
        if (actionType == 'down') { oscillator.frequency--}
        if (actionType == 'up')   { oscillator.frequency++}

        const { id, frequency } = oscillator

        $.ajax({
            dataType: "json",
            method: "POST",
            url: "/oscillators/tune",
            data: { id: id, param_name: "frequency", value: frequency }
          })
          .done(function() {
            console.log("success")
          })
          .fail(function(jqXHR, textStatus) {
            console.log("error")
          })
          .always(function() {
            console.log("complete")
          })
      }
    })

    this.setState({
      oscillators: oscillators
    })
  }

  render() {
    const { oscillators } = this.state
    let oscillatorElements = []

    oscillators.map((oscillator, i) => {
      oscillatorElements.push(
        <Oscillator
          {...oscillator}
          handleDownClick={ this.handleDownClick }
          handleUpClick={ this.handleUpClick }
          handlePlayClick={ this.handlePlayClick }
          index= { i }
          key={ i }
        />
      )
    })

    return (
      <div className="Oscillators">
        { oscillatorElements }
      </div>
    )
  }
}
