import React from 'react';

const ImagePreview = ({ file }) => (
  <img src={file.preview} alt={file.name} style={style}/>
);

const style = {
  maxWidth: 150,
  maxHeight: 150
};

export default ImagePreview;