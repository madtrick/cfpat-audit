const paginate = require('./utils/paginate');

module.exports = async function (github) {
  return paginate(github, github.search.code, { q: 'CFPAT' }, []);
}
