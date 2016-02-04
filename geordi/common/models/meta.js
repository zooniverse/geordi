module.exports = function(Meta) {
  Meta.version = function(callback) {
    var pjson = require('../../package.json');
    response = "Geordi server v"+pjson.version;
    callback(null, response);
  };
  Meta.remoteMethod(
    'version',
    {
      http: {path: '/version', verb: 'get'},
      returns: {arg: 'version', type: 'string'}
    }
  );
};
