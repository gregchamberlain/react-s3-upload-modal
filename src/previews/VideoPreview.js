import React from 'react';

const VideoPreview = ({ file }) => (
  <video autoPlay loop muted style={style}>
    <source src={file.preview} type={file.type} />
    {file.name}
  </video>
);

const style = {
  maxWidth: 150,
  maxHeight: 150
};

export default VideoPreview;