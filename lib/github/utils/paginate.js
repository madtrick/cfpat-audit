const delayer = function (delay) {
  return new Promise(function (resolve) {
    setTimeout(resolve, delay);
  });
}

async function paginate (github, method, args, result) {
  const options = Object.assign({ per_page: 100 }, args);
  let response = await method(options);

  result = result.concat(response.data.items);

  while (github.hasNextPage(response)) {
    try {
      response = await github.getNextPage(response);
    } catch (e) {
      if (e.headers['retry-after']) {
        const delay = Number(e.headers['retry-after']) + 5;
        console.log('RL', delay);

        await delayer(delay);
        continue;
      } else {
        throw e;
      }
    }
    result = result.concat(response.data.items);
  }

  return result;
}

module.exports = paginate;
