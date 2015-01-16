var querystring = require("querystring");

function getEventDataFromPost(postData) {
    var parsed = querystring.parse(postData);
    var time = Date.now();
    var user_id = parsed.user_id;
    var subject_id = parsed.subject_id;
    var type = parsed.type;
    var related_id = parsed.related_id;
    return {
        time:time,
        user_id:user_id,
        subject_id:subject_id,
        type:type,
        related_id:related_id
    }
}