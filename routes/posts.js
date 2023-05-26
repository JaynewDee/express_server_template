// From here our relative root path is /api,
// as defined in `app.use('/api')` in server.js

// The promises version of fs allows us to use async await syntax
const fs = require('fs/promises');

const postsRouter = require('express').Router();

// API offering mock data
const postsUrl = 'https://jsonplaceholder.typicode.com/posts';

//   /api/posts/write
postsRouter.get("/write", async (req, res) => {
    try {
        const data = await fetch(postsUrl);
        const parsed = await data.json();

        await fs.writeFile('./db/posts.json', JSON.stringify(parsed));

        res.send({
            message: "Success! "
        });

    } catch (err) {
        console.error(err);

        res.status(404).send({
            message: "Failed to retrieve and write json data ... "
        })
    }
});

//   /api/posts/read
postsRouter.get("/read", async (req, res) => {
    try {
        const json = await fs.readFile('db/posts.json', 'utf8');

        res.send(json);
    } catch (err) {
        console.error(err);

        res.status(404).send({
            message: "Failed to read and return posts data."
        })
    }
});

module.exports = postsRouter;