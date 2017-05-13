import React from 'react';
import ImagePreview from './ImagePreview';
import VideoPreview from './VideoPreview';

const FilePreview = ({ file }) => {
  let Preview = DefaultPreview;
  switch (file.type.split('/')[0]) {
    case 'image':
      Preview = ImagePreview;
      break;
    case 'video':
      Preview = VideoPreview;
      break;
  }
  return <Preview file={file} />
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
  fontWeight: 'bold',
  color: '#eee'
};

export default FilePreview;