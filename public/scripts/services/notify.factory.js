app.factory('NotifyFactory', ['$mdToast', notifyFactory]);

function notifyFactory($mdToast) {

  function info(message) {
    if(typeof message !== 'string') {
      message = makeMessage(message)
    }

    var toast = $mdToast.simple()
      .textContent(message);
    $mdToast.show(toast);
  }

  function warn(message) {
    if(typeof message !== 'string') {
      message = makeMessage(message)
    }

    var toast = $mdToast.simple()
      .textContent(message);
    $mdToast.show(toast);
  }

  function makeMessage(response) {
    switch(response.status) {
      case 200:
      case 204:
        return makeInfoMessage(response);
      case 404:
      case 500:
      default:
        return makeWarnMessage(response);
    }
  }

  function makeInfoMessage(response) {
    var details = getResponseDetails(response);

    return `
      Success! 
      ${details.dataType} 
      ${response.config.data.name} 
      has been 
      ${details.actionType.past}.`;
  }

  function makeWarnMessage(err) {
    var details = getResponseDetails(err);

    return `
      Oops. Could not
      ${details.actionType.present}
      the 
      ${details.dataType}.`;
  }

  function getType(url) {
    return capitalize(url.replace('/', ''));
  }

  function getAction(method) {
    var actions = {
      POST: {
        present: 'add',
        past: 'added'
      },
      PUT: {
        present: 'update',
        past: 'updatd'
      }
    };

    return actions[method];
  }

  function getResponseDetails(response) {
    return {
      dataType: getType(response.config.url),
      actionType: getAction(response.config.method)
    }
  }

  function concatMessage(...parts) {
    return parts.join(" ");
  }

  function capitalize(word) {
    var capitalized = word.split("");
    capitalized[0] = capitalized[0].toUpperCase();
    return capitalized.join("");
  }

  return {
    info: info,
    warn: warn
  }
}
