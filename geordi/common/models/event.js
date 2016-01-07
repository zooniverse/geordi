module.exports = function(Event) {
  // model operation hook
  Event.observe('before save', function(ctx, next) {
    if (ctx.instance) {
      //ctx.instance.clientIP = (require("domain")).active.members[1].req.ip;
      loopback = require('loopback');
      req = loopback.getCurrentContext().active.http.req
      ctx.instance.clientIP = req.ip;
      ctx.instance.serverURL = req.headers.origin;
    }
    next();
  });
};
