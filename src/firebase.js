const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert('key.json'),
  databaseURL: 'https://antonybudianto-web.firebaseio.com'
});

const db = admin.database();

function getRef(refName) {
    return new Promise((res, rej) => {
        const ref = db.ref(refName);
        ref.once('value', (data) => res(data.val()));
    });
}

module.exports = {
    getRef
};
