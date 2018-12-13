// Core
import React, {Component} from 'react';
// Instruments
import './style.scss';

class Phone extends Component {

  state = {
    userPhone: [],
    caretPos: 4,
  };

  setCaretPosition = (e, caretPosition = this.state.caretPos) => {
    let el = e.target;

    setTimeout(function() {
      el.setSelectionRange(caretPosition, caretPosition);
    }, 0);
  };

  clickCaretPosition = (e, caretPosition = this.state.caretPos) => {
    let el = e.target;
    if (el.selectionStart > caretPosition) {
      setTimeout(function() {
        el.setSelectionRange(caretPosition, caretPosition);
      }, 0);
    }
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

    if (userPhoneArr === null) return template;
    return `+38(${userPhoneArr[0] || '_'}${userPhoneArr[1] || '_'}${userPhoneArr[2] || '_'}) ${userPhoneArr[3] || '_'}${userPhoneArr[4] || '_'}${userPhoneArr[5] || '_'} ${userPhoneArr[6] || '_'}${userPhoneArr[7] || '_'} ${userPhoneArr[8] || '_'}${userPhoneArr[9] || '_'}`;
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
      default:
    }
    return lastIndex;
  };

  keyDownHandler = (e) => {
    if (e.keyCode === 8) this.deleteDigit();
  };

  deleteDigit = (str = this.props.phone, caretPos = this.state.caretPos) => {
    const singularityIndexes = [9, 13, 16];
    if (singularityIndexes.includes(caretPos)) {
      let regexp = /\d/g;

      let lastIndex = 4;
      while (regexp.exec(str) && regexp.lastIndex < caretPos) {
        if (lastIndex < regexp.lastIndex) lastIndex = regexp.lastIndex;
      }
      let arr = str.split('');
      arr.splice(lastIndex -1, 1, '_');

      this.props.setPhone(arr.join(''));
    }
  };

  changePhoneNum = (event) => {
    let e = event;
    document.getElementById('phone').classList.add('hide-cursor');
    let value = e.target.value;
    let userPhone = this.getUserPhone(value);
    let caretPos = this.getCaretPosition(value);

    this.props.setPhone(this.getPhone(value));
    this.setState({
      userPhone,
      caretPos,
    });
    userPhone ? e.target.classList.add('filled') : e.target.classList.remove('filled');
    this.setCaretPosition(e, caretPos);
    setTimeout(() => {
      document.getElementById('phone').classList.remove('hide-cursor');
    }, 1500);
  };

  render() {

    return (
        <fieldset className='phone'>
          <legend>Phone</legend>
          <input
              type="text"
              id='phone'
              className=''
              autoComplete='off'
              value={this.props.phone}
              onChange={this.changePhoneNum}
              onClick={this.clickCaretPosition}
              onFocus={this.setCaretPosition}
              onKeyDown={this.keyDownHandler}
          />
        </fieldset>
    );
  }
}

export default Phone;

