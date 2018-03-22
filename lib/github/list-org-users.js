const paginate = require('./utils/paginate');

module.exports = function (github, org) {
  const responseItems = (response) => response.data;
  return paginate(github, github.orgs.getMembers, { org }, responseItems, []);
}
