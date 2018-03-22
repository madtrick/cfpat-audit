const paginate = require('./utils/paginate');

module.exports = async function (github, org) {
  return paginate(github, github.orgs.getMembers, { org }, []);
}
