const http = require('http');
const url = require('url');
const qs = require('querystring');
const multer = require('multer');
const cors = require('cors');

const data = []; 


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

    if (req.method === 'POST') {
        upload.any()(req, res, function (err) {
            if (err) {
                return res.status(400).send('Error parsing form data.');
            }

            const name = req.body.name;
            const email = req.body.email;
            const message = req.body.message;

            data.push({ name, email, message });

            res.end('Form data received and stored.');
        });
    } else if (req.method === 'GET') {
        const reqUrl = url.parse(req.url, true);
        if (reqUrl.pathname === '/get-form-data') {
            
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
        } else {
          
        }
    }
});

const port = 8080;

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});