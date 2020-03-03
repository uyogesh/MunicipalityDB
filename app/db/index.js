const { MongoClient } = require('mongodb');

export const url = 'mongodb://localhost:27017';
export default (callback) => {
  // Connection URL
  // const url = 'mongodb://localhost:27017';
  MongoClient.connect(url, callback);
};

