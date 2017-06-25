'use strict';

let getGithubUser = function () {
  var _ref = _asyncToGenerator(function* (username) {
    let url = `https://api.github.com/users`;

    let response = yield fetch(`${url}/${username}`);

    return yield response.json();
  });

  return function getGithubUser(_x) {
    return _ref.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

let fetch = require('node-fetch');

getGithubUser(`aneurysmjs`).then(function ({ name }) {
  return console.log(name);
});
