const { initApp, getRef } = require('./util/firebase');
const { generatePdf } = require('./util/pdf');
const { generateTemplate } = require('./util/template');
const { generateDates } = require('./util/date');

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
    const mappedData = {
      certifications: data[0],
      workExperiences: data[1],
      profile: data[2],
      educations: data[3],
    };
    mappedData.workExperiences = generateDates(
        mappedData.workExperiences, ['startdate', 'enddate']);
    mappedData.certifications = generateDates(mappedData.certifications, ['date']);
    mappedData.educations = generateDates(mappedData.educations, ['from', 'to']);
    return generateTemplate(mappedData);
})
.then((html) => {
    console.log('Generating PDF...');
    return generatePdf(html);
})
.then((res) => {
    console.log('Done!');
    process.exit(0);
});
