const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

//Get route for testing
router.get('/', (req, res) => {
  Post.findAll().then((postData) => {
      res.json(postData);
  });
});

//Add Post
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Delete post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update Post

router.put('/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.update({
      title: req.body.title, 
      content: req.body.content},
      {where: {
        id: req.params.id,
        user_id: req.session.user_id,}
      })
    //})

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
