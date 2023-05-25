const express = require('express');
const path = require('path');
const api = require("./routes/index.js");

const app = express();

const PORT = process.env.PORT || 3001;

const urlEncodingOptions = {
    extended: true
};

// Middleware 
app.use(express.json());
app.use(express.urlencoded(urlEncodingOptions));
app.use(express.static('public'));
app.use('/api', api);

app.get('/', (_, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

app.listen(PORT, () => console.log(`Server listening @ http://localhost:${PORT}`))