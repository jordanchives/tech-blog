const { Posts, Users, Comments } = require('../models');
const router = require('express').Router();

router.get('/', async (req, res) => {
   res.render('homepage'); 
});

module.exports = router;