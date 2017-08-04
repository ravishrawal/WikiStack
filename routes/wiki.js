const router = require('express').Router();
const Page = require('../models').Page;
const User = require('../models').User;

router.get('/', function(req, res, next) {
  res.redirect('/');
})

router.post('/', function(req, res, next) {
  var page = Page.build({
    title: req.body.title,
    content: req.body.pageContent
  });
  page.save()
    .then(()=>{
      res.redirect('/')
    })
    .catch(error => {
      res.render('error', {message: error.message, error: error})
    })
})

router.get('/add', function(req, res, next) {
  res.render('addpage');
})

module.exports = router;
