// Core
import React, { Component } from 'react';

// Instruments
import './style.scss'


class Register extends Component {
  // constructor(props) {
  //   super(props);
  //   // this.state = { picture: null };
  //   //this.onDrop = this.onDrop.bind(this);
  // }

  state = {
    name: '',
    email: '',
    phone: '+38(___) ___ __ __',
    userPhone: [],
    phoneCaretPos: 4,
    selectedFile: '',
    fileName: 'Upload your photo',
  };


  fileSelectedHandler = event => {
    let input = event.target;

    if (input.files[0] === undefined) return false;
    if (input.files[0].size > 5242880){
      alert("File is too big!");
      input.value = "";
      return false;
    }

    this.setState({
      selectedFile: input.files[0],
      fileName: input.files[0].name,
    })
  };

  setCaretPosition = (e, caretPosition = this.state.phoneCaretPos) => {
    let el = e.target;

    setTimeout(function() {
      el.setSelectionRange(caretPosition, caretPosition);
    }, 3);
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
    //console.log(e.keyCode);
  };

  deleteDigit = (str = this.state.phone, caretPos = this.state.phoneCaretPos) => {
    const singularityIndexes = [9, 13, 16];
    if (singularityIndexes.includes(caretPos)) {
      let regexp = /\d/g;

      let lastIndex = 4;
      while (regexp.exec(str) && regexp.lastIndex < caretPos) {
        if (lastIndex < regexp.lastIndex) {lastIndex = regexp.lastIndex}
      }
      console.log(lastIndex);
      let arr = str.split('');
      arr.splice(lastIndex -1, 1, '_');
      this.setState({
        phone: arr.join(''),
      });
    }
  };

  changePhoneNum = (event) => {
    let e = event;
    //console.log(e.keyCode);
    let value = e.target.value;
    let userPhone = this.getUserPhone(value);

    // added or deleted number
    //let isAdd = userPhone.length >= this.getUserPhone(this.state.phone);

    let caretPosition = this.getCaretPosition(value);

    this.setState({
      phone: this.getPhone(value),
      userPhone,
      phoneCaretPos: this.getCaretPosition(value),
    });
    this.setCaretPosition(e, caretPosition);
  };

      render() {
        const positions = this.props.positions.map(position => (
            <option>{position.name}</option>
        ));

        return (
            <form className="register-form">
              <div>
                <fieldset>
                  <legend>Name</legend>
                  <input type="text" placeholder='Your name'/>
                </fieldset>
                <fieldset>
                  <legend>Email</legend>
                  <input type="text" placeholder='Your email'/>
                </fieldset>
                <fieldset>
                  <legend>Phone</legend>
                  <input
                      type="text"
                      id='phone'
                      value={this.state.phone}
                      onChange={this.changePhoneNum}
                      onFocus={this.setCaretPosition}
                      onKeyDown={this.keyDownHandler}
                  />
                </fieldset>
              </div>

              <div>
                <select name="position" id="select-position" defaultValue={0}>
                  <option value="0" disabled hidden>Select your position</option>
                  {positions}
                </select>
                <div className='upload-wrapper'>
                  <label
                      htmlFor="file-upload"
                      className="custom-file-upload">
                    {this.state.fileName}
                  </label>
                  <input
                      id='file-upload'
                      type='file'
                      onChange={this.fileSelectedHandler}
                      accept='.png, .jpg, .jpeg'
                  />
                  <button>Upload</button>
                </div>
              </div>
            </form>
        );
    }
}

export default Register;
