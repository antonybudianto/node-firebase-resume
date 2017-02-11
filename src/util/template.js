const Twig = require('twig');

const { generateDates } = require('./date');

function generateTemplate(data) {
  return new Promise((resolve, reject) => {
    const workExperiences = generateDates(data[1], ['startdate', 'enddate']);
    const certifications = generateDates(data[0], ['date']);
    const educations = generateDates(data[3], ['from', 'to']);
    Twig.renderFile('./src/template/basic.twig.html', {
      certifications,
      workExperiences,
      profile: data[2],
      educations
    }, (err, html) => {
      if (err) return reject(err);
      resolve(html);
    });
  });
}

module.exports = {
  generateTemplate
};
