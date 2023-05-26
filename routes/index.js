const postsRouter = require('./posts');

const apiRouter = require('express').Router();

apiRouter.use('/posts', postsRouter);

module.exports = apiRouter;