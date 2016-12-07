import React, { Component } from 'react';

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

  render() {
    return (
      <div>
        <button onClick={this.setModal(true)}>Open Modal</button>
        <FileUploader isOpen={this.state.isModalOpen} onRequestClose={this.setModal(false)} getSignedUrls={(a) => {
          console.log(a);
          return new Promise(function(resolve, reject) {
            resolve([]);
          });
        }}/>
      </div>
    );
  }

}
export default Root;
