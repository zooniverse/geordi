var utils = require('../utils');

module.exports = {
    'Test getEventDataFromPost' : function(test) {
        var parsed = utils.getEventDataFromPost("user_id=A123&subject_id=B456&type=classify&related_id=C789");
        test.expect(5);
        test.ok(Date.now()-parseInt(parsed.time)<1000,"Event time should have been set to within 1 second of now.");
        test.ok(parsed.user_id=="A123","User ID not set correctly.");
        test.ok(parsed.subject_id=="B456","Subject ID not set correctly.");
        test.ok(parsed.related_id=="C789","Related ID not set correctly.");
        test.ok(parsed.type=="classify","Event Type not set correctly.");
        test.done();
    }
};

