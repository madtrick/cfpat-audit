const octokit = require('@octokit/rest');
const Bluebird = require('bluebird');

const listOrgUsers = require('./github/list-org-users');
const findCFPATS = require('./github/find-cfpat');

const GITHUB_ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN;

if (!GITHUB_ACCESS_TOKEN) {
  throw new Error('Missing or empty "GITHUB_ACCESS_TOKEN" env variable');
}

const run = Bluebird.coroutine(function * (organizationId) {
  const github = octokit();

  github.authenticate({ type: 'token', token: GITHUB_ACCESS_TOKEN });

  const users = yield listOrgUsers(github, organizationId);
  const userLogins = users.map((user) => user.login);
  // Include the org id in the set of users to check
  userLogins.push(organizationId);
  const allLeaks = yield findCFPATS(github);

  const orgLeaks = allLeaks.filter((leak) => {
    return userLogins.includes(leak.repository.owner.login);
  });

  return orgLeaks.map((leak) => ({
    file: leak.html_url,
    user: leak.repository.owner.login
  }));
})

module.exports = run;

