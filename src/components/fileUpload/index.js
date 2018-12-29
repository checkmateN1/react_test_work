// Core
import React, { Component } from 'react';

// Instruments
import './style.scss';


class FileUpload extends Component {

  state = {
    fileName: 'Upload your photo',
    imgSrc: '',
  };

  fileSelectedHandler = event => {
    // check size
    let input = event.target;
    let el = document.getElementById('upload-label');

    // console.log(input.files[0]);
    // console.log('test small');
    //check max size
    if (input.files[0] === undefined) return false;
    if (input.files[0].size > 5242880){
      alert("File is too big!");
      input.value = '';
      el.classList.add('alarm');
      this.setState({
        fileName: '',
        imgSrc: '',
      });
      return false;
    }

    // check min size
    let img;
    let _URL = window.URL || window.webkitURL;

    img = new Image();
    img.src = _URL.createObjectURL(input.files[0]);
    if ((input.files[0])) {
      img.onload = () => {
        if (img.width < 70 || img.height < 70 || input.files[0].size < 2048) {
          alert("File is too small!");
          input.value = '';
          this.props.setPhoto('');
          el.classList.add('alarm');
          this.setState({
            fileName: '',
            imgSrc: '',
          });
          return false;
        }
        this.props.setPhoto(input.files[0]);
        this.setState({
          fileName: input.files[0].name,
          imgSrc: img.src,
        });
        el.classList.remove('alarm');
      };
    }
  };

  render() {

    return (
        <div className='upload-wrapper'>
          <label
              id='upload-label'
              htmlFor='file-upload'
              className='custom-file-upload'>
            {this.state.fileName}
          </label>
          <input
              id='file-upload'
              type='file'
              onChange={this.fileSelectedHandler}
              accept='.jpg, .jpeg'
          />
          {this.state.imgSrc ? <img id='photo-preview' src={this.state.imgSrc} alt='avatar preview'></img> : null}
          <button>Upload</button>
        </div>
    );
  }
}

export default FileUpload;

