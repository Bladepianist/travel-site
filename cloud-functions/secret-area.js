exports.handler = function(events, context, callback) {
    callback(null, {
        statusCode: 200,
        body: "Welcome to the super secret area"
    });
}