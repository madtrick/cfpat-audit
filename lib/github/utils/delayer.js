const delayer = function (delay) {
  return new Promise(function (resolve) {
    setTimeout(resolve, delay);
  });
}

module.exports = delayer;
