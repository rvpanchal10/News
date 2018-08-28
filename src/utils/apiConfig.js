const env = process.env.NODE_ENV || 'development';
const apiEnvironment = {
  development: {
    api: 'https://newsapi.org/v2/',
    //api: 'http://web1.anasource.com/Audia_API/api/Audia',
    androidSenderID: '444155481922'
  },
  production: {
    api: 'https://newsapi.org/v2/',
    //api: 'http://web1.anasource.com/Audia_API/api/Audia',
    androidSenderID: '444155481922'
  }
};
module.exports = apiEnvironment[env];
