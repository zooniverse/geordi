module.exports = function(Event) {
  // model operation hook
  Event.observe('before save', function(ctx, next) {
    if (ctx.instance) {
      //ctx.instance.clientIP = (require("domain")).active.members[1].req.ip;
      ctx.instance.clientIP = (require('loopback')).getCurrentContext().active.http.req.ip;
    }
    next();
  });
};
