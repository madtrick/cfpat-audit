'use strict';

const findOrganizationCPATS = require('./lib/find-organization-cpats');

module.exports.run = (event, context, callback) => {
  findOrganizationCPATS().catch(callback).then(callback);
};
