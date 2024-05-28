const { Posts, Users, Comments } = require("../models");
const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const postData = await Posts.findAll({
      include: [
        {
          model: Users,
          attributes: ["username"],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    res.render("homepage", {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).render("error", {
      message: "An error occurred. Please try again later.",
      loggedIn: req.session.loggedIn,
    });
  }
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/sign-up", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Posts.findByPk(req.params.id, {
      include: [
        {
          model: Users,
          attributes: ["username"],
        },
        {
          model: Comments,
          include: [
            {
              model: Users,
              attributes: ["username"],
            },
          ],
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render("post", {
      ...post,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
      res.status(500).render("error", {
      message: "An error occurred. Please try again later.",
      loggedIn: req.session.loggedIn,
    });
  }
});

router.get("/dashboard", async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect("/login");
    return;
  }

  try {
    const userData = await Users.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Posts }],
    });

    const user = userData.get({ plain: true });
    res.render("dashboard", {
      ...user,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).render("error", {
      message: "An error occurred. Please try again later.",
      loggedIn: req.session.loggedIn,
    });
  }
});

router.get("/create", (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect("/login");
    return;
  }

  res.render("create_post", { loggedIn: true });
});

router.get("/post/edit/:id", async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect("/login");
    return;
  }

  try {
    const postData = await Posts.findByPk(req.params.id);
    if (postData && postData.user_id === req.session.user_id) {
      const post = postData.get({ plain: true });
      res.render("edit_post", { post, loggedIn: true });
    } else {
      res.status(404).render("error", {
        message: "Post not found!",
        loggedIn: req.session.loggedIn,
      });
    }
  } catch (err) {
    res.status(500).render("error", {
      message: "An error occurred. Please try again later.",
      loggedIn: req.session.loggedIn,
    });
  }
});

router.get("*", (req, res) => {
  res.status(404).render("error", {
    message: "Page not found!",
    loggedIn: req.session.loggedIn,
  });
});

module.exports = router;
