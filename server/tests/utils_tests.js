var utils = require('utils');

module.exports = {
    'Test getEventDataFromPost' : function(test) {
        var parsed = utils.getEventDataFromPost("user_id=A123&subject_id=B456&type=classify&related_id=C789");
        var today = Date.now().setHours(0, 0, 0, 0);
        var dayOfTimeData = parsed.time.setHours(0,0,0,0);
        test.expect(5);
        test.ok(today==dayOfTimeData,"Event time should have been set to today's date.");
        test.ok(parsed.user_id=="A123","User ID not set correctly.");
        test.ok(parsed.subject_id=="B456","Subject ID not set correctly.");
        test.ok(parsed.related_id=="C789","Related ID not set correctly.");
        test.ok(parsed.type=="classify","Event Type not set correctly.");
        test.done();
    }
};

