exports.handler = function(event, context, callback) {
    // CORS (Cross-Origin Resource Sharing) Solution (Test Cloud Function from Localhost) - BEGIN
    // If you'd like to learn more about the topic of CORS I always recommend the Mozilla Developer Network (https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
    // The actual solution to this issue is to use Netlify Dev. If you're interested in the Netlify platform it's definitely worth looking into.
    const headers = {
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Headers" : "Content-Type"
    }
    
    if (event.httpMethod !== "POST") {
        return callback(null, {
            statusCode: 200,
            headers,
            body: "This was not a POST request"
        });
    }
    // CORS Solution (Test Cloud Function from Localhost) - END


    const secretContent = `
    <h3>Welcome To The Secret Area</h3>
    <p>Here we can tell you that the sky is <strong>blue</strong>, and two plus two equals four.</p>
    `;

    let body;

    if (event.body) { // If Text sent by user Exists
        body = JSON.parse(event.body);
    } else {
        body = {};
    }
    
    // Obviously, in the real world, the GitHub would be PRIVATE.
    if (body.password == "javascript") {
        callback(null, {
            statusCode: 200,
            headers,
            body: secretContent
        });
    } else {
        callback(null, {
            statusCode: 401, // Unauthorized
            headers
        });
    }
}