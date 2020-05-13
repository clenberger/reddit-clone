const Post = require('../models/posts');

module.exports = (app) => {

  app.get("/n/:subreddit", function(req, res) {
    const currentUser = req.user;
    Post.find({ subreddit: req.params.subreddit }).populate('author').lean()
      .then(posts => {
        res.render("posts-index", { posts, currentUser });
      })
      .catch(err => {
        console.log(err);
      });
  });
  
    // CREATE
    app.post("/post/new", (req, res) => {
        if (req.user) {
            var post = new Post(req.body);
            post.author = req.user._id;

            post
                .save()
                .then(post => {
                    return User.findById(req.user._id);
                })
                .then(user => {
                    user.posts.unshift(post);
                    user.save();
                    // REDIRECT TO THE NEW POST
                    res.redirect(`/posts/${post._id}`);
                })
                .catch(err => {
                    console.log(err.message);
                });
        } else {
            return res.status(401); // UNAUTHORIZED
        }
    });

    // INDEX
    app.get('/', (req, res) => {
      const currentUser = req.user;
      // res.render('home', {});
      console.log(req.cookies);
      Post.find().populate('author').lean()
      .then(posts => {
          res.render('posts-index', { posts, currentUser });
          // res.render('home', {});
      }).catch(err => {
          console.log(err.message);
      })
  })



    app.get("/posts/:id", function(req, res) {
      // LOOK UP THE POST
      const currentUser = req.user;
      Post.findById(req.params.id).populate('comments').populate('author').lean()
        .then(post => {
          res.render("posts-show", { post, currentUser });
        })
        .catch(err => {
          console.log(err.message);
        });
    });
  
  };
  