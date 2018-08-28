const {resolve} = require('path');

const resolveFrom = from => (paths) => {
    return resolve(from, paths) 
};

module.exports = {resolveFrom};
