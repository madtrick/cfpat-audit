const octokit = require('@octokit/rest');

const listOrgUsers = require('./lib/github/list-org-users');
const findCFPATS = require('./lib/github/find-cfpat');

const GITHUB_ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN;

if (!GITHUB_ACCESS_TOKEN) {
  throw new Error('Missing or empty "GITHUB_ACCESS_TOKEN" env variable');
}

async function run () {
  const github = octokit();

  github.authenticate({ type: 'token', token: GITHUB_ACCESS_TOKEN });

  const users = await listOrgUsers(github, 'contentful');
  const userLogins = users.map((user) => user.login);
  const allLeaks = await findCFPATS(github);

  const orgLeaks = allLeaks.filter((leak) => {
    return userLogins.includes(leak.repository.owner.login);
  });

  orgLeaks.forEach((leak) => {
    console.log(leak.html_url, leak.repository.owner.login);
  });
}

run();
