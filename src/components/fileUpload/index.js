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

    if (input.files[0] === undefined) return false;
    if (input.files[0].size > 5242880){
      alert("File is too big!");
      input.value = "";
      return false;
    }

    // check resolution
    let img;
    let _URL = window.URL || window.webkitURL;

    img = new Image();
    img.src = _URL.createObjectURL(input.files[0]);
    if ((input.files[0])) {
      img.onload = () => {
        if (img.width < 70 || img.height < 70) {
          alert("Photo resolution too low!");
          this.props.setPhoto('');
          this.setState({
            fileName: 'Upload your photo',
            imgSrc: '',
          });
          return false;
        }
        this.props.setPhoto(input.files[0]);
        this.setState({
          fileName: input.files[0].name,
          imgSrc: img.src,
        });
      };
    }
  };

  render() {

    return (
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
              accept='.jpg, .jpeg'
          />
          {this.state.imgSrc ? <img id='photo-preview' src={this.state.imgSrc} alt='preview'></img> : null}
          <button>Upload</button>
        </div>
    );
  }
}

export default FileUpload;

