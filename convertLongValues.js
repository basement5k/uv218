const fs = require('fs');
const filePath = './data/predefinedMarkers.ts';

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  const modifiedData = data.replace(/long: "([^"]+)"/g, 'long: $1');

  fs.writeFile(filePath, modifiedData, 'utf8', (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return;
    }
    console.log('File updated successfully.');
  });
});