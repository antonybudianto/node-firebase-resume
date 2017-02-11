const moment = require('moment');
const _ = require('lodash');

const SIMPLE_DATE_FORMAT = 'MMMM YYYY';
const SOURCE_DATE_FORMAT = 'YYYY-MM-dd';

function generateDates(data, fields) {
  return _.filter(data, d => d)
    .map(d => {
      fields.map(f => {
        if (d[f]) {
          d[f + '_view'] = moment(d[f], SOURCE_DATE_FORMAT).format(SIMPLE_DATE_FORMAT);
        }
      });
      return d;
    });
}

module.exports = {
    generateDates
};
