# async-await - Async Functions (funciones asíncronas)

Un repo para jugar y aprender acerca de esta gran funcionalidad de ES2017.

## Instalación e instrucciones

* como vos vas hacer uso del API _fetch_, instalamos **node-fetch**

```
npm install --save-dev node-fetch
```

Luego tenés que _transpilar_ el código así podés ejecutar programas 
tanto en [node.js](https://nodejs.org/en/) como en el explorador, para ello 
vos vas a usar [babel](https://babeljs.io/)

* instalás babel-cli de manera global.

```
npm install --global babel-cli
```

* para poder hacer uso de _async/await_ instalás **babel-plugin-transform-regenerator** 

```
npm install --save-dev babel-plugin-transform-regenerator
```

* también vos vas a hacer uso de _arrow-functions_

```
npm install --save-dev babel-plugin-transform-es2015-arrow-functions
```

* luego en el archivo **.babelrc** (recomendado)

```
{
    "plugins": ["transform-async-to-generator", "transform-es2015-arrow-functions"]
}
```

* para `transpilar` el código ejecutás

```
babel src/async.js -o dist/async-transpiled.js
```

* luego corrés el programa, en este caso en node.js

```
node dist/async-transpiled.js
```


### _Promesas_

"Una **Promesa** es el resultado _eventual_ de una operación asíncrona"

La base de **async/await** son las Promesas. Por eso entenderlas es crucial.

Entonces aquí tenés una función basada en **Promesas** haciedo uso del API `fetch`
que hace una petición al AJAX a Github.

```javascript
'use strict';

let fetch = require('node-fetch');

function getGithubUser(username) {
  let url = `https://api.github.com/users`;

  return fetch(`${url}/${username}`)
    // Una vez llega la respuesta, se 'parsea' el `body` como JSON
    .then(res => res.json())
    // Aplicás `destructuring` para extraer la propiedad `name`
    .then(({name}) => name);
}
```
Llamás la función lo cual retorna una **Promesa** y la resolvés al ejecutar su método _then()_.

```javascript
getGithubUser(`aneurysmjs`).then(user => console.log(user));
```

### Cómo podés convertir una función asíncrona basada en **Promesas** en una función asíncrona con _async/await_

```javascript
// Primero convertís la función asíncrona usando la palabra clave `async`
async function getGithubUser(username) {
  let url = `https://api.github.com/users`;
  // Luego usás el operador `await` que espera a que se complete la petición de `fetch`
  let response = await fetch(`${url}/${username}`);
  /** 
    * luego tomás el `body` de la respuesta y lo 'parseás' como .json
    *
    * el método .json() también retorna una Promesa lo cual podés user el
    * operator `await` otra vez y esperar hasta que la Promesa se cumpla.
    **/
  let user = await response.json(); 

  return user;
}
```
el operador **_await_** toma una **Promesa** y luego _suspende_ la ejecución de la función hasta que la **Promesa** 
se cumpla ó se _resuelva_(**_resolved_**) y luego hace 2 cosas, sí la **Promesa** es _rechazada_(**_rejected_**) la expresión **_await_** arroja (**_Throw_**) el valor rechazado 
y sí la **Promesa** es _resuelta_, retorna el valor resuelto que luego vos podés almacenar en una variable.

cuando se invoca una función asíncrona, esta retorna una **Promesa**. cuando retorna un valor, la **Promesa** va a ser _resuelta_(**_resolved_**) con ese valor,
en este caso, el nombre de usuario de Github.

```javascript
getGithubUser(`aneurysmjs`).then(user => console.log(user.name));
```

Todavía hay una cosa que podés hacerle a la función _getGithubUser_, como no le estás haciendo nada a **_user_**

```javascript
let user = await response.json(); 
```

simplemente retornás la expresión 

```javascript
return await response.json(); 
```

y sí le _destructurás_ la propiedad _name_ de **_user_** 

```javascript
getGithubUser(`aneurysmjs`).then(({name}) => console.log(name));
```

```javascript
async function getGithubUser(username) {
  let url = `https://api.github.com/users`;

  let response = await fetch(`${url}/${username}`);
 
  return await response.json(); 
}

getGithubUser(`aneurysmjs`).then(({name}) => console.log(name));
```