const router = require('express').Router();
const userRouter = require('./user.js');
const wikiRouter = require('./wiki.js');
router.use('/wiki', wikiRouter);



module.exports = router ;
