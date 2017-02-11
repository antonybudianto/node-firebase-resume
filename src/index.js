const { initApp, getRef } = require('./util/firebase');
const { generatePdf } = require('./util/pdf');
const { generateTemplate } = require('./util/template');

console.log('Retrieving data from Firebase...');
initApp();
Promise.all([
    getRef('certifications'),
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
