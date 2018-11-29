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
    phone: '',
    positions: [],
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

      render() {
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
                  <input type="text" placeholder='+38(___) ___ __ __'/>
                </fieldset>
              </div>

              <div>
                <select name="position" id="select-position" defaultValue={0}>
                  <option value="0" disabled hidden>Select your position</option>
                  <option value="1">test1</option>
                  <option value="2">test2</option>
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
