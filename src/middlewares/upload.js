const multer = require('multer');

const API_URL = 'https://palenske-cookmaster.herokuapp.com';

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, `${__dirname}/../uploads`);
  },
  filename: (req, _file, callback) => {
    const { id } = req.params;

    req.filePath = `${API_URL}/images/${id}.jpeg`;

    callback(null, `${id}.jpeg`);
  },
});

module.exports = multer({ storage }).single('image');
