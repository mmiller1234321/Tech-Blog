const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  const t = await sequelize.transaction();
  try {
    await sequelize.sync({ force: true, transaction: t });

    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
      transaction: t
    });

    await Promise.all(postData.map(async (postDataItem) => {
      const { user_id, title, content } = postDataItem;
      await Post.create({
        user_id,
        title,
        content
      }, { transaction: t });
    }));

    await Promise.all(commentData.map(async (commentDataItem) => {
      const { post_id, user_id, content } = commentDataItem;
      await Comment.create({
        post_id,
        user_id,
        content
      }, { transaction: t });
    }));

    await t.commit();
    console.log('Database seeded successfully.');
    process.exit(0);
  } catch (error) {
    await t.rollback();
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();

