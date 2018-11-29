// Core
import React, { Component } from "react";

// Instruments
import "./style.scss";

class Spinner extends Component {
    render () {
        const { spin } = this.props;

        return spin ? <div className = 'spinner' /> : null;
    }
}

export default Spinner;

Spinner.defaultProps ={
  spin: true
};