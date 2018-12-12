// Core
import React, { Component } from 'react';

// Instruments
import './style.scss';

class Phone extends Component {

  state = {
    phone: '+38(___) ___ __ __',
    userPhone: [],
    phoneCaretPos: 4,
  };

  setCaretPosition = (e, caretPosition = this.state.phoneCaretPos) => {
    let el = e.target;

    document.getElementById('phone').classList.add('focus-color');
    setTimeout(function() {
      el.setSelectionRange(caretPosition, caretPosition);
    }, 0);
  };

  getUserPhone = (str) => {
    let arr = str.split('');
    let userNumber = arr.slice(4, 7);

    userNumber.push(...arr.slice(9, 12));
    userNumber.push(...arr.slice(13, 15));
    userNumber.push(...arr.slice(16, 18));

    return userNumber.join('').match(/\d/g);
  };

  getPhone = (str) => {
    let template = '+38(___) ___ __ __';
    let userPhoneArr = this.getUserPhone(str);

    if (userPhoneArr === null) {return template}
    let templateStr = `+38(${userPhoneArr[0] || '_'}${userPhoneArr[1] || '_'}${userPhoneArr[2] || '_'}) ${userPhoneArr[3] || '_'}${userPhoneArr[4] || '_'}${userPhoneArr[5] || '_'} ${userPhoneArr[6] || '_'}${userPhoneArr[7] || '_'} ${userPhoneArr[8] || '_'}${userPhoneArr[9] || '_'}`;

    return templateStr;
  };

  getCaretPosition = (str) => {
    let regexp = /\d/g;
    let lastIndex = 4;

    while (regexp.exec(str)) {
      if (regexp.lastIndex > 4) {lastIndex = regexp.lastIndex}
    }
    switch (lastIndex) {
      case 7:
        lastIndex = 9;
        break;
      case 12:
        lastIndex = 13;
        break;
      case 15:
        lastIndex = 16;
        break;
    }
    return lastIndex;
  };

  keyDownHandler = (e) => {
    if (e.keyCode === 8) {    // backspace
      this.deleteDigit();
    }
  };

  deleteDigit = (str = this.state.phone, caretPos = this.state.phoneCaretPos) => {
    const singularityIndexes = [9, 13, 16];
    if (singularityIndexes.includes(caretPos)) {
      let regexp = /\d/g;

      let lastIndex = 4;
      while (regexp.exec(str) && regexp.lastIndex < caretPos) {
        if (lastIndex < regexp.lastIndex) {lastIndex = regexp.lastIndex}
      }
      let arr = str.split('');
      arr.splice(lastIndex -1, 1, '_');

      this.setState({
        phone: arr.join(''),
      });
    }
  };

  changePhoneNum = (event) => {
    let e = event;
    let value = e.target.value;
    let userPhone = this.getUserPhone(value);
    let caretPosition = this.getCaretPosition(value);

    if (userPhone !== null) {
      document.getElementById('phone').classList.add('filled');
      if(this.state.userPhone !== null && userPhone.length > 8) {
        document.getElementById('spot').style.display = 'none';
      } else {document.getElementById('spot').style.display = 'block';}
    } else {
      document.getElementById('spot').style.display = 'block';
      document.getElementById('phone').classList.remove('filled');
    }

    this.setState({
      phone: this.getPhone(value),
      userPhone,
      phoneCaretPos: this.getCaretPosition(value),
    });
    this.setCaretPosition(e, caretPosition);
  };

  render() {

    return (
        <fieldset className='phone'>
          <legend>Phone</legend>
          <input
              type="text"
              id='phone'
              className='hide-cursor'
              value={this.state.phone}
              onChange={this.changePhoneNum}
              onFocus={this.setCaretPosition}
              onKeyDown={this.keyDownHandler}
          />
          <div id='spot'></div>
        </fieldset>
    );
  }
}

export default Phone;

