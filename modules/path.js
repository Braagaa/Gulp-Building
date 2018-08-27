const {resolve} = require('path');

const resolveFrom = from => (...paths) => resolve(from, ...paths);

module.exports = {resolveFrom};
