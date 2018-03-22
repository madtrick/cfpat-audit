const Bluebird = require('bluebird');
const delayer = require('./delayer');

const paginate =  Bluebird.coroutine(function * (github, method, args, responseItems, result) {
  const options = Object.assign({ per_page: 100 }, args);
  let response = yield method(options);

  result = result.concat(responseItems(response));

  while (github.hasNextPage(response)) {
    try {
      response = yield github.getNextPage(response);
    } catch (e) {
      if (e.headers['retry-after']) {
        const delay = Number(e.headers['retry-after']) + 5;

        yield delayer(delay);
        continue;
      } else {
        throw e;
      }
    }
    result = result.concat(response.data.items);
  }

  return result;
});

module.exports = paginate;
