function start() {
2 console.log("Request handler 'start' was called."); 3}
4
5 function upload() {
6 console.log("Request handler 'upload' was called."); 7}
8
9 exports.start = start;
10exports.upload = upload;