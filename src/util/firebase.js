const admin = require('firebase-admin');

const initialConfig = {
  credential: admin.credential.cert('key.json'),
  databaseURL: 'https://antonybudianto-web.firebaseio.com'
};

function FirebaseUtil() {
  this.db = null;

  this.initApp = (config = initialConfig) => {
    admin.initializeApp(config);
    this.db = admin.database();
  }

  this.getRef = (refName) => {
    return new Promise((res, rej) => {
      const ref = this.db.ref(refName);
      ref.once('value', (data) => res(data.val()));
    });
  }
}

module.exports = new FirebaseUtil();
