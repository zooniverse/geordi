var querystring = require("querystring"), fs = require("fs"),
    formidable = require("formidable");
var Datastore = require("nedb"), db = new Datastore({ filename: './db/logdb', autoload: true });

function start(response) {
    console.log("Request handler 'start' was called.");
    var body = '<html>' +
        '<head>' +
        '<meta http-equiv="Content-Type" ' + 'content="text/html; charset=UTF-8" />' +
        '</head>' +
        '<body>' +
        '<form action="/upload" enctype="multipart/form-data" ' + 'method="post">' +
        '<input type="file" name="upload" multiple="multiple">' + '<input type="submit" value="Upload file" />' +
        '</form>' +
        '</body>' +
        '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function what(response, request) {
    console.log("Request handler 'what' was called.");

    var body = '<html>' +
        '<head>' +
        '<meta http-equiv="Content-Type" content="text/html; ' +
        'charset=UTF-8" />' +
        '</head>' +
        '<body>' +
        '<form action="/log" method="post">' +
        '<textarea name="text" rows="20" cols="60"></textarea>' +
        '<input type="submit" value="Log this" />' +
        '</form>' +
        '</body>' +
        '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function log(response, postData) {
    console.log("Request handler 'log' was called.");
    response.writeHead(200, {"Content-Type": "text/plain"});
    var logText = querystring.parse(postData).text;
    response.write("Logged: "+logText);
    var logEntry = { time: Date.now(),text:logText };
    db.insert(logEntry, function (err,newDoc) {
        console.log('error ('+err+'}, failed to log doc with ID '+newDoc._id+' and text '+newDoc.text);
    });
    response.end();
}

function list(response, request) {
    console.log("Request handler 'list' was called.");
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("<table border="1" cellpadding="5" cellspacing="5"><th><td>ID</td><td>Time</td><td>Text</td></th>\n");
    db.find({}, function (err, docs) {
        for (var doc in docs) {
            response.write("<tr><td>"+doc._id+"</td><td>"+doc.time+"</td><td>"+doc.text+"</td></tr>\n");
        }
    });
    response.write("</table>\n");
    response.end();
}

function upload(response, request) {
    console.log("Request handler 'upload' was called.");

    var form = new formidable.IncomingForm();
    console.log("about to parse");
    form.parse(request, function (error, fields, files) {
        console.log("parsing done");

        /* Possible error on Windows systems:
         tried to rename to an already existing file */
        fs.rename(files.upload.path, "/tmp/test.png", function (error) {
            if (error) {
                fs.unlink("/tmp/test.png");
                fs.rename(files.upload.path, "/tmp/test.png");
            }
        });
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("received image:<br/>");
        response.write("<img src='/show' />");
        response.end();
    });
}

function show(response) {
    console.log("Request handler 'show' was called.");
    response.writeHead(200, {"Content-Type": "image/png"});
    fs.createReadStream("/tmp/test.png").pipe(response);
}

exports.start = start;
exports.upload = upload;
exports.show = show;
exports.what = what;
exports.log = log;
exports.list = list;
