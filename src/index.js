const Twig = require('twig');

const { generatePdf } = require('./pdf');
const { getRef } = require('./firebase');

function generateTemplate(data) {
    return new Promise((resolve, reject) => {
        Twig.renderFile('./template/basic.twig.html', {
            name: 'Antony Budianto',
            awards: data[0],
            workExperiences: data[1],
            profile: data[2],
            educations: data[3]
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
    getRef('profile'),
    getRef('educations')
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
