'use strict';

const Bluebird = require('bluebird');

const findOrganizationCPATS = require('./lib/find-organization-cpats');
const storeAuditLog = require('./lib/aws/store-audit-log');

module.exports.run = (event, context, callback) => {
  const organization = process.env.GITHUB_ORGANIZATION_ID;

  Bluebird.coroutine(function * () {
    try {
      const tokens = yield findOrganizationCPATS(organizationId);
      yield storeAuditLog(JSON.stringify(tokens));

      callback(null);
    } catch (e) {
      callback(e);
    }
  })();
};
