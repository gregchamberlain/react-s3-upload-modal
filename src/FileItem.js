import React from 'react';
import Close from 'react-icons/lib/md/close';
import Check from 'react-icons/lib/md/check';
import FilePreview from './previews/FilePreview';

const FileItem = ({ file, onRemove, progress }) => (
  <div style={styles.preview}>
      { !progress && (
        <div style={styles.remove} onClick={onRemove}>
          <Close />
        </div>
      )}
      <FilePreview file={file} />
      { progress && (
        <div style={styles.overlay}>
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
    fontSize: 48,
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
  progressBar: progress => ({
    height: 20,
    borderRadius: 10,
    minWidth: 20,
    width: `${progress}%`,
    backgroundColor: '#4CAF50',
    transition: 'width ease-in 0.2s'
  })
}

export default FileItem;
