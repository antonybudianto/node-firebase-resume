const admin = require('firebase-admin');
const Twig = require('twig');

const { generatePdf } = require('./pdf');

admin.initializeApp({
  credential: admin.credential.cert('./key.json'),
  databaseURL: 'https://antonybudianto-web.firebaseio.com'
});

const db = admin.database();

function getRef(refName) {
    return new Promise((res, rej) => {
        const ref = db.ref(refName);
        ref.once('value', (data) => res(data.val()));
    });
}

function generateTemplate(data) {
    return new Promise((resolve, reject) => {
        Twig.renderFile('./template/basic.twig.html', {
            name: 'Antony Budianto',
            awards: data[0],
            workExperiences: data[1],
            projects: data[2]
        }, (err, html) => {
            if (err) return reject(err);
            resolve(html);
        });
    });
}

console.log('Retrieving data from Firebase...');
Promise.all([
    getRef('awards'),
    getRef('workExperiences'),
    getRef('projects')
])
.then(res => {
    console.log('Generating template...');
    return generateTemplate(res);
})
.then((html) => {
    console.log('Generating PDF...');
    return generatePdf(html);
})
.then((res) => {
    console.log('Done!');
    process.exit(0);
});
