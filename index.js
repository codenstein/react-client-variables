const PREFIX = "REACT_APP_";

module.exports = (function () {
  // merge the process.env variables with the $$client-variables
  return Object.assign(
    // remove prefixed environment variables
    Object.entries(process.env).reduce((clientVariables, [key, value]) => {
      if (key.startsWith(PREFIX)) {
        clientVariables[key.substr(PREFIX.length).toUpperCase()] = value;
      }
      return clientVariables;
    }, {}),
    typeof window !== "undefined" ? window["$$client-variables"] : {}
  );
})();
