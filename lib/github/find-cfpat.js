const paginate = require('./utils/paginate');

module.exports = async function (github, userLogins) {
  const responseItems = (response) => response.data.items;
  return paginate(github, github.search.code, { q: 'CFPAT' }, responseItems, []);
}
