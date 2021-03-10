# React Client Variables Plugin

> A [Create-React-App](https://create-react-app.dev) library to allow server-side runtime environment variables to be made available to client-side scripts.

By default, Create-react-app only makes system environment variables [prefixed with `REACT_APP_`](https://create-react-app.dev/docs/adding-custom-environment-variables/#referencing-environment-variables-in-the-html) available to client scripts. Using this library, you can make server-side runtime environment variables, prefixed with `REACT_APP_`, available within the browser i.e., env variables passed to docker container.

## Install

```
npm install react-client-variables
```

## How to use

In `package.json`:

```json
{
  "scripts": {
    "build": "react-scripts build && react-client-variables",
  }
}
```

Client-side:

```js
import variables from "react-client-variables";
```

```js
import { API_URL } from "react-client-variables";
```

Server-side:

```js
const initClientVariables = require("react-client-variables/server");

async function main() {
  const buildDir = path.resolve("build");

  await initClientVariables({ buildDir });

  app.use(express.static(buildDir));
  app.get("/", function (req, res) {
    res.sendFile(path.join(buildDir, "index.html"));
  });

  app.listen(3000, function () {
    console.log("App started on port 3000");
  });
}

main();
```
