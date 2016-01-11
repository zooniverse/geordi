var SESSION_EXPIRATION_TIME_MINS = 30;

module.exports = function(Event) {
  // model operation hook
  Event.observe('before save', function(ctx, next) {
    if (ctx.instance) {
      //ctx.instance.clientIP = (require("domain")).active.members[1].req.ip;
      loopback = require('loopback');
      req = loopback.getCurrentContext().active.http.req
      ctx.instance.clientIP = req.ip;
      ctx.instance.serverURL = req.headers.origin;

      // calculate the new user sequence value based on previous event (or lack of)
      getUserSeqToUse = function(prevEvent) {
        if (prevEvent) {
          return parseInt(prevEvent.userSeq)+1;
        }
        else {
          return 1; // first event for this user
        }
      };

      getSessionNumberAndEventNumberToUse = function(prevEvent) {
        if (prevEvent) {
          expirationTimeFromLastEvent = new Date(prevEvent.time.getTime() + (SESSION_EXPIRATION_TIME_MINS * 60000));
          now = new Date();
          if (now<expirationTimeFromLastEvent) {
            // continue previous session
            return {
              sessionNumber: prevEvent.sessionNumber,
              eventNumber: parseInt(prevEvent.eventNumber) + 1
            }
          }
          else {
            // new session
            return {
                sessionNumber: parseInt(prevEvent.sessionNumber) + 1,
                eventNumber: 1
            }
          }
        }
        else {
          // first session for this user
          return {
            sessionNumber: 1,
            eventNumber: 1
          };
        }
      };

      /*
      Event.findOne({where: {userID: ctx.instance.userID}, order: 'id DESC'}).then(
          function(prevEvent) {
            ctx.instance.userSeq = getUserSeqToUse(prevEvent);
            counters = getSessionNumberAndEventNumberToUse(prevEvent);
            ctx.instance.sessionNumber = counters.sessionNumber;
            ctx.instance.eventNumber = counters.eventNumber;
            next();
          }
      ).catch(function(err){
          ctx.instance.userSeq = getUserSeqToUse(null);
          counters = getSessionNumberAndEventNumberToUse(null);
          ctx.instance.sessionNumber = counters.sessionNumber;
          ctx.instance.eventNumber = counters.eventNumber;
          next();
      });
      */
      ctx.instance.userSeq = -1;
      ctx.instance.sessionNumber = -1;
      ctx.instance.eventNumber = -1;
      next();
    }
  });
};
