const querystring = require('querystring');

const requestHandler = (req, res) => {
    const { url, method } = req;

    if (url === '/') {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.write('<html>');
        res.write('<head>');
        res.write('<meta charset="UTF-8">');
        res.write('<title>Home Page - User Server</title>');
        res.write('</head>');
        res.write('<body>');
        res.write('<h1>Welcome to the User Server</h1>');
        res.write('<form action="/create-user" method="POST">');
        res.write('<input type="text" name="username" placeholder="Type a new user name"/>');
        res.write('<button type="submit">Add user name to the list</button>');
        res.write('</form>');
        res.write('</body>');
        res.write('</html>');
        return res.end()
    }

    if (url === '/users') { 
        res.write('<html>');

        res.write('<head><title>Users Page - User Server</title></head>');
        res.write('<ul>');
        res.write('<li>User 1</li>');
        res.write('<li>User 2</li>');
        res.write('<li>User 3</li>');
        res.write('</ul>');
        res.write('</html>');
        res.end();
    }

    if (url === '/create-user' && method === 'POST') {
        const body = [];

        req.on('data', (chunk) => {
            body.push(chunk);
        })

        return req.on('end', () => {
            const rawBody = Buffer.concat(body).toString();
            const parsedBody = querystring.parse(rawBody);
            const newUsername = parsedBody.username;
            console.log('New User name: ', newUsername);
            res.statusCode = 302;
            res.setHeader('Location', '/');
            res.end();
        })
    }

    res.statusCode = 404;
    res.write('<html>');
    res.write('<head><title>404</title></head>');
    res.write('<body><h1>Page Not Found</h1></body>');
    res.write('</html>');
    return res.end();
}

exports.handler = requestHandler