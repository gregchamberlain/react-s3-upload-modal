import React from 'react';
import Close from 'react-icons/lib/md/close';
import Check from 'react-icons/lib/md/check';

const ImagePreview = ({ src, onRemove, progress }) => (
  <div style={styles.preview}>
      { !progress && (
        <div style={styles.remove} onClick={onRemove}>
          <Close />
        </div>
      )}
      <img src={src} style={styles.image} />
      { progress && (
        <div style={styles.previewOverlay}>
          { progress === 100 ? (
            <Check />
          ) : (
            <div style={styles.progressContainer}>
              <div style={styles.progressBar(progress)}/>
            </div>
          )}
        </div>
      )}
  </div>
);

const styles = {
  preview: {
    position: 'relative',
    height: 150,
    width: 150,
    margin: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccc',
  },
  overlay: {
    borderRadius: 5,
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  image: {
    maxWidth: 150,
    maxHeight: 150
  },
  remove: {
    position: 'absolute',
    top: -10,
    right: -10,
    width: 20,
    height: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: 14,
    color: '#eee',
    backgroundColor: '#F44336',
    borderRadius: '50%',
  },
  progressContainer: {
    width: '90%',
    height: 30,
    borderRadius: 15,
    border: '2px solid #4CAF50',
    padding: 3,
    boxSizing: 'border-box',
  },
  progressBar: pctDone => ({
    height: 20,
    borderRadius: 10,
    minWidth: 20,
    backgroundColor: '#4CAF50',
  })
}

export default ImagePreview;
