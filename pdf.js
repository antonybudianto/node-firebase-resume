const pdf = require('html-pdf');

const options = { format: 'A4' };

function generatePdf(content) {
    return new Promise((resolve, reject) => {
        pdf.create(content, options)
        .toFile('./dist/cv.pdf', function(err, res) {
            if (err) return reject(err);
            resolve(res);
        });
    })

}

module.exports = {
    generatePdf: generatePdf
};
