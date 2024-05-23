const { Posts, Users } = require('../models');
const router = require('express').Router();

router.get('/', async (req, res) => {
      try {
         const postData = await Posts.findAll({
               include: [
                  {
                     model: Users,
                     attributes: ['username'],
                  },
               ],
         });
   
         const posts = postData.map((post) => post.get({ plain: true }));
   
         res.render('homepage', {
               posts,
               loggedIn: req.session.loggedIn,
         });
      } catch (err) {
         console.log(err);
         res.status(500).json(err);
      }
});

router.get('/login', (req, res) => {
      if (req.session.loggedIn) {
         res.redirect('/');
         return;
      }
   
      res.render('login');
});

module.exports = router;