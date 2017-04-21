import React, { Component } from 'react';
import axios from 'axios';

import FileUploader from '../../src';

class Root extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      images: []
    }
  }

  setModal = bool => e => {
    this.setState({ isModalOpen: bool })
  }

  getSignedUrls = files => {
    if (process.env.NODE_ENV === 'production') {
      return new Promise((resolve, reject) => {
        resolve([]);
      });
    } else {
      return axios.post('/sign', { files }).then(resp => {
        return resp.data;
      }).catch(err => console.log(err));
    }
  }

  onComplete = images => {
    console.log(images);
    this.setState({
      isModalOpen: false,
      images
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.setModal(true)}>Open Modal</button>
        <FileUploader
          isOpen={this.state.isModalOpen}
          onRequestClose={this.setModal(false)}
          getSignedUrls={this.getSignedUrls}
          onComplete={this.onComplete}
        />
        <div style={styles.images}>
          {this.state.images.map(image => (
            <div key={image.url} style={styles.preview}>
              <img src={image.url} style={styles.image}/>
            </div>
          ))}
        </div>
      </div>
    );
  }

}

const styles = {
  images: {
    display: 'flex'
  },
  preview: {
    position: 'relative',
    height: 150,
    width: 150,
    margin: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    maxWidth: 150,
    maxHeight: 150
  },
}
export default Root;
