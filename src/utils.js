const generateRandomName = () => Math.random().toString(36).substr(2, 20);

export const parseFiles = files => files.map(file => {
  const name = `${generateRandomName()}.${file.name.split('.').splice(-1)[0]}`;
  return { name, type: file.type };
});
