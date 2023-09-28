const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // Define the file path based on the request URL
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './ice.html'; // Default to index.html if no path specified
    }

    // Get the file extension
    const extname = path.extname(filePath);

    // Define content types for different file extensions
    const contentType = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif'
    };

    // Read the file and serve it
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // File not found
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('404 Not Found');
            } else {
                // Server error
                res.writeHead(500);
                res.end('Server Error: ' + err.code);
            }
        } else {
            // Set the content type based on the file extension
            const contentTypeHeader = contentType[extname] || 'text/html';
            res.writeHead(200, { 'Content-Type': contentTypeHeader });
            res.end(content, 'utf-8');
        }
    });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
