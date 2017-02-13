const Twig = require('twig');

function generateTemplate(data) {
  return new Promise((resolve, reject) => {
    Twig.renderFile('./src/template/basic.twig.html', data, (err, html) => {
      if (err) return reject(err);
      resolve(html);
    });
  });
}

module.exports = {
  generateTemplate
};
