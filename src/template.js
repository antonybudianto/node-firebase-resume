const Twig = require('twig');

function generateTemplate(data) {
  return new Promise((resolve, reject) => {
    Twig.renderFile('./template/basic.twig.html', {
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

module.exports = {
  generateTemplate
};
