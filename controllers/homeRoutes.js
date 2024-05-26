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

router.get('/sign-up', (req, res) => {
      if (req.session.loggedIn) {
         res.redirect('/');
         return;
      }
   
      res.render('signup');
});

router.get('/post/:id', async (req, res) => {
      try {
         const postData = await Posts.findByPk(req.params.id, {
               include: [
                  {
                     model: Users,
                     attributes: ['username'],
                  },
                  {
                     model: Comments,
                     include: [
                        {
                           model: Users,
                           attributes: ['username'],
                        },
                     ],
                  }
               ],
         });
   
         const post = postData.get({ plain: true });
         res.render('post', {
               ...post,
               loggedIn: req.session.loggedIn,
         });
      } catch (err) {
         console.log(err);
         res.status(500).json(err);
      }
});

router.get('/dashboard', async (req, res) => {
      if (!req.session.loggedIn) {
         res.redirect('/login');
         return;
      }
   
      try {
         const userData = await Users.findByPk(req.session.user_id, {
               attributes: { exclude: ['password'] },
               include: [{ model: Posts }],
         });
   
         const user = userData.get({ plain: true });
         res.render('dashboard', {
               ...user,
               loggedIn: true,
         });
      } catch (err) {
         console.log(err);
         res.status(500).json(err);
      }
});

module.exports = router;
