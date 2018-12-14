// Core
import React, {Component} from 'react';
// Instruments
import './style.scss';

class Phone extends Component {

  state = {
    phone: '+38(___) ___ __ __',
    userPhone: [],
    caretPos: 4,
  };

  setCaretPosition = (e, caretPosition = this.state.caretPos) => {
    let el = e.target;
    if(!this.state.phone) {this.setState({phone: '+38(___) ___ __ __'})}

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

  deleteDigit = (str = this.state.phone, caretPos = this.state.caretPos) => {
    const singularityIndexes = [9, 13, 16];
    if (singularityIndexes.includes(caretPos)) {
      let regexp = /\d/g;

      let lastIndex = 4;
      while (regexp.exec(str) && regexp.lastIndex < caretPos) {
        if (lastIndex < regexp.lastIndex) lastIndex = regexp.lastIndex;
      }
      let arr = str.split('');
      arr.splice(lastIndex -1, 1, '_');

      this.setState({phone: arr.join('')});
    }
  };

  update = (e) => {
    let event = e;
    let el = document.getElementById('phone');
    let value = event.target.value;
    let userPhone = this.getUserPhone(value);
    let caretPos = this.getCaretPosition(value);

    el.classList.add('hide-cursor');
    this.setState({
      phone: this.getPhone(value),
      userPhone,
      caretPos,
    });
    userPhone ? event.target.classList.add('filled') : event.target.classList.remove('filled');
    this.setCaretPosition(event, caretPos);
    setTimeout(() => {
      el.classList.remove('hide-cursor');
    }, 1500);
  };

  validate = () => {
    let phone = this.getUserPhone(this.state.phone);
    let el = document.querySelector('.user-phone');

    if (phone && phone.length === 10) {
      this.props.setPhone(`+38${phone.join('')}`);
      el.classList.remove('alarm');
    } else {
      this.props.setPhone('');
      el.classList.add('alarm');
      if (!phone) {this.setState({phone: ''})}
    }
  };

  render() {
    return (
        <fieldset className='user-phone'>
          <legend>Phone</legend>
          <input
            type="text"
            id='phone'
            className=''
            autoComplete='off'
            value={this.state.phone}
            onChange={this.update}
            onClick={this.clickCaretPosition}
            onFocus={this.setCaretPosition}
            onKeyDown={this.keyDownHandler}
            onBlur={this.validate}
          />
        </fieldset>
    );
  }
}

export default Phone;

