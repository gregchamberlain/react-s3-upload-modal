import React, { Component, PropTypes } from 'react';
import Dropzone from 'react-dropzone';
import update from 'immutability-helper';
import axios from 'axios';
import UploadIcon from 'react-icons/lib/md/cloud-upload';

import { parseFiles } from './utils';
import ImagePreview from './ImagePreview';
import Modal from './Modal';

class ImageUploader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      files: [],
      progress: [],
      uploading: false
    };
  }

  componentWillReceiveProps(props) {
    if (!this.props.isOpen && props.isOpen) {
      this.setState({ files: [], progress: [], uploading: false });
    }
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    if (acceptedFiles.length) {
      this.setState(update(this.state, {
        files: {
          $push: acceptedFiles
        }
      }));
    }
  }

  removeFile = idx => e => {
    e.stopPropagation();
    this.setState(update(this.state, {
      files: {
        $splice: [[idx, 1]]
      }
    }));
  }

  upload = () => {
    this.setState({ uploading: true });
    const files = parseFiles(this.state.files);
    this.props.getSignedUrls(files).then(signedUrls => {
      let complete = 0;
      let urls = [];
      for (let i=0; i<files.length; i++) {
        const file = files[i];
        const url = signedUrls[i].split('?')[0];
        const options = {
          headers: { 'Content-Type': file.type },
          onUploadProgress: (e) => {
            this.setState(update(this.state, {
              progress: {
                [i]: {
                  $set: e.loaded / e.total * 100
                }
              }
            }));
          }
        };
        axios.put(signedUrls[i], this.state.files[i], options).then(resp => {
          complete += 1;
          urls.push(url);
          this.setState({ uploading: false });
          if (complete === files.length) this.props.onComplete(urls);
        }).catch(err => {
          complete += 1;
          console.error(err);
          this.setState({ uploading: false });
          if (complete === files.length) this.props.onComplete(urls);
        });
      }
    }).catch(err => {
      console.error(err);
      this.setState({ uploading: false });
    });
  }

  requestClose = e => {
    if (this.state.files.length) {
      if (!this.state.progress.length && confirm('Exit without uploading images?')) {
        this.props.onRequestClose(e);
      }
    } else {
      this.props.onRequestClose(e);
    }
  }

  render() {
    const { multiple, accept, isOpen } = this.props;

    return (
      <Modal onRequestClose={this.requestClose} isOpen={isOpen}>
        <div style={styles.container}>
          <Dropzone
            multiple={multiple}
            accept={accept}
            onDrop={this.onDrop}
            style={styles.dropzone}
          >
            {this.state.files.map((file, idx) => (
              <ImagePreview
                key={file.preview}
                src={file.preview}
                progress={this.state.progress[idx]}
                onRemove={this.removeFile(idx)}
              />
            ))}
            { !this.state.files.length && (
              <div style={styles.instructions}>
                <UploadIcon style={styles.icon}/>
                <div>Drop files here</div>
                <div><small>or click to select files</small></div>
              </div>
            ) }
          </Dropzone>
          <span style={styles.divider} />
          <button style={styles.button} onClick={this.upload} disabled={this.state.uploading}>
            { this.state.uploading ? 'Uploading...' : 'Upload' }
          </button>
        </div>
      </Modal>
    );
  }
}

const styles = {
  container: {
    backgroundColor: '#eee',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 2,
    padding: 10,
    width: '50vw',
    height: '75vh',
    color: '#4CAF50',
  },
  dropzone: {
    fontSize: 20,
    flex: 1,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    overflow: 'auto',
    textAlign: 'center'
  },
  icon: {
    fontSize: 64,
    margin: 20,
  },
  divider: {
    width: '90%',
    height: 2,
    margin: '10px 0',
    backgroundColor: '#4CAF50',
  },
  button: {
    margin: 15,
    background: 'transparent',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    cursor: 'pointer',
    color: '#4CAF50',
    border: 'none',
    outline: 'none',
  },
}

ImageUploader.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onComplete: PropTypes.func,
  onRequestClose: PropTypes.func,
  getSignedUrls: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
  accept: PropTypes.string,
};

export default ImageUploader;
