const { getRef } = require('./firebase');
const { generatePdf } = require('./pdf');
const { generateTemplate } = require('./template');

console.log('Retrieving data from Firebase...');
Promise.all([
    getRef('awards'),
    getRef('workExperiences'),
    getRef('profile'),
    getRef('educations')
])
.then(data => {
    console.log('Generating template...');
    return generateTemplate(data);
})
.then((html) => {
    console.log('Generating PDF...');
    return generatePdf(html);
})
.then((res) => {
    console.log('Done!');
    process.exit(0);
});
