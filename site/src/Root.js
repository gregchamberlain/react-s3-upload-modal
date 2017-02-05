import React, { Component } from 'react';
import axios from 'axios';

import FileUploader from '../../src';

class Root extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
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

  render() {
    return (
      <div>
        <button onClick={this.setModal(true)}>Open Modal</button>
        <FileUploader
          isOpen={this.state.isModalOpen}
          onRequestClose={this.setModal(false)}
          getSignedUrls={this.getSignedUrls}
          onComplete={urls => console.log(urls)}
        />
      </div>
    );
  }

}
export default Root;
