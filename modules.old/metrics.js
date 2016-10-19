var measured = require('measured');

var collections = {};

module.exports = {
  getCollection: (name) => {
    if (!collections[name]) {
      collections[name] = measured.createCollection();
    }
    return collections[name];
  }
};
