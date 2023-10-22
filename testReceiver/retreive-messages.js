const http = require('http');

const options = {
    hostname: 'localhost',
    port: 8080,        
    path: '/get-messages',
    method: 'GET',
};

const req = http.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        const messages = JSON.parse(data);
        console.log('Stored Messages:');
        console.log(messages);
    });
});

req.end();