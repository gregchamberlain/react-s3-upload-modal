import React, { Component } from 'react';

class Modal extends Component {

  componentDidMount() {
    window.addEventListener('keydown', this.keyListener);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyListener);
  }

  keyListener = e => {
    if (this.props.isOpen && e.keyCode === 27) {
      this.props.onRequestClose();
    }
  }

  close = e => {
    if (e.target === this.refs.backdrop) {
      this.props.onRequestClose();
    }
  }

  render() {
    if (!this.props.isOpen) return null;

    return (
      <div style={styles.backdrop} onClick={this.close} ref="backdrop">
          {this.props.children}
      </div>
    );
  }
}

const styles = {
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    backgroundColor: 'rgba(0, 0, 0, 0.7)'
  }
}

export default Modal;
