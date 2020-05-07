exports.handler = function(events, context, callback) {
    const secretContent = `
    <h3>Welcome To The Secret Area</h3>
    <p>Here we can tell you that the sky is <strong>blue</strong>, and two plus two equals four.</p>
    `;

    let body;

    if (events.body) { // If Text sent by user Exists
        body = JSON.parse(events.body);
    } else {
        body = {};
    }
    
    // Obviously, in the real world, the GitHub would be PRIVATE.
    if (body.password == "javascript") {
        callback(null, {
            statusCode: 200,
            body: secretContent
        });
    } else {
        callback(null, {
            statusCode: 401 // Unauthorized
        });
    }
}