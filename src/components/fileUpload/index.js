// Core
import React, { Component } from 'react';

// Instruments
import './style.scss';


class FileUpload extends Component {

  state = {
    selectedFile: '',
    fileName: 'Upload your photo',
    imgSrc: '',
  };

  fileSelectedHandler = event => {
    let input = event.target;

    if (input.files[0] === undefined) return false;
    if (input.files[0].size > 5242880){
      alert("File is too big!");
      input.value = "";
      return false
    }

    let img;
    let _URL = window.URL || window.webkitURL;
    img = new Image();
    img.src = _URL.createObjectURL(input.files[0]);
    if ((input.files[0])) {
      img.onload = () => {
        if (img.width < 70 || img.height < 70) {
          alert("Photo resolution too low!");
          this.setState({
            selectedFile: '',
            fileName: 'Upload your photo',
            imgSrc: '',
          });
          return false
        }
        //this.photoPreview();
        this.setState({
          selectedFile: input.files[0],
          fileName: input.files[0].name,
          imgSrc: img.src,
        });
      };
    }
  };

  // photoPreview = () => {
  //   let preview = document.getElementById('photo-preview');
  //   preview.style.backgroundImage = `url('${this.state.imgSrc}')`
  // };


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
          {this.state.imgSrc ? (<img id='photo-preview' src={this.state.imgSrc}></img>) : null}
          <button>Upload</button>
        </div>
    );
  }
}

export default FileUpload;

