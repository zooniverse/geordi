var querystring = require("querystring");

function getEventDataFromPost(postData) {
    var parsed = querystring.parse(postData);
    var time = Date.now();
    var user_id = parsed.user_id;
    var subject_id = parsed.subject_id;
    var type = parsed.type;
    var related_id = parsed.related_id;
    return {
        time: time,
        user_id: user_id,
        subject_id: subject_id,
        type: type,
        related_id: related_id
    }
}

exports.getEventDataFromPost = getEventDataFromPost;

function eventChecker(event, parameters) {
    // check event against all parameters (stop as soon as one doesn't match.
    var condition = true;
    for (var p in parameters) {
        if (condition) {
            if (parameters.hasOwnProperty(p)) {
                if (p == "start_date") {
                    condition = condition && (event['time'] >= parameters[p]);
                }
                else if (p == "end_date") {
                    condition = condition && (event['time'] <= parameters[p]);
                }
                else if (["user_id", "type", "id", "subject_id", "related_id"].indexOf(p) > -1) {
                    condition = condition && event[p] == parameters[p];
                }
                else {
                    condition = false;
                    console.log("Warning: Filter was requested for a non-existent field '" + p + "'. Filtering disabled.");
                }
            }
        }
    }
    return condition;
}

exports.eventChecker = eventChecker;
