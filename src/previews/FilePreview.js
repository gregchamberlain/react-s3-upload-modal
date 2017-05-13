import React from 'react';
import ImagePreview from './ImagePreview';
import VideoPreview from './VideoPreview';

const FilePreview = ({ file }) => {
  switch (file.type.split('/')[0]) {
    case 'image':
      return <ImagePreview file={file} />
    case 'video':
      return <VideoPreview file={file} />
    default: 
      return <DefaultPreview file={file} />
  }
};

const DefaultPreview = ({ file }) => (
  <div style={style}>
    {file.name}
  </div>
);

const style = {
  display: 'flex',
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
};

export default FilePreview;