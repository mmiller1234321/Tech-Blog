const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const postDataItem of postData) {
    const { user_id, title, content } = postDataItem;
    await Post.create({
      user_id,
      title,
      content
    });
  }

  for (const commentDataItem of commentData) {
    const { post_id, user_id, content } = commentDataItem;
    await Comment.create({
      post_id,
      user_id,
      content
    });
  }

  process.exit(0);
};

seedDatabase();
