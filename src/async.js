'use strict';

let fetch = require('node-fetch');

async function getGithubUser(username) {
  let url = `https://api.github.com/users`;

  let response = await fetch(`${url}/${username}`);
 
  return await response.json(); 
}

getGithubUser(`aneurysmjs`).then(({name}) => console.log(name));
