// From here our relative root path is /api,
// as defined in `app.use('/api')` in server.js

const fs = require('fs/promises');

const apiRouter = require('express').Router();

const postsUrl = 'https://jsonplaceholder.typicode.com/posts';

//         /api/posts/write
apiRouter.get("/posts/write", async (req, res) => {
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

//         /api/posts/read
apiRouter.get("/posts/read", async (req, res) => {
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

module.exports = apiRouter;