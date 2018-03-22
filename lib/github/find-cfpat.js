const paginate = require('./utils/paginate');

module.exports = function (github, userLogins) {
  const responseItems = (response) => response.data.items;
  return paginate(github, github.search.code, { q: 'CFPAT' }, responseItems, []);
}
